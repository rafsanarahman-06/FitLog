# FitLog — Workout Library

FitLog is a dark, responsive workout library built with Next.js. Users can browse workouts, view detailed exercise information, add exercises to today's plan, save workouts for later, and track their daily workout statistics.

## Technologies Used

* Next.js
* React
* JavaScript
* Tailwind CSS
* React Hot Toast
* REST API
* LocalStorage

## Features

* Responsive workout library for mobile, tablet, and desktop
* Fetches workout data from the FitLog API
* Browse 12 different workouts
* Workout detail pages with instructions and specifications
* Add workouts to today's plan
* Save workouts for later
* Five-workout daily plan limit
* Live exercise, duration, and calorie metrics
* Mark workouts as done
* Remove planned or saved workouts
* Sort workouts by duration, calories, or rating
* Toast notifications for user actions
* LocalStorage support for preserving plan and saved workouts
* Custom 404 page
* Responsive mobile navigation menu
* Loading animation while workouts are being fetched

## Project Structure

```text
app/
├── components/
│   ├── Navbar.js
│   ├── WorkoutCard.js
│   └── WorkoutLibrary.js
├── context/
│   └── FitLogContext.js
├── lib/
│   └── api.js
├── my-plan/
│   └── page.js
├── workout/
│   └── [id]/
│       └── page.js
├── globals.css
├── layout.js
├── not-found.js
└── page.js

public/
├── banner.png
└── logo.png
```

## Getting Started

Clone the repository and install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Build for Production

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

## Project Highlights

FitLog is designed as a simple, focused workout companion where users can browse a workout library, inspect exercise details, build a daily plan, save exercises for later, and track their workout progress.
