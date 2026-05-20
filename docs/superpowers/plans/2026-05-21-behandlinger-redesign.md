# /behandlinger redesign implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `/behandlinger` as a photo-anchored hero followed by full-bleed editorial spreads on the cinematic palette, replacing the 915-line legacy monolith.

**Architecture:** The page becomes a thin server component that imports static treatment data and composes three small pieces — `BehandlingerHero` (full-bleed clinic photo with petrol gradient overlay), one `TreatmentSpread` per treatment (2-column grid with alternating photo side), and the existing `CtaCloseout` at the bottom. The category-tab filter, four mixed presentation modes, and old palette tokens are removed. Treatment data moves into a dedicated module and gets two new fields (`refusion`, `duration`).

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4 (with `@theme` tokens already defined in `globals.css`), Framer Motion (used inside `RevealOnScroll`), TypeScript 5. No test framework — verification is `npx tsc --noEmit` for type-checking + visual review in the browser at `http://localhost:3001/behandlinger`.

**Commit policy:** Per the user preference recorded in this project, no git commits happen mid-implementation. All tasks complete first, the user reviews the live result, then a single commit is made (Task 7). Do not commit between tasks.

---

## File structure

```
src/app/behandlinger/
  page.tsx                        ← rewrite to ~60 lines (server component)
  data.ts                         ← new — treatment data + types
  layout.tsx                      ← unchanged (metadata stays)

src/components/treatments/        ← new directory
  BehandlingerHero.tsx            ← new — full-bleed photo hero
  TreatmentSpread.tsx             ← new — single editorial spread
  RefusionChip.tsx                ← new — sage/brass/copper chip
```

Each file has one responsibility. `RefusionChip` is a leaf component used by `TreatmentSpread`. `BehandlingerHero` and `TreatmentSpread` are page-level building blocks. `data.ts` is the single source of truth for treatment content.

---

## Task 1: Define the Treatment type and data module

**Files:**
- Create: `src/app/behandlinger/data.ts`

- [ ] **Step 1: Create the data module with the new type and all nine treatments**

