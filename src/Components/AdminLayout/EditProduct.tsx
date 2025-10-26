import type { ProductFormValues } from "./ProductForm/types";
import { AdminLayout } from "./AdminLayout";
import ProductForm from "./ProductForm/ProductForm";


const mockProduct: ProductFormValues = {
  name: "Laptop",
  price: 80000,
  stock: 10,
  description: "High performance laptop",
  category: "Electronics",
  imageUrls: undefined,
};

export const EditProduct = () => {

  return (
    <AdminLayout>
      <ProductForm defaultValues={mockProduct} submitLabel="Update Product" />
    </AdminLayout>
  );
};
