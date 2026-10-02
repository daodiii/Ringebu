"""Split the valley photograph into depth layers for the Panorama hero.

far.webp  : the photo with the near foreground painted out (opaque)
near.webp : the near foreground alone (birches, lookout, path, rock), alpha
far-tall.webp, near-tall.webp: the same two for upright screens, a crop of
            the right half cut from the 4x master at 1.6 times the scale
"""
import os, sys
import numpy as np
import cv2
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../.."))
# The 14400x7560 Upscayl master hero-valley-bg.webp was downsampled from (not in git)
MASTER = "C:/Users/daodi/Desktop/hero-valley-bg_upscayl_4x_upscayl-standard-4x.png"
OUT = ROOT + "/src/components/home/panorama"
DBG = sys.argv[1] if len(sys.argv) > 1 else None
os.makedirs(OUT, exist_ok=True)

src = np.asarray(Image.open(ROOT + "/public/images/hero-valley-bg.webp").convert("RGB"))
H, W = src.shape[:2]
print("photo", W, H)


def poly(mask, pts, val=255):
    cv2.fillPoly(mask, [np.array(pts, np.int32)], val)


# ---- 1. Hand-drawn regions (master coordinates) ----
near = np.zeros((H, W), np.uint8)

# The ground and the foreground bushes along the bottom, left of the lookout
poly(near, [(0, 1520), (200, 1540), (400, 1600), (600, 1630), (800, 1650), (1000, 1660), (1200, 1640),
            (1400, 1610), (1590, 1640), (1590, 2016), (0, 2016)])
# Ground right of the lookout, the bushes, the rock
poly(near, [(3250, 1760), (3330, 1700), (3380, 1600), (3460, 1560), (3560, 1540), (3600, 1420), (3650, 1350),
            (3720, 1320), (3840, 1290), (3840, 2016), (3250, 2016)])

# The two birches' trunks
poly(near, [(0, 0), (225, 0), (222, 400), (215, 800), (205, 1100), (165, 1350), (115, 1550), (60, 1650), (0, 1680)])
poly(near, [(362, 0), (440, 0), (455, 300), (462, 700), (452, 1000), (440, 1350), (440, 1650), (490, 1780),
            (300, 1780), (325, 1600), (318, 1350), (345, 1000), (372, 700), (368, 300)])
# The thin dead tree on the right
poly(near, [(3478, 1140), (3506, 1140), (3512, 1660), (3472, 1660)])

# ---- 2. The lookout, refined with GrabCut inside a hand polygon ----
look = [(1590, 1322), (1900, 1318), (2300, 1325), (2700, 1335), (2880, 1350), (2950, 1380), (2975, 1420),
        (2978, 1590), (3100, 1600), (3110, 1745), (3240, 1790), (3320, 1840), (3330, 2016), (1590, 2016)]
