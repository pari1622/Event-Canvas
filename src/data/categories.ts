export type Category = {
  id: number;
  slug: string;
  title: string;
  image: string;
  description: string;
  products: string[];
};

export const categories: Category[] = [
  {
    id: 1,
    slug: "printing",
    title: "Printing",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    description:
      "Brochures, flyers, posters, stickers, business stationery and premium print solutions for every occasion.",

    products: [
      "Magazine / Brochure",
      "Certificate",
      "Bookmark",
      "Letterhead",
      "Folder",
      "Visiting Cards",
      "Flyers / Pamphlets",
      "Posters",
      "Stickers / Labels",
      "Tickets / Coupons",
      "Tags",
    ],
  },

  {
    id: 2,
    slug: "apparel-merchandise",
    title: "Apparel & Merchandise",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    description:
      "Custom apparel and promotional merchandise for colleges, corporates, brands and events.",

    products: [
      "Round Neck T-Shirt",
      "Polo T-Shirt",
      "Oversized T-Shirt",
      "Acid Wash T-Shirt",
      "Hoodie",
      "Cap",
      "Tote Bag",
      "Mug",
      "Keychain",
      "Diary",
      "Pen",
      "Badge",
      "Lanyard",
    ],
  },

  {
    id: 3,
    slug: "branding-signages",
    title: "Branding & Signages",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    description:
      "Indoor and outdoor branding solutions including standees, signages, banners and displays.",

    products: [
      "Signage",
      "Banner",
      "Standee",
      "Vinyl Print",
      "Sunboard Print",
      "Backdrop",
      "Cutout",
      "Flag",
      "Flex Print",
    ],
  },

  {
    id: 4,
    slug: "corporate-gifting",
    title: "Corporate Gifting",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383",
    description:
      "Premium gifting solutions for conferences, employee recognition, branding and corporate events.",

    products: [
      "Corporate Gift Set",
      "Frame",
      "Memento",
      "Trophy",
      "Customized Gift",
    ],
  },

  {
    id: 5,
    slug: "event-solutions",
    title: "Event Solutions",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    description:
      "Complete planning, branding and execution solutions for corporate, educational and public events.",

    products: [
      "Event Management",
      "Event Branding",
      "Workshop Setup",
      "Sound & Light Setup",
      "Artist Management",
      "Registration & Ticketing",
      "Exhibition Setup",
      "Corporate Event",
      "School Event",
      "College Festival",
    ],
  },
];
