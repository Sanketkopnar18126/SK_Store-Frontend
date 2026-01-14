import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderApi } from "../../API/Order_API/orderApi";
import type { CheckoutOrderDto, CheckoutResponseDto } from "../../Components/AdminLayout/ProductForm/types";

interface OrderState {
  loading: boolean;
  currentOrder?: any;
  error?: string;
}

const initialState: OrderState = {
  loading: false,
};

// ✅ THUNK
export const checkoutOrder = createAsyncThunk<
  CheckoutResponseDto,
  CheckoutOrderDto
>(
  "order/checkout",
  async (payload, { rejectWithValue, getState }) => {
    try {
      // const state: any = getState();
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEyODhkMmZkLTExMjItNGE2ZC04NzFjLWI4MjU3YzRlODYxZCIsInVzZXJJZCI6IjEyODhkMmZkLTExMjItNGE2ZC04NzFjLWI4MjU3YzRlODYxZCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InNhbmtldGtvcG5hcjEwNTBAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJTYW5rZXQgS29wbmFyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQ3VzdG9tZXIiLCJleHAiOjE3Njc1ODk4MzEsImlzcyI6Ik15U3RvcmVBUEkiLCJhdWQiOiJNeVN0b3JlQ2xpZW50In0.ykRwgE_DBFLxt5hBmMYE1aZw-dm9s_U_OrK1vQ14EOw"; 
      const res = await orderApi.checkout(payload, token);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? "Checkout failed");
    }
  }
);




// ✅ SLICE
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkoutOrder.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(checkoutOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(checkoutOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
