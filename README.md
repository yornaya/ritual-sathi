# RitualSathi — Ceremony Vendor Aggregator

> **Plan every ceremony, effortlessly.**

RitualSathi is a mobile-first platform that solves a deeply felt problem across urban and semi-urban India: there is no single trusted place to discover, compare, and book vendors for Indian ceremonies. Today, 80% of families rely entirely on word-of-mouth, vendors are scattered across cities with no upfront pricing, and 33% of ceremony planners face budget overruns. RitualSathi brings caterers, decorators, photographers, and priests onto one platform: filtered by city, ceremony type, and budget, so families can plan a Wedding, Annaprashan, Upanayan, Shraddh, Engagement, or Anniversary with verified ratings, transparent costs, and confirmed bookings, all without a single phone call.

Built as a frontend prototype for the **[TIU-UCBCS-S208] Design Thinking** course by Group 3.

**Live Demo:** [ritual-sathi.vercel.app](https://ritual-sathi.vercel.app/)
> Best viewed in mobile / responsive mode (412 × 1091 px).

---

## Local Development

```bash
cd ritual-sathi
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`) in your browser and enable mobile/responsive view in DevTools.

---

## Features

### Onboarding & Personalisation
- Multi-step onboarding collects ceremony preferences, budget, date, and city before the user reaches the Home screen
- **Budget slider** (Rs. 0 – Rs. 50 Lakh, default Rs. 25 L) is configured once during onboarding and propagates across the entire app
- **Multi-select ceremony chips** allow users to tag all ceremonies they are planning in a single step

### Vendor Discovery & Booking
- **Smart vendor feed** on the Home screen automatically filters vendors to fit within the user's configured budget
- **Search** vendors by name or service category
- **City-localised venue defaults** — the default venue in the Booking form automatically matches the city chosen during onboarding or updated from the Profile tab
- **Vendor Detail** page displays photos, ratings, a full service menu, and itemised pricing
- **Flexible cost calculation** — vendors are priced by plate count, event duration, or per-event basis depending on their category
- **Star rating** is shown on the vendor info card inside the Booking form
- **Save vendors** using the heart icon on the Vendor Detail page for quick access later

### Booking Management
- **Booking form** features interactive sliders for guest count and date selection with a real-time cost preview
- Each confirmed booking generates a unique **reference code**
- **My Bookings** screen organises bookings into the **Upcoming** tab

### Budget Planner
- Dedicated Budget Planner screen with a hero card displaying the user's remaining balance
- Breaks down spending across 6 ceremony categories at a glance

### Profile & State Persistence
- Profile screen surfaces personal stats: ceremonies planned, vendors saved, and bookings made
- All application state (bookings, saved vendors, user profile) is **persisted to `localStorage`** under the key `ritual-sathi-state-v1`, ensuring data survives a page refresh
- **Log out** clears all persisted state and redirects to the Splash screen

### Internationalisation
- i18n support scaffolded under `src/i18n/` for future multi-language expansion (English and Hindi stubs included)

---

## Supported Ceremonies

Wedding · Annaprashan · Shraddh · Upanayan · Engagement · Anniversary

---

## Project Structure

```
ritual-sathi/
├── src/
│   ├── main.jsx                  # Entry point — mounts app inside Router + AppProvider
│   ├── App.jsx                   # Route definitions (React Router v6)
│   │
│   ├── context/
│   │   └── AppContext.jsx        # Global state: user, budget, bookings, saved vendors
│   │
│   ├── data/
│   │   ├── vendors.js            # Vendor catalogue + budget-category mapping
│   │   └── ceremonies.js         # Ceremony list + supported cities
│   │
│   ├── components/
│   │   └── ui/                   # Reusable UI components (each with co-located CSS)
│   │       ├── StatusBar
│   │       ├── BottomNav
│   │       ├── Button
│   │       ├── Input
│   │       ├── Slider
│   │       ├── VendorCard
│   │       ├── AppBar
│   │       ├── PickerOverlay
│   │       └── CeremonyChip
│   │
│   ├── screens/                  # One file per screen + co-located CSS
│   │   ├── Splash.jsx
│   │   ├── Onboarding1.jsx
│   │   ├── Onboarding2.jsx
│   │   ├── Onboarding3.jsx
│   │   ├── Onboarding4.jsx
│   │   ├── Onboarding5.jsx
│   │   ├── OnboardingDate.jsx
│   │   ├── Login.jsx
│   │   ├── Home.jsx
│   │   ├── VendorDetail.jsx
│   │   ├── Booking.jsx
│   │   ├── BookingConfirmed.jsx
│   │   ├── BudgetPlanner.jsx
│   │   ├── Profile.jsx
│   │   ├── SavedVendors.jsx
│   │   └── Bookings.jsx
│   │
│   ├── i18n/                     # Internationalisation stubs (en, hi)
│   └── styles/
│       └── global.css            # Global CSS variables, fonts, and layout resets
```

---

## Tech Stack

| Layer     | Technology                           |
|-----------|--------------------------------------|
| Framework | React 18                             |
| Bundler   | Vite                                 |
| Routing   | React Router v6                      |
| State     | React Context API + localStorage     |
| Styling   | Plain CSS (co-located per component) |
| Fonts     | Inter, DM Sans, Roboto               |

---

## Team

**[TIU-UCBCS-S208] Design Thinking — Group 3**

| Roll No      | Name            |
|--------------|-----------------|
| 241001020015 | Mandira Barman  |
| 241001020016 | Protush Saha    |
| 241001020017 | Ishika Gupta    |
| 241001020018 | Akashdip Bag    |
| 241001020019 | Ayan Roy        |
| 241001020020 | Anant Raj       |
