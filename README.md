# FakeStake

FakeStake is a free casino-style games app built with Vite, React, TypeScript, Tailwind CSS, and Zustand. It includes Mines, Plinko, Dice, Limbo, Roulette, Blackjack, Flip, Dragon Tower, and Snake, all played with virtual currency.

## Stack

- Vite
- React 19
- TypeScript
- React Router
- Tailwind CSS
- Zustand
- Radix UI

## Scripts

```sh
pnpm dev
pnpm build
pnpm preview
pnpm lint
```

## Getting Started

```sh
git clone https://github.com/Akshaygore1/FakeStake.git
cd FakeStake
pnpm install
pnpm dev
```

## Project Structure

```text
src/
  components/
    feedback/
    game/
    layout/
    ui/
  config/
  hooks/
  lib/
  pages/
    home/
    games/
  services/
  stores/
  styles/
  types/
```

## Notes

- Routing is handled with React Router from `src/App.tsx`.
- Shared site and game metadata live in `src/config/`.
- Global styles live in `src/styles/globals.css`.

## Contributing

1. Fork the repository.
2. Create a branch: `git checkout -b my-change`
3. Commit your work.
4. Push the branch.
5. Open a pull request.
