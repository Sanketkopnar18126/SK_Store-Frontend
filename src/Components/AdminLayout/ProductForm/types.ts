export type ProductFormValues = {
name: string;
price: number;
stock: number;
description: string;
category: string;
imageUrls?: string[]; 
};


export type UploadResponse = {
urls: string[]; 
};

// src/API/types.ts
export type ProductLite = {
  id: number;
  name: string;
  price: number;
  imageUrls?: string[];
  category?: string;
};

export type CartItemPayload = {
  productId: number;
  quantity: number;
};

// Server response for one cart item
export type CartItemResponse = {
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
};

// Server's cart shape returned by endpoints
export type CartResponse = {
  userId: number;
  items: CartItemResponse[];
  total: number;
};
