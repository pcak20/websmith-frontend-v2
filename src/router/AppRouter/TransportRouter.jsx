import { Route, Routes } from "react-router-dom";
import Homepage from "../../pages/templates/transport/template1/pages/Homepage/Homepage";
import FleetPage from "../../pages/templates/transport/template1/pages/FleetPage/FleetPage";
import AboutPage from "../../pages/templates/transport/template1/pages/AboutPage/AboutPage";
import DashboardPage from "../../pages/templates/transport/template1/pages/DashboardPage/DashboardPage";
import BookingSuccess from "../../pages/templates/transport/template1/pages/booking/BookingSuccess/BookingSuccess";
import BookingFlow from "../../pages/templates/transport/template1/pages/booking/BookingFlow/BookingFlow";
import ContactPage from "../../pages/templates/transport/template1/pages/ContactPage/ContactPage";
import LoginPage from "../../pages/templates/transport/template1/pages/LoginPage/LoginPage";
import PricingPage from "../../pages/templates/transport/template1/pages/PricingPage/PricingPage";
import RegisterPage from "../../pages/templates/transport/template1/pages/RegisterPage/RegisterPage";

function TransportRouter() {
  return (
    <Routes>
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/fleet" element={<FleetPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* BOOKING */}
      <Route path="/booking/flow" element={<BookingFlow />} />
      <Route path="/booking/booking-success" element={<BookingSuccess />} />
    </Routes>
  );
}

export default TransportRouter;
