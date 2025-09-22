import DisplayRouter from "./DisplayRouter";
import EditorRouter from "./EditorRouter";

const conf = {
  displayRouter: DisplayRouter,
  editorRouter: EditorRouter,
  themes: {
    default: {
      name: "Default",
      description: "Default restaurant colors",
      primary: "#d97706",
      secondary: "#f59e0b",
      accent: "#fbbf24",
      highlight: "#dc2626",
    },
    ocean: {
      name: "Ocean Blue",
      description: "Cool ocean vibes",
      primary: "#0ea5e9",
      secondary: "#06b6d4",
      accent: "#22d3ee",
      highlight: "#e11d48",
    },
    forest: {
      name: "Forest Green",
      description: "Natural and fresh",
      primary: "#16a34a",
      secondary: "#22c55e",
      accent: "#84cc16",
      highlight: "#dc2626",
    },
  },
  availablePages: [
    { id: "home", name: "Homepage", key: "home" },
    { id: "menu", name: "Menu", key: "menu" },
    { id: "about", name: "About", key: "about" },
    { id: "gallery", name: "Gallery", key: "gallery" },
    { id: "contact", name: "Contact", key: "contact" },
    { id: "cart", name: "Cart", key: "cart" },
    { id: "checkout", name: "Checkout", key: "checkout" },
    { id: "order-tracking", name: "Order Tracking", key: "order-tracking" },
    { id: "account", name: "Account", key: "account" },
    { id: "reservation", name: "Reservation", key: "reservation" },
  ],
};

export default conf;
