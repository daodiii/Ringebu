# Landing Page Redesign Spec

## Global Changes

- **Increase text sizes** across all sections (body text, headings, subtitles)
- **Remove all decorative icons** that feel generic/AI-generated (Calendar, Sparkles, ShieldCheck, etc.) — buttons and cards should rely on typography and color, not icons
- Phone icon retained only where it labels a phone number action

## Section 1: Hero

**Changes:**
- Remove the "Din tannlege i Ringebu" pill/badge entirely
- Remove the scroll indicator (bouncing "SCROLL" chevron at bottom)
- Add **corner frame accents** — thin L-shaped bracket lines in the corners of the hero viewport, creating a viewfinder/premium photographic feel. White or white/translucent, subtle but visible.
- Buttons: leave current buttons as placeholder — user will provide button design later

**Keep:** Dental chair photo, gradient overlay, headline text, subtitle text, parallax scroll effect.

## Section 2: Treatments (Bento Grid)

**Changes:**
- Remove `Sparkles` icon from Tannbleking card
- Remove `ShieldCheck` icon from Forebyggende card
- Add **enhanced hover effects** on all cards — subtle lift (translateY + shadow increase), border color shifts, and smooth scale transitions. Make interactions feel premium and satisfying.

**Keep:** Bento grid layout, card content, section header, clinic sign photo in Akutt card.

## Section 3: Symptoms & Tips → Full Redesign

**Replace entirely** with a two-pathway card design based on user's reference image.

**Layout:** Two cards side by side on a light mint/emerald background (`emerald-50` or similar).

**Left card — "Tips & råd" (white):**
- White background with subtle border/shadow
- Header: "Tips & råd" in bold + "Se alle" link aligned right
- List of 3 clickable article/tip links, each as a row with:
  - Article title text (medium weight, readable size)
  - Chevron circle (>) on the right
  - Separated by thin horizontal dividers
- Each link navigates to the relevant article page
- Clean, no icons beyond the chevron

**Right card — "Symptomer" (dark emerald):**
- Dark emerald background (`emerald-800` or `emerald-900`), rounded corners
- Header: "Symptomer" in bold white
- Body text: "Opplever du ubehag og er usikker på hva det kan være? Her får du oversikt over vanlige symptomer forbundet med munnhelse."
- CTA: "Finn årsaken her" with chevron circle (>) — links to /symptomer
- No icons, no lists — just clean text + single action

## Section 4: Trust / About Us + Stats

**Remove entirely.** Delete the `TrustSection` component and its render call.

## Section 5: Articles → Magazine Layout

**Change layout** from equal two-column to magazine-style:

- **Left (large):** One featured article taking ~60% width with a large image (aspect ~3:2), category tag, read time, title, and excerpt
- **Right (stacked):** Two smaller article cards stacked vertically, each with a smaller image, title, and category/read time
- Keep the "Journal & Ekspertise" divider header
- Keep the "Besøk magasinet" CTA button at bottom

## Section 6: CTA

**Changes:**
- Remove `Calendar` icon from "Bestill time nå" button
- Remove `Phone` icon from "Ring 61 28 04 12" button

**Keep:** Gradient background, blur circles, headline, subtitle, both buttons, overall layout.

## Implementation Order

1. Global: increase text sizes in globals.css
2. Global: remove icon imports and usages
3. Hero: remove badge, scroll indicator, add corner frames
4. Treatments: remove icons, add hover effects
5. Symptoms & Tips: full redesign with two-pathway cards
6. Trust section: delete entirely
7. Articles: magazine layout
8. CTA: remove button icons
