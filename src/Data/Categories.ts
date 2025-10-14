// src/data/categoriesData.ts

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
};

export const categories: Category[] = [
  { id: 1, name: "Cosmetics", slug: "cosmetics", description: "Beauty & skincare" },
  { id: 2, name: "Agarbatti & Dhoop", slug: "incense", description: "Incense sticks & dhoop" },
  { id: 3, name: "Jewelry", slug: "jewelry", description: "Traditional & modern jewelry" },
  { id: 4, name: "Clothing", slug: "clothing", description: "Ethnic & casual wear" },
  { id: 5, name: "Accessories", slug: "accessories", description: "Bags, hair clips, bangles" },
  { id: 6, name: "Home Fragrance", slug: "home-fragrance", description: "Candles & diffusers" },
];
