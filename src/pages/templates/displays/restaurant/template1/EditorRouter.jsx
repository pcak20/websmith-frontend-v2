// Import your actual template pages
import Homepage from "./pages/Homepage/Homepage";
import AboutPage from "./pages/AboutPage/AboutPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import OrderTrackingPage from "./pages/OrderTrackingPage/OrderTrackingPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import ReservationPage from "./pages/ReservationPage/ReservationPage";

const EditorRouter = ({
  currentPage,
  theme,

  features,
  websiteData,
  templateId,
  isEditor = true,
}) => {
  const renderPage = () => {
    const commonProps = {
      theme: theme,
      isEditor: isEditor,
      websiteData: websiteData,
      templateId: templateId,
      features: features,
      isContained: true,
    };

    switch (currentPage.key) {
      case "home":
        return <Homepage {...commonProps} />;
      case "menu":
        return <MenuPage {...commonProps} />;
      case "about":
        return <AboutPage {...commonProps} />;
      case "gallery":
        return <GalleryPage {...commonProps} />;
      case "contact":
        return <ContactPage {...commonProps} />;
      case "reservations":
        return <ReservationPage {...commonProps} />;
      case "cart":
        return <CartPage {...commonProps} />;
      case "checkout":
        return <CheckoutPage {...commonProps} />;
      case "order-tracking":
        return <OrderTrackingPage {...commonProps} />;
      case "account":
        return <AccountPage {...commonProps} />;
      case "reservation":
        return <ReservationPage {...commonProps} />;
      default:
        return <Homepage {...commonProps} />;
    }
  };

  return (
    <div className="template-preview" style={{ width: "100%", height: "100%" }}>
      {renderPage()}
    </div>
  );
};

export default EditorRouter;
