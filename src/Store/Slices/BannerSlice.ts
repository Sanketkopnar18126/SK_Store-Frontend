import { createSlice, createAsyncThunk, type PayloadAction,  } from "@reduxjs/toolkit";
import { bannerApi, type BannerResponse,  } from "../../API/Banner_API/bannerApi";

interface BannerState {
  loading: boolean;
  banners: BannerResponse[];
  error?: string;
}

const initialState: BannerState = {
  loading: false,
  banners: [],
};

// --------------------
// Thunk: Get all banners
// --------------------
export const getAllBanners = createAsyncThunk<
  BannerResponse[]
>(
  "banners/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await bannerApi.getBanners();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ??
        err.message ??
        "Failed to fetch banners"
      );
    }
  }
);

// --------------------
// Slice
// --------------------
const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBanners.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(
        getAllBanners.fulfilled,
        (state, action: PayloadAction<BannerResponse[]>) => {
          state.loading = false;
          state.banners = action.payload;
        }
      )
      .addCase(getAllBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bannerSlice.reducer;
