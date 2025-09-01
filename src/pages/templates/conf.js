import RestaurantTemplate1Router from "./restaurant/template1";
import TransportTemplate1Router from "./transport/template1";

export const TEMPLATE_REGISTRY = {
  "restaurant-template-001": {
    id: "restaurant-template-001",
    name: "Bella Vista Restaurant Template",
    category: "restaurant",
    router: RestaurantTemplate1Router,
  },

  "transport-template-001": {
    id: "transport-template-001",
    name: "TransportHub Logistics Template",
    category: "transport",
    router: TransportTemplate1Router,
  },
};
