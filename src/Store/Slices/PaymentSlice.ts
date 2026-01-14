import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderApi } from "../../API/Order_API/orderApi";

interface VerifyPaymentDto {
  orderId: string;
  paymentId: string;
  signature: string;
}

interface PaymentState {
  verifying: boolean;
  verified: boolean;
  error?: string;
}

const initialState: PaymentState = {
  verifying: false,
  verified: false,
};

export const verifyPayment = createAsyncThunk<
  boolean,
  VerifyPaymentDto
>("payment/verify", async (payload, { rejectWithValue }) => {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEyODhkMmZkLTExMjItNGE2ZC04NzFjLWI4MjU3YzRlODYxZCIsInVzZXJJZCI6IjEyODhkMmZkLTExMjItNGE2ZC04NzFjLWI4MjU3YzRlODYxZCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InNhbmtldGtvcG5hcjEwNTBAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJTYW5rZXQgS29wbmFyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQ3VzdG9tZXIiLCJleHAiOjE3Njc1ODk4MzEsImlzcyI6Ik15U3RvcmVBUEkiLCJhdWQiOiJNeVN0b3JlQ2xpZW50In0.ykRwgE_DBFLxt5hBmMYE1aZw-dm9s_U_OrK1vQ14EOw";
    await orderApi.verify(payload, token);
    return true;
  } catch (err: any) {
    return rejectWithValue("Payment verification failed");
  }
});

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPayment(state) {
      state.verifying = false;
      state.verified = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyPayment.pending, (state) => {
        state.verifying = true;
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.verifying = false;
        state.verified = true;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.verifying = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
