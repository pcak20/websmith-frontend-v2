import {
  ArrowLeft,
  Save,
  Eye,
  Globe,
  Settings,
  Layers,
  Type,
  Palette,
  Image,
  Layout,
  Smartphone,
  Monitor,
  Tablet,
  Undo,
  Redo,
  Square,
  FileText,
  Link,
  Grid,
  Edit3,
  Zap,
} from "lucide-react";

export const elementLibrary = {
  basic: [
    {
      id: "text",
      name: "Text",
      icon: Type,
      description: "Simple text block",
    },
    {
      id: "heading",
      name: "Heading",
      icon: Type,
      description: "Page heading",
    },
    {
      id: "paragraph",
      name: "Paragraph",
      icon: FileText,
      description: "Text paragraph",
    },
    {
      id: "button",
      name: "Button",
      icon: Square,
      description: "Call-to-action button",
    },
    { id: "image", name: "Image", icon: Image, description: "Single image" },
    { id: "link", name: "Link", icon: Link, description: "Hyperlink" },
  ],
  layout: [
    {
      id: "container",
      name: "Container",
      icon: Square,
      description: "Content container",
    },
    { id: "grid", name: "Grid", icon: Grid, description: "Grid layout" },
    {
      id: "columns",
      name: "Columns",
      icon: Layout,
      description: "Column layout",
    },
    {
      id: "spacer",
      name: "Spacer",
      icon: Square,
      description: "Empty space",
    },
  ],
  components: [
    {
      id: "hero",
      name: "Hero Section",
      icon: Layout,
      description: "Hero banner",
    },
    { id: "card", name: "Card", icon: Square, description: "Content card" },
    {
      id: "gallery",
      name: "Gallery",
      icon: Image,
      description: "Image gallery",
    },
    {
      id: "form",
      name: "Contact Form",
      icon: FileText,
      description: "Contact form",
    },
    {
      id: "testimonial",
      name: "Testimonial",
      icon: FileText,
      description: "Customer testimonial",
    },
    {
      id: "pricing",
      name: "Pricing Table",
      icon: Grid,
      description: "Pricing plans",
    },
  ],
};

export const mockTemplatePages = [
  {
    id: "home",
    name: "Home",
    path: "/",
    template: "home-template",
    sections: [
      { id: "hero", type: "hero", title: "Hero Section", content: {} },
      { id: "about", type: "content", title: "About Section", content: {} },
      { id: "services", type: "grid", title: "Services", content: {} },
      { id: "contact", type: "contact", title: "Contact", content: {} },
    ],
  },
  {
    id: "about",
    name: "About Us",
    path: "/about",
    template: "content-template",
    sections: [
      { id: "header", type: "header", title: "Page Header", content: {} },
      { id: "story", type: "content", title: "Our Story", content: {} },
      { id: "team", type: "team", title: "Team Members", content: {} },
    ],
  },
  {
    id: "services",
    name: "Services",
    path: "/services",
    template: "services-template",
    sections: [
      { id: "header", type: "header", title: "Page Header", content: {} },
      {
        id: "services-grid",
        type: "grid",
        title: "Services Grid",
        content: {},
      },
      { id: "pricing", type: "pricing", title: "Pricing", content: {} },
    ],
  },
  {
    id: "contact",
    name: "Contact",
    path: "/contact",
    template: "contact-template",
    sections: [
      { id: "header", type: "header", title: "Page Header", content: {} },
      {
        id: "contact-form",
        type: "form",
        title: "Contact Form",
        content: {},
      },
      { id: "map", type: "map", title: "Location Map", content: {} },
    ],
  },
];