x0, y0, x1, y1 = 1450, 1200, 3500, 2016
roi = np.ascontiguousarray(src[y0:y1, x0:x1][:, :, ::-1])
gc = np.full(roi.shape[:2], cv2.GC_BGD, np.uint8)
pm = np.zeros(roi.shape[:2], np.uint8)
poly(pm, [(x - x0, y - y0) for x, y in look])
grow = cv2.dilate(pm, np.ones((61, 61), np.uint8))
shrink = cv2.erode(pm, np.ones((61, 61), np.uint8))
gc[grow > 0] = cv2.GC_PR_BGD
gc[pm > 0] = cv2.GC_PR_FGD
gc[shrink > 0] = cv2.GC_FGD
gc[(y1 - y0 - 120):, :] = np.where(pm[(y1 - y0 - 120):, :] > 0, cv2.GC_FGD, gc[(y1 - y0 - 120):, :])
bgd = np.zeros((1, 65), np.float64)
fgd = np.zeros((1, 65), np.float64)
cv2.grabCut(roi, gc, None, bgd, fgd, 6, cv2.GC_INIT_WITH_MASK)
lk = np.where((gc == cv2.GC_FGD) | (gc == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
# keep the biggest piece, fill holes
n, lab, stats, _ = cv2.connectedComponentsWithStats(lk)
big = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
lk = np.where(lab == big, 255, 0).astype(np.uint8)
lk = cv2.morphologyEx(lk, cv2.MORPH_CLOSE, np.ones((15, 15), np.uint8))
near[y0:y1, x0:x1] = np.maximum(near[y0:y1, x0:x1], lk)

# The small spruce standing in front of the fields, right of the lookout: its dark needles
sx0, sy0, sx1, sy1 = 2940, 1280, 3120, 1620
reg = src[sy0:sy1, sx0:sx1].astype(int)
lum = reg.mean(axis=2)
spr = ((lum < 70) & (reg[:, :, 1] >= reg[:, :, 2] - 10)).astype(np.uint8) * 255
spr = cv2.morphologyEx(spr, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
spr = cv2.morphologyEx(spr, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
near[sy0:sy1, sx0:sx1] = np.maximum(near[sy0:sy1, sx0:sx1], spr)

# ---- 3. The birch canopy against the sky and the far hills (keyed) ----
cx1 = 1500
reg = src[:900, :cx1].astype(int)
r, g, b = reg[:, :, 0], reg[:, :, 1], reg[:, :, 2]
far_px = ((b > r + 14) & (b >= g - 4)) | (reg.min(axis=2) > 175)
can = (~far_px).astype(np.uint8) * 255
# Below the hill line only the trunks are near: the forest behind is far
limit = np.zeros_like(can)
poly(limit, [(0, 0), (cx1, 0), (cx1, 700), (1100, 760), (800, 800), (600, 790), (230, 760), (230, 900), (0, 900)])
can = np.minimum(can, limit)
can = cv2.morphologyEx(can, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
can = cv2.morphologyEx(can, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
near[:900, :cx1] = np.maximum(near[:900, :cx1], can)

# Soft edge
alpha = cv2.GaussianBlur(near, (0, 0), 1.6)

# ---- 4. Paint the near things out of the far layer ----
hole = cv2.dilate(near, np.ones((13, 13), np.uint8))
S = 4  # inpaint at quarter size, then bring the fill back up
small = cv2.resize(src[:, :, ::-1], (W // S, H // S), interpolation=cv2.INTER_AREA)
hs = cv2.resize(hole, (W // S, H // S), interpolation=cv2.INTER_NEAREST)
hs = cv2.dilate(hs, np.ones((3, 3), np.uint8))
fill = cv2.inpaint(small, hs, 9, cv2.INPAINT_TELEA)
# Second pass at half size for a crisper band near the edges
S2 = 2
mid = cv2.resize(src[:, :, ::-1], (W // S2, H // S2), interpolation=cv2.INTER_AREA)
hm = cv2.resize(hole, (W // S2, H // S2), interpolation=cv2.INTER_NEAREST)
up = cv2.resize(fill, (W // S2, H // S2), interpolation=cv2.INTER_CUBIC)
seed = np.where(hm[:, :, None] > 0, up, mid)
band = cv2.subtract(hm, cv2.erode(hm, np.ones((41, 41), np.uint8)))
fill2 = cv2.inpaint(seed, band, 7, cv2.INPAINT_TELEA)
fill2 = cv2.GaussianBlur(fill2, (0, 0), 1.2)
full = cv2.resize(fill2, (W, H), interpolation=cv2.INTER_CUBIC)[:, :, ::-1]
w = (cv2.GaussianBlur(hole, (0, 0), 3).astype(np.float32) / 255.0)[:, :, None]
far = (src.astype(np.float32) * (1 - w) + full.astype(np.float32) * w).clip(0, 255).astype(np.uint8)

# Behind the lookout and the right-hand foreground the camera only ever
# uncovers a band above their top edge, so continue the river and the fields
# straight down there: vertical streaks read as more of the same view.
bx0, bx1 = 1560, W
colfill = far.copy()
hb = hole[:, bx0:bx1] > 0
reg = far[:, bx0:bx1].astype(np.float32)
out = reg.copy()
for xi in range(reg.shape[1]):
    col = hb[:, xi]
    if not col.any():
        continue
    top = int(np.argmax(col))
    if top < 1100:
        continue
    # Average a few rows above the edge so one pixel's noise is not stretched
    src_rows = reg[max(0, top - 10):top, xi]
    v = src_rows.mean(axis=0) if len(src_rows) else reg[top, xi]
    ys = np.nonzero(col)[0]
    ys = ys[ys >= top]
    # Fade from the edge colour to the inpainted fill over 160px
    k = np.clip((ys - top) / 160.0, 0, 1)[:, None]
    out[ys, xi] = v * (1 - k) + reg[ys, xi] * k
out = cv2.GaussianBlur(out, (0, 0), sigmaX=3, sigmaY=0.6)
m = hb[:, :, None]
reg2 = np.where(m, out, reg)
far[:, bx0:bx1] = reg2.clip(0, 255).astype(np.uint8)

# Beside the lookout's side walls a lean uncovers a band to the left or the
# right instead: mirror the forest and the fields across the wall there, and
# blend the three fills by whichever edge is nearest.
src_f = src.astype(np.float32)
cur = far.astype(np.float32)
LY0, LX0, LX1 = 1250, 1500, 3420
for y in range(LY0, H):
    row = hole[y, LX0:LX1] > 0
    if not row.any():
        continue
    xs = np.nonzero(row)[0]
    # runs of hole pixels in this row
    breaks = np.nonzero(np.diff(xs) > 1)[0]
    starts = np.r_[xs[0], xs[breaks + 1]] + LX0
    ends = np.r_[xs[breaks], xs[-1]] + LX0
    for a0, b0 in zip(starts, ends):
        n = b0 - a0 + 1
        xx = np.arange(a0, b0 + 1)
        dl = xx - a0
        dr = b0 - xx
        # top of the hole in each column
        dt = np.array([y - int(np.argmax(hole[:, x] > 0)) for x in xx])
        ml = np.clip(a0 - 1 - dl, 0, W - 1)
        mr = np.clip(b0 + 1 + dr, 0, W - 1)
        fl = src_f[y, ml]
        fr = src_f[y, mr]
        fv = cur[y, xx]
        wl = np.exp(-dl / 45.0) * (a0 > LX0 + 2)
        wr = np.exp(-dr / 45.0) * (b0 < LX1 - 2)
        wv = np.exp(-dt / 45.0) + 1e-3
        ws = wl + wr + wv
        cur[y, xx] = (fl * wl[:, None] + fr * wr[:, None] + fv * wv[:, None]) / ws[:, None]
cur = np.where(hole[:, :, None] > 0, cv2.GaussianBlur(cur, (0, 0), 1.0), cur)
far = cur.clip(0, 255).astype(np.uint8)

Image.fromarray(far).save(OUT + "/far.webp", quality=84, method=6)
rgba = np.dstack([src, alpha])
# Colour under fully transparent pixels does not matter: flatten it so it compresses
rgba[alpha == 0, :3] = 0
Image.fromarray(rgba, "RGBA").save(OUT + "/near.webp", quality=86, alpha_quality=90, method=6)

# Portrait screens get a crop right of the middle, the fields and the far
# side of the valley with only an edge of the river, so a
# phone is sent pixels it shows rather than a panorama it mostly cuts off.
# A phone shows the crop about 1100px wide (it is hung 132% of the hero's
# height), so at 1800px it had only 1.6 pixels for each of a 3x screen's 3.
# It is cut from the master at 1.6x instead: the photo's own detail from the
# master, and the painted-out fill and the cut-out's edge scaled up from here.
TX0, TX1 = 1900, 3700
K = 1.6
HW, HH = round(W * K), round(H * K)
hx0, hx1 = round(TX0 * K), round(TX1 * K)
Image.MAX_IMAGE_PIXELS = None
big = Image.open(MASTER).convert("RGB").resize((HW, HH), Image.LANCZOS)
hi = np.asarray(big)[:, hx0:hx1].astype(np.float32)
del big
size = (hx1 - hx0, HH)
up = lambda a, interp=cv2.INTER_CUBIC: cv2.resize(np.ascontiguousarray(a[:, TX0:TX1]), size, interpolation=interp)
w_hi = up(w[:, :, 0])[:, :, None].clip(0, 1)
far_hi = (hi * (1 - w_hi) + up(far).astype(np.float32) * w_hi).clip(0, 255).astype(np.uint8)
alpha_hi = up(alpha).clip(0, 255).astype(np.uint8)
rgba_hi = np.dstack([hi.clip(0, 255).astype(np.uint8), alpha_hi])
rgba_hi[alpha_hi == 0, :3] = 0
Image.fromarray(far_hi).save(OUT + "/far-tall.webp", quality=84, method=6)
Image.fromarray(rgba_hi, "RGBA").save(OUT + "/near-tall.webp", quality=86, alpha_quality=90, method=6)
print("tall", size)

if DBG:
    Image.fromarray(far).resize((1280, 672)).save(DBG + "/dbg_far.jpg", quality=85)
    chk = np.full_like(src, (255, 0, 255))
    a = alpha.astype(np.float32)[:, :, None] / 255
    comp = (src * a + chk * (1 - a)).astype(np.uint8)
    Image.fromarray(comp).resize((1280, 672)).save(DBG + "/dbg_near.jpg", quality=85)

print("done")
