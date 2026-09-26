# FitLog — Workout Library & Daily Plan Tracker

FitLog is a dark, premium, editorial fitness workout library and tracking web application built with **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**. Designed with an athletic, high-contrast aesthetic, FitLog empowers users to explore a comprehensive directory of strength exercises, lock up to 5 lifts into today's active plan, track live performance metrics, bookmark routines for later, and persist state across sessions.

---

## ⚡ Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server & Client Components)
- **UI & Logic**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), `next/font` (Oswald & Inter typography)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.si/) (Accessible Toast System)
- **State & Persistence**: React Context + `useReducer`, `localStorage`
- **Data Layer**: Native Fetch API with normalized TypeScript interfaces

---

## 🔥 Key Features

1. **Dynamic Workout Library**: Fetches master workout entries in real time from the FitLog API, complete with muscle group tags, equipment requirements, duration, calorie burn, rating, and step-by-step instructions.
2. **Instant Library Sorting**: Filter and re-sort workouts on the fly by **Duration** (Ascending), **Calories** (Ascending), or **Rating** (Descending).
3. **Today's Plan & 5-Workout Cap**: Add exercises to Today's Plan with an enforced **5-workout daily cap**, duplicate detection, and visual completion toggles ("Mark as Done").
4. **Saved Workouts**: Bookmark routines into a dedicated **Saved** tab to curate personal fitness goals for future sessions.
5. **Live Performance Metrics**: Real-time calculation of **Total Exercises**, **Total Minutes**, and **Total Calories Burned** for today's active plan.
6. **Persistent Client-Side State**: Safe `localStorage` synchronization ensuring Today's Plan, Saved items, and Completed flags survive page reloads and browser restarts without SSR hydration mismatch.
7. **Polished Micro-Interactions & Skeletons**: Custom shimmer loading skeletons during API fetching, smooth anchor scrolling, responsive cards, and dynamic navbar badge counters.
8. **Custom 404 & Error Handling**: Editorial error state cards with retry actions and a custom `not-found.tsx` page for invalid workout IDs or unknown routes.

---

## 📡 API Endpoints

- **All Workouts**: `https://api.abcz.workers.dev/api/fitlog`
- **Single Workout**: `https://api.abcz.workers.dev/api/fitlog/:id`

---

## 🗺️ Application Routes

| Route | Description |
| :--- | :--- |
| `/` | **Home Page**: Hero banner, smooth scroll CTA, sortable exercise library, and global footer. |
| `/workout/[id]` | **Workout Details**: Two-column layout with high-res media, key specs panel, ordered instructions, Add to Plan, and Save buttons. |
| `/my-plan` | **My Plan**: Live metrics summary, Today's Plan and Saved tabs, Mark as Done, Remove actions, and empty states. |
| `/*` | **404 Page**: Custom dark/lime 404 page for unknown routes or missing workout IDs. |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/xionmahadi/Fit-Log-Assignment.git
cd fit-log
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build & Production

To generate a static and server-optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

---

## 🎨 Design System

FitLog follows a strict, high-contrast gym aesthetic:

- **Primary Background**: `#080808` (Deep Near-Black)
- **Surface**: `#111111`
- **Cards**: `#151515`
- **Borders**: `#222222` / `rgba(255, 255, 255, 0.12)`
- **Primary Accent**: `#CCFF00` (Acid Lime / Electric Neon)
- **Display Typography**: **Oswald** (Bold, condensed uppercase headings)
- **Body & UI Typography**: **Inter** (Clean, highly legible sans-serif)

---

## 📁 Project Structure

```
Fit-Log-Assignment/
├── app/
│   ├── globals.css          # Tailwind base & custom animations
│   ├── layout.tsx           # Root layout with fonts & global providers
│   ├── page.tsx             # Home route
│   ├── not-found.tsx        # Custom 404 route
│   ├── my-plan/             # My Plan route
│   └── workout/[id]/        # Dynamic Workout Detail route
├── components/
│   ├── Logo.tsx             # FitLog brand logo
│   ├── Navbar.tsx           # Navigation bar with live badges
│   ├── Footer.tsx           # Global footer
│   ├── Hero.tsx             # Top hero banner
│   ├── WorkoutLibrary.tsx   # Library grid container
│   ├── WorkoutCard.tsx      # Exercise item card
│   ├── SortDropdown.tsx     # Library sorting control
│   ├── SpecsPanel.tsx       # Key specs display
│   ├── InstructionList.tsx  # Step-by-step exercise instructions
│   ├── PlanMetrics.tsx      # Live exercise/minutes/calorie metrics
│   ├── PlanTabs.tsx         # Today's Plan & Saved switcher
│   ├── PlanWorkoutCard.tsx  # Card for My Plan view
│   ├── EmptyState.tsx       # Empty list placeholders
│   ├── LoadingSkeleton.tsx  # Skeleton cards loading state
│   ├── ErrorState.tsx       # API error fallback card
│   └── ToastProvider.tsx    # Sonner toast provider
├── lib/
│   ├── api.ts               # Data fetcher & normalizer
│   ├── context.tsx          # Global state & localStorage sync
│   ├── types.ts             # TypeScript interfaces
│   └── utils.ts             # Tailwind merger & sorting utilities
├── public/
│   └── assets/              # Static logo & banner images
├── tailwind.config.ts       # Design tokens & color palette
├── next.config.mjs          # Next.js configuration & remote image patterns
└── package.json
```

---

## 📄 License & Credits

- Built as part of the FitLog Master Assignment.
- API powered by Cloudflare Workers (`api.abcz.workers.dev`).