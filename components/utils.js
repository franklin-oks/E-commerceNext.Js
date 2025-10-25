export const sliders = [
  {
    id: 1,
    title: "December Promo!",
    description: "sales up to 50% off",
    url: "/products",
    image:
      "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50 ",
  },
  {
    id: 2,
    title: "All Season Sale Collection",
    description: "sales up to 50% off",
    url: "/products",
    image:
      "https://images.unsplash.com/photo-1565548058654-6ba93b5e3135?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50 ",
  },
  {
    id: 3,
    title: "Nikamanda Best Collection",
    description: "sales up to 50% off",
    url: "/products",
    image:
      "https://media.istockphoto.com/id/2183222014/photo/a-stylish-young-man-poses-in-a-black-coat-and-yellow-beanie-against-a-backdrop.webp?s=1024x1024&w=is&k=20&c=W1b0ERR3dMNuUtfm3YtBWqC5s93LOUCUz8wFQT7e5P4=",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50 ",
  },
];

export const categories = [
  {
    slug: "females", // MUST match the slug in your Supabase categories table
    name: "Female Wears", // fallback label (DB will override if available)
    image:
      "https://images.unsplash.com/photo-1441123694162-e54a981ceba5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    slug: "male",
    name: "Men Wears",
    image:
      "https://plus.unsplash.com/premium_photo-1675080431524-3e7c85323972?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    slug: "foot",
    name: "Foot wears",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    slug: "babies",
    name: "Babies",
    image:
      "https://images.unsplash.com/photo-1441123694162-e54a981ceba5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    slug: "ankara",
    name: "Ankara",
    image:
      "https://images.unsplash.com/photo-1757140447779-9cffcc270104?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  // add more static categories here and match 'slug' to your DB slug
];
