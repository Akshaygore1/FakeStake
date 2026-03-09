# AGENTS.md - FakeStake Development Guide

This document provides essential information for AI coding agents working on the FakeStake codebase.

## Project Overview

**FakeStake** is a free casino games web application built for entertainment with virtual currency (no real money). It features 9 casino games including Mines, Plinko, Dice, Limbo, Roulette, Blackjack, Flip, Dragon Tower, and Snake.

**Tech Stack:**
- **Framework:** Next.js 16.0.10 (App Router, Static Export)
- **Language:** TypeScript (strict mode)
- **UI:** React 19.2.1, Tailwind CSS 3.4.1, Shadcn UI (new-york style)
- **State:** Zustand 4.5.2 with persist middleware
- **Icons:** Tabler Icons
- **Animations:** Motion (Framer Motion) 12.11.3
- **Package Manager:** pnpm 10.12.4

## Build, Lint, and Test Commands

```bash
# Development
pnpm dev              # Start dev server with Turbopack

# Build
pnpm build            # Build for production (static export)

# Linting
pnpm lint             # Run ESLint

# No test framework configured - tests not available
```

**Note:** This project does not have a test framework configured. There are no test scripts or test files.

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── (games)/                  # Game routes (route group)
│   │   ├── blackjack/
│   │   ├── dice/
│   │   ├── dragontower/
│   │   ├── flip/
│   │   ├── limbo/
│   │   ├── mines/
│   │   ├── plinko/
│   │   ├── roulette/
│   │   └── snake/
│   ├── _components/              # Shared app components (Navbar, Footer, GameConfig, etc.)
│   │   └── ui/                   # App-specific UI components
│   ├── games/                    # Games listing page
│   ├── layout.tsx                # Root layout with fonts, metadata
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/
│   └── ui/                       # Shadcn UI components (button, card, select, slider)
├── stores/                       # Zustand state management
│   ├── common.store.ts           # Shared state (balance, profit, multiplier)
│   ├── config.store.ts           # Game configuration state
│   ├── history.store.ts          # Game history state
│   ├── game/                     # Individual game stores
│   │   ├── blackjack.store.ts
│   │   ├── grid.store.ts         # Mines game
│   │   ├── plinko.store.ts
│   │   └── ...
│   └── index.ts                  # Barrel export for all stores
├── lib/                          # Utility functions
│   ├── utils.ts                  # cn(), game calculations
│   └── roulette-constants.ts
├── hooks/                        # Custom React hooks
│   ├── use-audio.ts              # Audio preloading and playback
│   └── use-mobile.tsx            # Media query hook
├── types/                        # TypeScript type definitions
│   └── index.ts
└── public/                       # Static assets (images, SVGs)
```

## Code Style Guidelines

### Imports

- **Always use `@/` path alias** for imports from the root directory
- **Import order:** External packages → Internal modules → Types → Styles
- **Named exports preferred** for utilities and components
- **Barrel exports:** Use `index.ts` files to re-export from folders

```typescript
// Good
import { IconCoins } from "@tabler/icons-react";
import React from "react";
import { useCommonStore } from "@/stores";
import { cn } from "@/lib/utils";
import type { GameStatus } from "@/types";

// Bad
import { useCommonStore } from "../../stores/common.store";
import { cn } from "../../../lib/utils";
```

### File Naming

- **Components:** PascalCase (`GameConfig.tsx`, `MineContainer.tsx`)
- **Utilities/Hooks/Stores:** kebab-case (`use-audio.ts`, `common.store.ts`, `utils.ts`)
- **Directories:** kebab-case (`_components/`, `dragontower/`)
- **Route groups:** Prefix with underscore for non-route dirs in app (`_components/`, `_lib/`)

### Component Conventions

- **Client components:** Add `"use client"` directive at the top
- **Naming:** PascalCase for components, match filename
- **Props:** Define interfaces with `Props` suffix or inline
- **Default exports:** Use for page components; named exports for utilities

```typescript
"use client";

import React from "react";
import { useCommonStore } from "@/stores";

