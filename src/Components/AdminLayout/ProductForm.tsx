import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../Ui/input";
import { Textarea } from "../Ui/textarea";
import { Label } from "../Ui/label"; 
import { Button } from "../Ui/button";

export type ProductFormValues = {
  name: string;
  price: number;
  stock: number;
  description: string;
  category: string;
  image?: FileList;
};

type Props = {
  defaultValues?: ProductFormValues;
  onSubmit: (data: ProductFormValues) => void;
  submitLabel?: string;
};

export const ProductForm: React.FC<Props> = ({
  defaultValues,
  onSubmit,
  submitLabel = "Save Product",
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: defaultValues || {
      name: "",
      price: 0,
      stock: 0,
      description: "",
      category: "",
      image: undefined,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center">
        {submitLabel}
      </h2>

      {/* Product Name */}
      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          {...register("name", { required: "Name is required" })}
          placeholder="Enter product name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Price & Stock */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            {...register("price", { required: "Price is required", min: 0 })}
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            {...register("stock", { required: "Stock is required", min: 0 })}
            placeholder="Enter stock quantity"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          rows={4}
          placeholder="Enter product description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Category */}
      {/* Category */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          {...register("category", { required: "Category is required" })}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          defaultValue=""
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Home">Home</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="image">Product Image</Label>
        <Controller
          control={control}
          name="image"
          rules={{ required: "Image is required" }}
          render={({ field }) => (
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => field.onChange(e.target.files)}
            />
          )}
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>

      <div className="mt-4">
        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
