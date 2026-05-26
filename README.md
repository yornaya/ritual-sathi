# RitualSathi — Mobile Web App

React + Vite implementation of the RitualSathi Figma prototype (Design Thinking course project).
A ritual-vendor aggregator for Indian ceremonies: weddings, annaprashan, shradhh, upanayan, engagement, anniversary, puja.

## Quick start

```bash
cd ritual-sathi
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`). Best viewed in **mobile / responsive mode** (412×1091).

## Project structure

```
src/
  main.jsx              # React entry — wraps app in Router + AppProvider
  App.jsx               # Routes (React Router)
  context/
    AppContext.jsx      # Centralized app state (user, budget, bookings, saved vendors)
  data/
    vendors.js          # All vendors + budget category mapping
    ceremonies.js       # Ceremony list + city list
  components/ui/        # Reusable: StatusBar, BottomNav, Button, Input, Slider,
                        # VendorCard, AppBar, CeremonyChip (each with own CSS)
  screens/              # One file per screen + its own CSS
    Splash.jsx
    Onboarding1..5.jsx
    Home.jsx
    VendorDetail.jsx
    Booking.jsx
    BookingConfirmed.jsx
    BudgetPlanner.jsx
    Profile.jsx
    SavedVendors.jsx
    Bookings.jsx
  styles/global.css     # Design tokens (colors, fonts, layout) from Figma
```

## Flow (matches Figma exactly)

1. **Splash** → auto-routes after ~1.8s
2. **Onboarding 1** "Plan every ceremony, effortlessly" → Sign Up / Get Started
3. **Onboarding 2** Create Account form
4. **Onboarding 3** Pick ceremonies (multi-select chips)
5. **Onboarding 4** Budget slider (₹0 – ₹50 L, default ₹25 L)
6. **Onboarding 5** Pick city → DONE!
7. **Home** Search + ceremony chips + vendor list (filtered to fit budget)
8. **Vendor Detail** Photo, rating, menu/price list, BOOK NOW, save (♡)
9. **Booking** Form with sliders → CONFIRM BOOKING
10. **Booking Confirmed** Reference code → BACK TO HOME
11. **Budget Planner** Hero card showing budget from onboarding, 6 categories
12. **Profile** Stats, ceremonies, vendors, saved, bookings, account, log out
13. **Saved Vendors** / **My Bookings** screens off Profile

## Features

- **Slider-driven budget** — set in Onboarding 4, used in Home filter, Booking form, Budget Planner
- **All vendors bookable** with category-aware cost calculation (plate-based vs day-based vs event-based)
- **Bottom nav** wired to Home / Budget / Profile across all main screens
- **Saved vendors** — heart icon on vendor detail; viewable from Profile
- **Bookings persisted** — split into Upcoming / Past on Profile › My Bookings
- **Log out** wipes state and returns to Splash
- **State persisted** to `localStorage` (`ritual-sathi-state-v1`) so refresh keeps everything

## Design tokens

All colors/fonts come straight from the Figma export — see CSS variables at top of `src/styles/global.css`.
Hero gradient: `linear-gradient(180deg, #FF6262 0%, #F9783A 64%, #F5891C 100%)`.
Fonts: Inter (UI), Playfair Display (display), Roboto Mono (refs/codes).
