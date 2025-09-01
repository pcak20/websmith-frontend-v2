import { Route, Routes } from "react-router-dom";
import RestaurantHomepage from "../../pages/templates/restaurant/template1/pages/Homepage/Homepage";
import RestaurantMenuPage from "../../pages/templates/restaurant/template1/pages/MenuPage/MenuPage";
import RestaurantCartPage from "../../pages/templates/restaurant/template1/pages/CartPage/CartPage";
import RestaurantCheckoutPage from "../../pages/templates/restaurant/template1/pages/CheckoutPage/CheckoutPage";
import RestaurantOrderTrackingPage from "../../pages/templates/restaurant/template1/pages/OrderTrackingPage/OrderTrackingPage";
import RestaurantAboutPage from "../../pages/templates/restaurant/template1/pages/AboutPage/AboutPage";
import RestauranAccountPage from "../../pages/templates/restaurant/template1/pages/AccountPage/AccountPage";
import RestaurantGalleryPage from "../../pages/templates/restaurant/template1/pages/GalleryPage/GalleryPage";
import RestaurantContactPage from "../../pages/templates/restaurant/template1/pages/ContactPage/ContactPage";
import RestaurantReservationPage from "../../pages/templates/restaurant/template1/pages/ReservationPage/ReservationPage";

function RestaurantRouter() {
  return (
    <Routes>
      <Route path="/homepage" element={<RestaurantHomepage />} />
      <Route path="/menu" element={<RestaurantMenuPage />} />
      <Route path="/cart" element={<RestaurantCartPage />} />
      <Route path="/checkout" element={<RestaurantCheckoutPage />} />
      <Route path="/orderTracking" element={<RestaurantOrderTrackingPage />} />
      <Route path="/about" element={<RestaurantAboutPage />} />
      <Route path="/account" element={<RestauranAccountPage />} />
      <Route path="/contact" element={<RestaurantContactPage />} />
      <Route path="/gallery" element={<RestaurantGalleryPage />} />
      <Route path="/reservation" element={<RestaurantReservationPage />} />
    </Routes>
  );
}

export default RestaurantRouter;
