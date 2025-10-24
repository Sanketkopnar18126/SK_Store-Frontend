import type { ProductFormValues } from "../../types";
import { AdminLayout } from "./AdminLayout";
import { ProductForm } from "./ProductForm";


const mockProduct: ProductFormValues = {
  name: "Laptop",
  price: 80000,
  stock: 10,
  description: "High performance laptop",
  category: "Electronics",
  image: undefined,
};

export const EditProduct = () => {
  const handleEditProduct = (data: ProductFormValues) => {
    console.log("Edit Product:", data);
  };

  return (
    <AdminLayout>
      <ProductForm defaultValues={mockProduct} onSubmit={handleEditProduct} submitLabel="Update Product" />
    </AdminLayout>
  );
};
