import { AdminLayout } from "../../Components/AdminLayout/AdminLayout";
import ProductForm from "../../Components/AdminLayout/ProductForm/ProductForm";

export const AddProduct = () => {

  return (
    <AdminLayout>
      <ProductForm submitLabel="Add Product" />
    </AdminLayout>
  );
};
