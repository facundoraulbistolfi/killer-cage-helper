# killer-cage-helper

Small Vite + TypeScript app for exploring valid **Killer Sudoku cage combinations**.

## Features

- target sum + cell count calculator
- optional allowed / excluded digit filters
- reusable solver utility in `src/lib/cage.ts`
- baseline tests with Vitest

## Rules modeled

- digits from 1 to 9
- no repeated digits inside a cage
- combinations returned in ascending order

## Getting started

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run check
npm run test
```

## Next ideas

- keyboard-friendly grid entry
- candidate visualizations per cage size
- import from existing puzzle layouts
- UI for intersections / shared-cell reasoning
