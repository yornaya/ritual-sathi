import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext.jsx';

import Splash from './screens/Splash.jsx';
import Onboarding1 from './screens/Onboarding1.jsx';
import Onboarding2 from './screens/Onboarding2.jsx';
import Onboarding3 from './screens/Onboarding3.jsx';
import Onboarding4 from './screens/Onboarding4.jsx';
import Onboarding5 from './screens/Onboarding5.jsx';
import OnboardingDate from './screens/OnboardingDate.jsx';
import Login from './screens/Login.jsx';
import Home from './screens/Home.jsx';
import VendorDetail from './screens/VendorDetail.jsx';
import Booking from './screens/Booking.jsx';
import BookingConfirmed from './screens/BookingConfirmed.jsx';
import BudgetPlanner from './screens/BudgetPlanner.jsx';
import Profile from './screens/Profile.jsx';
import SavedVendors from './screens/SavedVendors.jsx';
import Bookings from './screens/Bookings.jsx';

function RequireAuth({ children }) {
  const { state } = useApp();
  const location = useLocation();
  if (!state.isAuthed) return <Navigate to="/" replace state={{ from: location }} />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/onboarding/1" element={<Onboarding1 />} />
      <Route path="/onboarding/2" element={<Onboarding2 />} />
      <Route path="/onboarding/3" element={<Onboarding3 />} />
      <Route path="/onboarding/4" element={<Onboarding4 />} />
      <Route path="/onboarding/date" element={<OnboardingDate />} />
      <Route path="/onboarding/5" element={<Onboarding5 />} />
      <Route path="/login" element={<Login />} />

      <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
      <Route path="/vendor/:id" element={<RequireAuth><VendorDetail /></RequireAuth>} />
      <Route path="/book/:vendorId" element={<RequireAuth><Booking /></RequireAuth>} />
      <Route path="/booking-confirmed" element={<RequireAuth><BookingConfirmed /></RequireAuth>} />
      <Route path="/budget" element={<RequireAuth><BudgetPlanner /></RequireAuth>} />
      <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
      <Route path="/profile/saved" element={<RequireAuth><SavedVendors /></RequireAuth>} />
      <Route path="/profile/bookings" element={<RequireAuth><Bookings /></RequireAuth>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
