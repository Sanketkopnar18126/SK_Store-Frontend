export type ProductFormValues = {
name: string;
price: number;
stock: number;
description: string;
category: string;
imageUrls?: string[]; 
};


export type ProductPayload = {
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



///============== User -==============

export interface UserResponseDto {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: UserResponseDto;
  expiresAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

/// Check Out

export interface CheckoutItemDto {
  productId: number;
  quantity: number;
  price: number;
}

export interface CheckoutOrderDto {
  items: CheckoutItemDto[];
}

export interface CheckoutResponseDto {
  order: {
    orderId: string; 
    totalAmount: number;
    staus:string
  };
  payment: {
    key: string;
    amount: number;
    razorpayOrderId: string;
  };
}

export interface VerifyPaymentDto {
  orderId: string;       // razorpay_order_id
  paymentId: string;     // razorpay_payment_id
  signature: string;     // razorpay_signature
}
