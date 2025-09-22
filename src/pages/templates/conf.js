import TransportTemplate1Router from "./displays/transport/template1";
import restaurantTemplate1Conf from "./displays/restaurant/template1/conf";

export const TEMPLATE_REGISTRY = {
  "restaurant-template-001": {
    id: "restaurant-template-001",
    name: "Bella Vista Restaurant Template",
    category: "restaurant",
    conf: restaurantTemplate1Conf,
  },

  "transport-template-001": {
    id: "transport-template-001",
    name: "TransportHub Logistics Template",
    category: "transport",
    router: TransportTemplate1Router,
  },
};
