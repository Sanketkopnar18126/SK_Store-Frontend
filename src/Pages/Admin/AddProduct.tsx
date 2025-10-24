import { AdminLayout } from "../../Components/AdminLayout/AdminLayout";
import { ProductForm } from "../../Components/AdminLayout/ProductForm";
import type { ProductFormValues } from "../../types";


export const AddProduct = () => {
  const handleAddProduct = (data: ProductFormValues) => {
    console.log("Add Product:", data);
    // connect to your .NET API later
  };

  return (
    <AdminLayout>
      <ProductForm onSubmit={handleAddProduct} submitLabel="Add Product" />
    </AdminLayout>
  );
};
