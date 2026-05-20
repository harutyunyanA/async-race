# Async Race

**Deployed UI:** https://asyncrace.online

**Score:** 400 / 400

---

## Setup

1. Clone & run the [server mock](https://github.com/mikhama/async-race-api) (default port: `http://localhost:3000`).
2. Create a `.env` file in the project root:
   ```
   VITE_API_URL=http://localhost:3000
   ```
3. Install and run:
   ```bash
   npm install
   npm run dev
   ```

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint (Airbnb config, strict TS) |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm run format` | Prettier auto-format |
| `npm run ci:format` | Prettier check (no write) |

## Tech Stack

- **React 19** + **TypeScript** (strict mode, `noImplicitAny`)
- **Vite 8** build tool
- **Zustand** state management (3 stores: `useGarageStore`, `useRaceStore`, `useWinnersStore`)
- **React Router v7** for `/` (Garage) and `/winners` routes
- **Ant Design 6** components + **Tailwind CSS 4** for responsive styling
- **Lucide React** icons
- **ESLint** (Airbnb config) + **Prettier**

---

## Checklist — 400 / 400 pts

### UI Deployment

- [x] **Deployment Platform** — deployed (see link at the top)

### Requirements to Commits and Repository

- [x] **Commit guidelines compliance** — Conventional Commits, lowercase types, imperative mood
- [x] **Checklist included in README.md**
- [x] **Score calculation** — see header (400 / 400)
- [x] **UI Deployment link in README.md** — at the top

### Basic Structure — 80 / 80 pts

- [x] **Two Views (10)** — `/` (Garage) and `/winners`
- [x] **Garage View Content (30)**
  - [x] Name of view
  - [x] Car creation and editing panel
  - [x] Race control panel
  - [x] Garage section
- [x] **Winners View Content (10)**
  - [x] Name of view ("Winners")
  - [x] Winners table
  - [x] Pagination
- [x] **Persistent State (30)** — page number, sort order, and form inputs are kept in Zustand stores and survive view switching

### Garage View — 90 / 90 pts

- [x] **CRUD Operations (20)** — create / update / delete; empty and too-long names handled (`maxLength={30}` + `disabled` on empty); delete also removes from `/winners`
- [x] **Color Selection (10)** — Ant Design `ColorPicker` (RGB palette), displayed on the car SVG
- [x] **Random Car Creation (20)** — `GENERATE CARS` button creates 100 cars; names assembled from 15 brands × multiple models (see `src/lib/cars.ts`), random hex color
- [x] **Car Management Buttons (10)** — `SELECT` / `REMOVE` per car
- [x] **Pagination (10)** — 7 cars per page (`PAGE_SIZE = 7`)
- [x] **EXTRA POINTS (20)**
  - [x] Empty Garage — friendly "No cars in garage" message
  - [x] Empty Garage Page — after deleting the last car on a page, store auto-navigates to previous page

### Winners View — 50 / 50 pts

- [x] **Display Winners (15)** — first car to finish a race is saved to `/winners` and shown in the table
- [x] **Pagination (10)** — 10 winners per page
- [x] **Winners Table (15)** — `№`, car icon (colored SVG), name, wins, best time; on repeat wins, `wins` increments and `time` is updated only if better
- [x] **Sorting (10)** — sort by `wins` or `time`, ASC / DESC; sorting goes through query params (`_sort` / `_order`) so the **entire dataset** is sorted server-side, not just the current page

### Race — 170 / 170 pts

- [x] **Start Engine Animation (20)** — `PATCH /engine?status=started` → animate with `distance / velocity` duration → `PATCH /engine?status=drive`; on `500` the animation stops where the car broke
- [x] **Stop Engine Animation (20)** — `PATCH /engine?status=stopped` → car returns to start position
- [x] **Responsive Animation (30)** — works on screens down to 500px (Tailwind `max-sm:` breakpoints)
- [x] **Start Race Button (10)** — starts all cars on the current page in parallel
- [x] **Reset Race Button (15)** — stops all cars on the current page in parallel and returns them to the start
- [x] **Winner Announcement (5)** — modal banner with the winning car's name and time
- [x] **Button States (20)** — engine start disabled while driving / finished / broken; engine stop disabled while idle; race start disabled while racing; reset disabled while idle
- [x] **Actions during the race (50)** — during a race: create / update / generate / delete / pagination controls are disabled; this prevents inconsistent state and is consistent across the app

### Prettier and ESLint Configuration — 10 / 10 pts

- [x] **Prettier Setup (5)** — `format` (auto-format) and `ci:format` (check-only) scripts in `package.json`
- [x] **ESLint Configuration (5)** — `eslint-config-airbnb-extended`, strict TypeScript (`strict: true`, `noImplicitAny: true`), 100-char line, max function size 40 lines

### Overall Code Quality — _Skip during self-check_

(Up to 100 discretionary points awarded by the reviewer.)

- Modular design: `src/api/`, `src/components/`, `src/hooks/`, `src/lib/`, `src/pages/`, `src/routes/`, `src/store/`, `src/types/`, `src/utils/`
- Small, focused functions — every function ≤ 40 lines (enforced by ESLint)
- No magic numbers / strings — constants in `src/lib/constants.ts`
- Custom hooks: `useCarAnimation`, `useWinnersPagination`
- React Router v7 for SPA navigation

---

## Project Structure

```
src/
├── api/            # fetch() wrappers for /garage, /winners, /engine
├── components/     # focused presentational + container components
├── hooks/          # useCarAnimation, useWinnersPagination, useWinnersColumns
├── layout/         # MainLayout with <Outlet />
├── lib/            # constants, brand/model lists
├── pages/          # Garage, Winners
├── routes/         # router config
├── store/          # Zustand stores: garage, race, winners
├── types/          # shared TS types
└── utils/          # carGenerator
```
