# Hero photography

The approved 1730 × 909 photographic edit was upscaled once to 6920 × 3636
with the user's installed Upscayl High Fidelity 4× model. The PNG master is
kept outside the repository; its compressed WebP counterpart is committed
at `public/images/hero-valley-bg.webp`.

To reproduce the upscale on this machine:

```powershell
& 'C:\Program Files\Upscayl\resources\bin\upscayl-bin.exe' `
  -i 'hero-valley-edited.png' -o 'hero-valley-high-fidelity-4x.png' `
  -m 'C:\Program Files\Upscayl\resources\models' `
  -n high-fidelity-4x -s 4 -z 4 -f png
```

The committed source uses WebP quality 92. The layer generator needs Pillow,
NumPy, and OpenCV, and runs from the repository root:

```powershell
python -I -X utf8 src/components/home/panorama/lag.py
```

It builds masks at the existing 3840 × 2016 coordinates, retains the larger
source's texture outside the inpainted regions, and exports a 5760px desktop
panorama plus matching portrait and phone crops. Next.js serves AVIF or WebP
at responsive widths; the browser's sizing hint includes the image area
hidden by `object-fit: cover`. The master PNG is never sent to visitors.

Upscaling reconstructs texture from the approved edit; it cannot recover
independently verified detail absent from that source.