```ts
// src/app/behandlinger/data.ts

export type Refusion = "HELFO" | "Delvis HELFO" | "Egenandel";

export interface PriceItem {
  name: string;
  description: string;
}

export interface Treatment {
  title: string;
  subtitle: string;
  category: "Forebyggende" | "Kosmetisk" | "Restaurering" | "Kirurgi" | "Spesialbehandling";
  refusion: Refusion;
  duration: string;
  description: string;
  features: readonly string[];
  prices: readonly PriceItem[];
  /** Photo path. If the file does not exist, the spread falls back to `photoTone`. */
  photo?: string;
  /** Fallback tone shown when `photo` is undefined or missing on disk. */
  photoTone: string;
}

export const TREATMENTS: readonly Treatment[] = [
  {
    title: "Forebyggende behandling",
    subtitle: "Grunnlaget for god tannhelse",
    category: "Forebyggende",
    refusion: "HELFO",
    duration: "30–45 min",
    description:
      "Regelmessig forebygging holder tennene friske hele livet. Vi undersøker grundig, renser tennene og viser deg hvordan du best tar vare på dem hjemme.",
    features: [
      "Grundig tannundersøkelse med digitalt røntgen",
      "Profesjonell tannrens og polering",
      "Fluorbehandling for sterkere emalje",
      "Individuelle råd for munnhygiene hjemme",
    ],
    prices: [
      { name: "Undersøkelse med rens og kostnadsoverslag", description: "Fullstendig tannhelsesjekk" },
      { name: "Studentrabatt på undersøkelse",              description: "Gyldig med studentbevis" },
      { name: "Enkel etterkontroll",                         description: "Etter kirurgiske inngrep" },
      { name: "Omfattende etterkontroll",                    description: "Etter oralmedisinske undersøkelser" },
    ],
    photo: "/images/clinic-valley.jpg",
    photoTone: "#E8DCC2",
  },
  {
    title: "Bleking",
    subtitle: "Et lysere, hvitere smil",
    category: "Kosmetisk",
    refusion: "Egenandel",
    duration: "60–90 min",
    description:
      "Få hvitere tenner med profesjonell bleking. Det er trygt, gjør ikke vondt, og resultatet holder lenge.",
    features: [
      "Klinikkbleking med raskt resultat",
      "Hjemmebleking med tilpassede skinner",
      "Skånsom behandling for emaljen",
      "Langvarig og naturlig resultat",
    ],
    prices: [],
    photoTone: "#ECE6D6",
  },
  {
    title: "Fyllingsterapi",
    subtitle: "Moderne, usynlige fyllinger",
    category: "Restaurering",
    refusion: "HELFO",
    duration: "45–60 min",
    description:
      "Fyllinger i tannfargen som fyller hull og gjør tenner hele igjen, du ser ikke forskjellen.",
    features: [
      "Tannfargede komposittfyllinger",
      "Utskifting av gamle amalgamfyllinger",
      "Smertefri behandling med lokalbedøvelse",
      "Holdbare materialer med naturlig utseende",
    ],
    prices: [
      { name: "Fylling, liten",       description: "Én flate" },
      { name: "Fylling, mellomstor",  description: "To flater" },
      { name: "Fylling, stor",        description: "Tre eller flere flater" },
    ],
    photo: "/images/clinic-instruments.jpg",
    photoTone: "#EBE2CE",
  },
  {
    title: "Kron og bro",
    subtitle: "Holdbare restaureringer",
    category: "Restaurering",
    refusion: "Delvis HELFO",
    duration: "Flere besøk",
    description:
      "Kroner og broer erstatter eller reparerer tenner som er skadet eller borte, og ser helt naturlige ut.",
    features: [
      "Helkeramiske kroner for naturlig utseende",
      "Broer som erstatter manglende tenner",
      "Lang holdbarhet med riktig vedlikehold",
      "Skreddersydd tilpasning til ditt bitt",
    ],
    prices: [
      { name: "Fullkrone", description: "Hel krone over tann" },
    ],
    photoTone: "#E8DCC2",
  },
  {
    title: "Rotfylling",
    subtitle: "Redd tannen din",
    category: "Restaurering",
    refusion: "HELFO",
    duration: "60–90 min",
    description:
      "Rotfylling redder tenner som er skadet eller infisert. Det er ikke vondt, og du får beholde tannen.",
    features: [
      "Moderne endodontisk behandling",
      "Smertefri med god bedøvelse",
      "Avansert utstyr for presis behandling",
      "Bevarer din naturlige tann",
    ],
    prices: [
      { name: "Rotfylling, 1 rotkanal",     description: "Tann med én rotkanal" },
      { name: "Rotfylling, 2 rotkanaler",    description: "Tann med to rotkanaler" },
      { name: "Rotfylling, 3–4 rotkanaler",  description: "Tann med tre til fire rotkanaler" },
    ],
    photoTone: "#EEE3CC",
  },
  {
    title: "Visdomstennene",
    subtitle: "Vurdering og fjerning",
    category: "Kirurgi",
    refusion: "Delvis HELFO",
    duration: "45–90 min",
    description:
      "Vi sjekker om visdomstennene dine trenger å fjernes, og hvis ja, gjør vi det skånsomt.",
    features: [
      "Grundig vurdering med røntgen",
      "Skånsom kirurgisk fjerning",
      "God smertelindring under og etter",
      "Tett oppfølging i etterkant",
    ],
    prices: [
      { name: "Ukomplisert ekstraksjon", description: "Enkel fjerning av tann eller rot" },
      { name: "Kirurgisk fjerning",       description: "Fjerning av retinert tann" },
    ],
    photoTone: "#F0E8D6",
  },
  {
    title: "Tannkjøtt & tannstein",
    subtitle: "Friskt tannkjøtt, sterke tenner",
    category: "Forebyggende",
    refusion: "HELFO",
    duration: "45–60 min",
    description:
      "Sunt tannkjøtt er det viktigste for at tennene skal holde lenge. Vi fjerner tannstein og behandler tannkjøttsykdom.",
    features: [
      "Grundig fjerning av tannstein",
      "Behandling av gingivitt og periodontitt",
      "Veiledning i effektiv munnhygiene",
      "Regelmessig oppfølging og vedlikehold",
    ],
    prices: [
      { name: "Periodontal behandling",     description: "Behandling av tannkjøttsykdom" },
      { name: "Behandling av periodontitt", description: "Tannkjøttbetennelse" },
      { name: "Fiksering av tenner",         description: "Stabilisering av løse tenner" },
    ],
    photoTone: "#EFE8DA",
  },
  {
    title: "Bittskinner",
    subtitle: "Beskyttelse mot tanngnissing",
    category: "Spesialbehandling",
    refusion: "Egenandel",
    duration: "30 min",
    description:
      "Gnisser du tenner om natten? Det sliter dem ned og gir smerter. En bittskinne tilpasset deg beskytter og lindrer.",
    features: [
      "Individuelt tilpassede bittskinner",
      "Beskyttelse mot slitasje",
      "Lindring av kjevesmerter og hodepine",
      "Veiledning om årsaker og forebygging",
    ],
    prices: [],
    photoTone: "#ECE6D6",
  },
  {
    title: "Tannlegeskrekk",
    subtitle: "Vi forstår deg",
    category: "Spesialbehandling",
    refusion: "HELFO",
    duration: "45–60 min",
    description:
      "Hos oss møter du et trygt, rolig miljø med ekstra tid og omsorg. Vi tar tannlegeskrekk på alvor.",
    features: [
      "Rolig og trygt behandlingsmiljø",
      "Ekstra tid til å bli kjent og trygg",
      "Skånsomme behandlingsteknikker",
      "Mulighet for pauser underveis",
    ],
    prices: [],
    photo: "/images/clinic-sign.jpg",
    photoTone: "#EEE3CC",
  },
];
```

