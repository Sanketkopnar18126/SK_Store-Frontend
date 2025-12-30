import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { adminProductApi, type ProductResponse } from "../../API/Admin_API/adminProductApi";
import type { ProductFormValues } from "../../Components/AdminLayout/ProductForm/types";
import { productApi } from "../../API/Product_API/productApi";

interface ProductState {
  uploading: boolean;
  saving: boolean;
  loading: boolean; 
  uploadedUrls: string[];
  products: Record<string, ProductResponse[]>;
  selectedProduct?: ProductResponse;
  recommended: ProductResponse[];
  error?: string;
}

const initialState: ProductState = {
  uploading: false,
  saving: false,
  loading:false,
  uploadedUrls: [],
  products: {},
  selectedProduct: undefined,
  recommended:[]
};

// --- Thunks ---

// Get All Product

export const getAllProducts = createAsyncThunk<Record<string, ProductResponse[]>>(
  "products/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminProductApi.getAll();
      //  return res.data as Record<string, ProductResponse[]>;
      return res.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? err.message ?? "Failed to fetch products");
    }
  }
);


// Create product
export const createProduct = createAsyncThunk(
  "products/create",
  async (product: ProductFormValues, { rejectWithValue }) => {
    try {
      const res = await adminProductApi.create(product);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Upload images for a product
export const uploadImages = createAsyncThunk(
  "products/uploadImages",
  async (files: File[], { rejectWithValue }) => {
    try {
      const res = await adminProductApi.uploadImages(files); 
      const data: any = res.data;
      const urls: string[] = data?.urls ?? data?.imageUrls ?? [];
      return Array.isArray(urls) ? urls : [];
    } catch (err: any) {
      return rejectWithValue(err?.response?.data ?? err.message ?? "Upload failed");
    }
  }
);

// get product by id

export const getProductById = createAsyncThunk<
  ProductResponse,
  string | number
>(
  "products/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await productApi.getById(Number(id));
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ?? "Failed to fetch product"
      );
    }
  }
);

// recomended

export const getRecommendedProducts = createAsyncThunk<
  ProductResponse[],
  number | undefined
>(
  "products/getRecommended",
  async (limit = 8, { rejectWithValue }) => {
    try {
      const res = await productApi.getRecommended();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ?? "Failed to fetch recommended products"
      );
    }
  }
);


export const productSlice = createSlice({
  name: "products",
  initialState,
    reducers: {
    clearUploadedUrls: (state) => {
      state.uploadedUrls = [];
    },
    removeUploadedUrl(state, action: PayloadAction<string>) {
      state.uploadedUrls = state.uploadedUrls.filter((u) => u !== action.payload);
    },
  },
  extraReducers: (builder) => {

    builder
    //  getAll
    .addCase(getAllProducts.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    })
    .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<Record<string, ProductResponse[]>>) => {
        state.loading = false;
        state.products = action.payload;
      })
    .addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    // get product by id

    .addCase(getProductById.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    })
    .addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
    })
    .addCase(getProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Create
    .addCase(createProduct.pending, (state) => {
      state.saving = true;
      state.error = undefined;
    })
    .addCase(createProduct.fulfilled, (state) => {
      state.saving = false;
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.saving = false;
      state.error = action.payload as string;
    })
// Upload Image
      .addCase(uploadImages.pending, (state) => {
        state.uploading = true;
        state.error = undefined;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.uploading = false;
        state.uploadedUrls = [...state.uploadedUrls, ...action.payload];
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload as string;
      })

      // get recommended products
      .addCase(getRecommendedProducts.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getRecommendedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.recommended = action.payload;
      })
      .addCase(getRecommendedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
},
});

export const { clearUploadedUrls,removeUploadedUrl } = productSlice.actions;
export default productSlice.reducer;
