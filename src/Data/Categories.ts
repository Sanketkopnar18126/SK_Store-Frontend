// src/data/categoriesData.ts

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  backendKey:string
};

export const categories: Category[] = [
  {
    id: 1,
    name: "Cosmetics",
    slug: "cosmetics",
    backendKey: "Cosmetics",
  },
  {
    id: 2,
    name: "Agarbatti & Dhoop",
    slug: "incense",
    backendKey: "Incense Sticks",
  },
  {
    id: 3,
    name: "Jewelry",
    slug: "jewelry",
    backendKey: "Jwellery",
  },
  {
    id: 4,
    name: "Clothing",
    slug: "clothing",
    backendKey: "Clothing",
  },
];