- [ ] **Step 2: Type-check the new module compiles**

Run: `cd /Users/daodilyas/Desktop/RingebuTann && npx tsc --noEmit`
Expected: No new errors related to `src/app/behandlinger/data.ts`. (Existing errors in the legacy `page.tsx` are fine for now — they'll be rewritten in Task 5.)

---

## Task 2: Build the `RefusionChip` component

**Files:**
- Create: `src/components/treatments/RefusionChip.tsx`

- [ ] **Step 1: Write the chip component**

```tsx
// src/components/treatments/RefusionChip.tsx
import type { Refusion } from "@/app/behandlinger/data";

const COLOR_VAR: Record<Refusion, string> = {
  "HELFO":        "var(--color-stone)",   // sage in the new palette
  "Delvis HELFO": "var(--color-brass)",
  "Egenandel":    "var(--color-copper)",
};

interface Props {
  refusion: Refusion;
}

export function RefusionChip({ refusion }: Props) {
  const color = COLOR_VAR[refusion];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em]"
      style={{
        color,
        borderColor: `color-mix(in srgb, ${color} 40%, transparent)`,
      }}
    >
      <span
        aria-hidden="true"
        className="inline-block size-[5px] rounded-full"
        style={{ background: color }}
      />
      {refusion}
    </span>
  );
}
```

- [ ] **Step 2: Type-check the chip compiles**

Run: `cd /Users/daodilyas/Desktop/RingebuTann && npx tsc --noEmit`
Expected: No new errors in `src/components/treatments/RefusionChip.tsx`.

---

## Task 3: Build the `BehandlingerHero` component

**Files:**
- Create: `src/components/treatments/BehandlingerHero.tsx`

- [ ] **Step 1: Write the hero**

```tsx
// src/components/treatments/BehandlingerHero.tsx
import Image from "next/image";

export function BehandlingerHero() {
  return (
    <section className="relative isolate min-h-[75vh] overflow-hidden border-t border-[var(--color-brass)]/40 text-[var(--color-amber)]">
      <Image
        src="/images/ringebutannMain.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_45%] brightness-[0.55] saturate-[0.92]"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,42,48,0.55) 0%, rgba(14,42,48,0.20) 35%, rgba(8,32,37,0.85) 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[75vh] w-full max-w-[var(--container-max,1280px)] flex-col justify-end px-[var(--container-px,24px)] py-32 md:py-36">
        <div className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-brass)]">
          <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--color-brass)]" />
          Inne i klinikken
        </div>

        <h1
          className="mt-7 max-w-[14ch] font-sans font-extralight text-[var(--color-amber)]"
          style={{
            fontSize: "clamp(56px, 8vw, 128px)",
            letterSpacing: "-0.045em",
            lineHeight: 0.92,
            textShadow: "0 2px 24px rgba(0, 0, 0, 0.4)",
          }}
        >
          Behandlinger<span className="text-[var(--color-copper)]">.</span>
        </h1>

        <p className="mt-6 max-w-[48ch] text-[18px] leading-[1.55] text-[var(--color-amber)]/95">
          Seks fagområder, ett team, ett rom uten hastverk.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check the hero compiles**

Run: `cd /Users/daodilyas/Desktop/RingebuTann && npx tsc --noEmit`
Expected: No new errors in `src/components/treatments/BehandlingerHero.tsx`.

---

## Task 4: Build the `TreatmentSpread` component

**Files:**
- Create: `src/components/treatments/TreatmentSpread.tsx`

- [ ] **Step 1: Write the spread**

This is the largest single component. It renders one editorial spread: photo column + content column, with alternation driven by `index`.

```tsx
// src/components/treatments/TreatmentSpread.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Treatment } from "@/app/behandlinger/data";
import { RefusionChip } from "./RefusionChip";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface Props {
  treatment: Treatment;
  index: number;
}

export function TreatmentSpread({ treatment, index }: Props) {
  const idxLabel = String(index + 1).padStart(2, "0");
  const photoOnRight = index % 2 === 1;

  return (
    <section className="border-t border-[var(--color-brass)]/30 bg-[var(--color-paper)] py-20 md:py-24">
      <RevealOnScroll
        className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]"
        style={photoOnRight ? { direction: "rtl" } : undefined}
      >
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Photo column */}
          <div
            className="relative aspect-[4/5] w-full overflow-hidden"
            style={{
              direction: "ltr",
              background: treatment.photoTone,
            }}
          >
            {treatment.photo ? (
              <Image
                src={treatment.photo}
                alt={`${treatment.title}, illustrasjonsbilde fra Ringebu Tannlegesenter`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-brass)]/60">
                Klinikkfoto
              </div>
            )}
            <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-paper)] mix-blend-difference">
              {treatment.category}
            </span>
          </div>

          {/* Content column */}
          <div style={{ direction: "ltr" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-brass)]">
              {idxLabel} · {treatment.subtitle}
            </div>

            <h2
              className="mt-4 font-sans font-light text-[var(--color-text-primary)]"
              style={{
                fontSize: "clamp(36px, 4vw, 56px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.02,
              }}
            >
              {treatment.title}
            </h2>

            <div className="mt-4 flex items-center gap-4">
              <RefusionChip refusion={treatment.refusion} />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                {treatment.duration}
              </span>
            </div>

            <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.65] text-[var(--color-text-secondary)]">
              {treatment.description}
            </p>

            <ul className="mt-7 flex flex-col gap-2">
              {treatment.features.map((f) => (
                <li
                  key={f}
                  className="flex items-baseline gap-3 text-[14px] text-[var(--color-text-primary)]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[7px] inline-block size-1 shrink-0 rounded-full bg-[var(--color-brass)]"
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {treatment.prices.length > 0 && (
              <div className="mt-8 border-t border-[var(--color-brass)]/30 pt-5">
                <ul className="flex flex-col gap-2.5">
                  {treatment.prices.map((p) => (
                    <li
                      key={p.name}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="text-[13px] text-[var(--color-text-primary)]">{p.name}</span>
                      <span className="font-mono text-[11px] tracking-[0.05em] text-[var(--color-text-muted)]">
                        {p.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              href="/kontakt"
              className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-[var(--color-copper)] px-6 py-3 text-[13px] font-semibold tracking-[0.005em] text-[var(--color-paper)] transition-colors hover:bg-[var(--color-copper)]/90"
            >
              Bestill time
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
```

- [ ] **Step 2: Type-check the spread compiles**

Run: `cd /Users/daodilyas/Desktop/RingebuTann && npx tsc --noEmit`
Expected: No new errors in `src/components/treatments/TreatmentSpread.tsx`.

---

## Task 5: Rewrite the page

**Files:**
- Modify: `src/app/behandlinger/page.tsx` (full rewrite — replaces the 915-line legacy file)

- [ ] **Step 1: Replace the file contents**

```tsx
// src/app/behandlinger/page.tsx
import { TREATMENTS } from "./data";
import { BehandlingerHero } from "@/components/treatments/BehandlingerHero";
import { TreatmentSpread } from "@/components/treatments/TreatmentSpread";
import { CtaCloseout } from "@/components/home/CtaCloseout";

export default function BehandlingerPage() {
  return (
    <main>
      <BehandlingerHero />
      {TREATMENTS.map((treatment, index) => (
        <TreatmentSpread
          key={treatment.title}
          treatment={treatment}
          index={index}
        />
      ))}
      <CtaCloseout />
    </main>
  );
}
```

- [ ] **Step 2: Type-check the rewritten page compiles**

Run: `cd /Users/daodilyas/Desktop/RingebuTann && npx tsc --noEmit`
Expected: No errors. The legacy imports (`useState`, `useCallback`, `useEffect`, `Calendar`, `Phone`, `ChevronDown`, framer-motion, etc.) are now gone, so any "unused import" complaints from the prior file are also gone.

- [ ] **Step 3: Lint the page**

Run: `cd /Users/daodilyas/Desktop/RingebuTann && npm run lint -- src/app/behandlinger src/components/treatments`
Expected: No errors. Warnings about `<a>` vs `<Link>` should not appear (we use `Link`).

---

## Task 6: Verify in the browser

**Files:** none modified — this is a verification step.

- [ ] **Step 1: Build the project to catch anything `tsc` missed**

Run: `cd /Users/daodilyas/Desktop/RingebuTann && npm run build`
Expected: Build completes without errors. Look for "Compiled successfully" and a clean route table that lists `/behandlinger`.

- [ ] **Step 2: Start the dev server (or rely on the user's already-running one)**

The user typically runs `npm run dev` on port 3001. If no server is running, run `cd /Users/daodilyas/Desktop/RingebuTann && npm run dev` in the background. Do not call any `preview_*` MCP tool — the user verifies in their own browser per project preference.

- [ ] **Step 3: Visual checklist at `http://localhost:3001/behandlinger`**

Open the URL and confirm each item:

| # | Check | Expected |
|---|---|---|
| 1 | Hero | Photo of `ringebutannMain.jpg` visible behind a petrol gradient; "Behandlinger." anchored bottom-left in Geist 200 with a copper period; "Inne i klinikken" brass eyebrow with a 28px hairline. |
| 2 | First spread | Title "Forebyggende behandling", photo on the **left** (clinic-valley.jpg), green sage HELFO chip, "30–45 min" mono label. |
| 3 | Second spread | Title "Bleking", photo on the **right** (placeholder cream tone — no photo file), copper Egenandel chip. |
| 4 | Alternation | Each subsequent spread flips sides (3=left, 4=right, … 9=left). |
| 5 | Refusjon colours | HELFO = sage green, Delvis HELFO = brass, Egenandel = copper. |
| 6 | Prices | Forebyggende shows 4 price rows; Bleking and Tannlegeskrekk show none (no empty price block). |
| 7 | CtaCloseout | Valley photo + copper "Finn en ledig time" button at the bottom. |
| 8 | Mobile | Resize the browser narrow (under ~640px). Each spread collapses to a single column, photo on top, content below, regardless of which side it was on desktop. |
| 9 | Console | DevTools console has no errors or warnings about the new files. |
| 10 | Old palette gone | No purple gradients, no blur orbs, no `--color-primary` references anywhere on the page. |

If any item fails, fix it in the relevant component file, re-check `npx tsc --noEmit`, and re-verify.

---

## Task 7: Stop and wait for the user

**Files:** none modified.

- [ ] **Step 1: Tell the user the page is ready**

Reply to the user: "`/behandlinger` rewrite is implemented and passes the visual checklist locally. Reload `http://localhost:3001/behandlinger` and let me know if anything needs adjustment before I commit."

- [ ] **Step 2: Do not commit yet**

Per the project's commit policy (recorded preference: no commits before the user has reviewed the actual built result), do NOT run `git commit` here. Wait for the user's explicit go-ahead. When the user approves, run the commit below.

- [ ] **Step 3: When the user says to commit, stage and commit**

```bash
cd /Users/daodilyas/Desktop/RingebuTann
git add \
  src/app/behandlinger/page.tsx \
  src/app/behandlinger/data.ts \
  src/components/treatments/BehandlingerHero.tsx \
  src/components/treatments/TreatmentSpread.tsx \
  src/components/treatments/RefusionChip.tsx
git commit -m "$(cat <<'EOF'
feat: redesign /behandlinger as editorial spreads on the cinematic palette

Replace the 915-line legacy page (old palette, category filter, four mixed
presentation modes) with a photo-anchored hero followed by full-bleed
editorial spreads. Each treatment renders through one reusable component;
treatment data moves to its own typed module with refusion and duration
fields. The bottom of the page reuses the homepage CtaCloseout for
visual continuity.
EOF
)"
```

- [ ] **Step 4: Confirm to the user**

Reply: "Committed. Push to main when you're ready (or say "push it" and I'll fast-forward `main`)."

Do not push automatically.

---

## Self-review notes

- **Spec coverage.** Every section of the spec maps to a task: hero → Task 3, spreads → Task 4, navigation (no tabs) → naturally absent from the rewritten page in Task 5, closeout reuse → Task 5, refusjon chip mapping → Task 2, data shape with new fields → Task 1, photo fallback → Task 1 + Task 4, acceptance criteria → Task 6 checklist.
- **Type consistency.** `Treatment`, `Refusion`, `PriceItem` are defined once in `data.ts` and imported everywhere they're used. `RefusionChip` consumes `Refusion`, `TreatmentSpread` consumes `Treatment`, the page consumes `TREATMENTS`. No drift.
- **No placeholders.** All code blocks are complete. Verification uses real `tsc`, `npm run lint`, `npm run build`, and a concrete browser checklist.
- **Commit policy.** Explicit user-gated commit in Task 7 matches the project's recorded preference.
