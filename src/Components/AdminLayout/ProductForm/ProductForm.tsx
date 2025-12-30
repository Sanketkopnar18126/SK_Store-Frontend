import React from "react";
import type { ProductFormValues } from "./types";
import ImageUploader from "./ImageUploader";
import { Grid } from "@mui/material"; // parent container
import ItemGrid from "./ItemGrid"; // child items wrapper
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Store";
import { useForm, Controller } from "react-hook-form";
import { clearUploadedUrls, createProduct } from "../../../Store/Slices/ProductSlice";
import { toast } from "sonner";

type Props = {
  defaultValues?: ProductFormValues;
  productId?: number;
  submitLabel: string;
};

const ProductForm: React.FC<Props> = ({ defaultValues, submitLabel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const uploadedUrls = useSelector(
    (state: RootState) => state.products.uploadedUrls
  );
  const saving = useSelector((state: RootState) => state.products.saving);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: defaultValues || {
      name: "",
      price: 0,
      stock: 0,
      description: "",
      category: "",
      imageUrls: [],
    },
  });

  const onSubmit = async(data: ProductFormValues) => {
      try {
    const result = await dispatch(
      createProduct({ ...data, imageUrls: uploadedUrls })
    );

    if (createProduct.fulfilled.match(result)) {
      toast.success("Product added successfully 🎉");
      reset({
        name: "",
        price: 0,
        stock: 0,
        description: "",
        category: "",
        imageUrls: [],
      });

      dispatch(clearUploadedUrls());
    } else {
      toast.error("Failed to add product");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: 4,
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        textAlign="center"
        fontWeight="bold"
      >
        {submitLabel}
      </Typography>

      {/* Name */}
      <Controller
        name="name"
        control={control}
        rules={{ required: "Name required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      {/* Price & Stock */}
      <Grid container spacing={2}>
        <ItemGrid item xs={12} sm={6}>
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price required",
              validate: (value) =>
                Number(value) >= 0 || "Price must be >= 0",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                type="number"
                fullWidth
                inputProps={{
                  min: 0,        
                  step: 0.01,
                }}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />

        </ItemGrid>

        <ItemGrid item xs={12} sm={6}>
          <Controller
            name="stock"
            control={control}
            rules={{
              required: "Stock required",
              validate: (value) =>
                Number(value) >= 0 || "Stock must be >= 0",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Stock"
                type="number"
                fullWidth
                inputProps={{
                  min: 0,   
                  step: 1,
                }}
                error={!!errors.stock}
                helperText={errors.stock?.message}
              />
            )}
          />
        </ItemGrid>
      </Grid>

      {/* Description */}
      <Controller
        name="description"
        control={control}
        rules={{ required: "Description required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            fullWidth
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />

      {/* Category */}
      <FormControl fullWidth error={!!errors.category}>
        <InputLabel id="category-label">Category</InputLabel>
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category required" }}
          render={({ field }) => (
            <Select
              {...field}
              labelId="category-label"
              value={field.value ?? ""}
              label="Category"
            >
              <MenuItem value="" disabled>
                Select category
              </MenuItem>
              <MenuItem value="Jwellery">Jwellery</MenuItem>
              <MenuItem value="Perfumes">Perfumes</MenuItem>
              <MenuItem value="Incense Sticks">Incense Sticks</MenuItem>
              <MenuItem value="Home">Home</MenuItem>
            </Select>
          )}
        />
        {errors.category && (
          <Typography variant="body2" color="error" mt={0.5}>
            {errors.category.message}
          </Typography>
        )}
      </FormControl>

      {/* Image Uploader */}
      <Box>
        <Typography variant="subtitle1" mb={1}>
          Images
        </Typography>
        <ImageUploader />
      </Box>

      {/* Submit */}
      <Button type="submit" variant="contained" disabled={saving} fullWidth>
        {saving ? "Saving..." : submitLabel}
      </Button>
    </Box>
  );
};

export default ProductForm;
