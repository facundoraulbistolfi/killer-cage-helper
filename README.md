# killer-cage-helper

Minimal helper app for exploring **Killer Sudoku cage combinations**.

## What it does

Given a target sum and number of cells, it calculates valid digit combinations using standard Killer Sudoku rules:

- digits from 1 to 9
- no repeated digits inside a cage
- combinations sorted in ascending order

## Planned scope

- cage combination calculator
- quick filters by included / excluded digits
- simple web UI
- reusable TypeScript solver utilities
- tests for the core combinatorics logic

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
npm run test
```

## Notes

This repository starts with a small Vite + TypeScript setup so the solving logic and UI can evolve independently.
