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