interface GameConfigProps {
  betAmount: number;
  onBetAmountChange: (amount: number) => void;
  className?: string;
}

export default function GameConfig({ 
  betAmount, 
  onBetAmountChange,
  className = "" 
}: GameConfigProps) {
  // Component logic
}
```

### TypeScript & Types

- **Strict mode enabled** - all code must be properly typed
- **No `any` types** unless absolutely necessary
- **Interface vs Type:** Use `interface` for object shapes, `type` for unions/primitives
- **Centralize types:** Define shared types in `/types/index.ts`
- **Store types:** Define inline with Zustand stores

```typescript
// Good
export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export interface GameResult {
  won: boolean;
  multiplier: number;
  payout: number;
}

// Bad
export type GameResult = {  // Use interface for object shapes
  won: any;  // Never use any
}
```

### State Management (Zustand)

- **Naming:** `use[Name]Store` pattern (e.g., `useCommonStore`, `useBlackjackStore`)
- **File structure:** `[name].store.ts` in `/stores` or `/stores/game`
- **Persistence:** Use `persist` middleware for data that should survive reloads
- **Type safety:** Always type your store

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CommonStore = {
  balance: number;
  setBalance: (balance: number) => void;
  clearState: () => void;
};

export const useCommonStore = create<CommonStore>()(
  persist(
    (set, get) => ({
      balance: 100000,
      setBalance: (balance) => set({ balance: balance < 0 ? 0 : balance }),
      clearState: () => set({ balance: 100000 }),
    }),
    { name: 'common-storage' }
  )
);
```

### Styling with Tailwind

- **Use `cn()` utility** from `@/lib/utils` to merge Tailwind classes
- **Custom colors:** Use theme colors (success, background, foreground, etc.)
- **Responsive:** Mobile-first approach
- **Dark mode:** Class-based dark mode configured

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "flex items-center gap-2",
  "bg-background text-white",
  className
)} />
```

### Error Handling

- **Silent catches for browser APIs** (audio autoplay restrictions)
- **Early returns** for guard clauses
- **Validation:** Check inputs before state updates
- **User feedback:** Use toast notifications (Sonner) for errors

```typescript
// Good - Silent catch for autoplay restrictions
audio.play().catch(() => {
  // Handle autoplay restrictions silently
});

// Good - Early return guards
if (gameStatus !== "player-turn") return;
if (!card) return;

// Good - Input validation
const numValue = parseFloat(value);
if (!isNaN(numValue) && numValue > 0) {
  onBetAmountChange(numValue);
}
```

### Metadata & SEO

- **Every game page** should have a `metadata` export with title, description, keywords, OpenGraph
- **Use `export const dynamic = 'force-static'`** for static pages
- **Sitemap/Robots:** Generated in `app/sitemap.ts` and `app/robots.ts`

```typescript
export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Game Name - Play Free Online",
  description: "Play [game] online for free...",
  keywords: ["game name", "free game", "online casino"],
  openGraph: {
    title: "Game Title | Fake Stake",
    description: "Game description",
    url: "https://fakestake.fun/game-name",
  },
};
```

## Key Dependencies & Patterns

- **Shadcn UI:** Use existing components from `/components/ui`, add new ones with `npx shadcn@latest add [component]`
- **Tabler Icons:** Import from `@tabler/icons-react`
- **Matter.js:** Used for Plinko physics simulation
- **Motion:** Use for animations (prefer over Framer Motion syntax)
- **Sonner:** Toast notifications with `<Toaster />` in layout

## Common Tasks

### Adding a New Game
1. Create game route in `app/(games)/[game-name]/page.tsx`
2. Create game store in `stores/game/[game].store.ts`
3. Export store from `stores/game/index.ts`
4. Create game components in `app/(games)/[game-name]/_components/`
5. Add metadata for SEO
6. Update games listing if needed

### Adding Shadcn Components
```bash
npx shadcn@latest add [component-name]
```

### Modifying Global Balance
Use `useCommonStore` to access and modify balance, profit, and multiplier across all games.

---

**Last Updated:** 2026-03-09
