// src/types.ts
export type ProductFormValues = {
  name: string;
  price: number;
  stock: number;
  description: string;
  category: string;
  image?: FileList | undefined;
};
