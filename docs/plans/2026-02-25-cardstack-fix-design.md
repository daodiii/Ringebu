# CardStack Fix Design

## Problem
The current CardStack component in `src/components/ui/card-stack.tsx` has a width-collapse bug — cards are invisible on the page. The component uses `w-full` inside nested flex columns with `items-center`, causing the width to collapse to zero.

## Solution
Rewrite `card-stack.tsx` to match the original provided component's features, adapted to the site's editorial design system. Remove dark/light theme toggle.

## Features to include
- Drag up/down to cycle cards
- Left/right arrow navigation buttons
- Shuffle and reset buttons
- Progress dot indicators
- Card info overlay on hover (title + description)
- Explicit card sizing (w-80 aspect-video, not w-full)
- Site design tokens for colors/borders/shadows

## Features to exclude
- Dark/light mode toggle
- Full-screen background with grid pattern
- Self-contained theme system

## Props interface
```typescript
interface Card {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface CardStackProps {
  cards: Card[];
}
```

## Integration
- Used in `ServicesSection` of `src/app/page.tsx`
- Receives dental service cards with local image paths
- Sits inside a snap section with `container-width` wrapper
