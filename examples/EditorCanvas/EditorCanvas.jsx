import React from "react";
import HomePage from "./displays/restaurant/template1/pages/Homepage/Homepage";
import { Pizza } from "lucide-react";
function EditorCanvas() {
  const myThemes = {
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
  };

  const menuData = {
    dishes: [
      {
        id: 1,
        name: "Custom Pizza",
        description: "My special pizza",
        price: 19.99,
        category: "pizza",
        // ... other properties
      },
    ],
    categories: [{ id: "pizza", name: "Pizzas", icon: <Pizza size={20} /> }],
  };
  return (
    <HomePage
      themes={myThemes}
      defaultTheme="ocean"
      showThemeSelector={true}
      menuData={menuData}
    />
  );
}

export default EditorCanvas;
