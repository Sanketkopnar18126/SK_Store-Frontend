// src/Store/slices/authSlice.ts
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  AuthResponseDto,
  LoginPayload,
  RegisterPayload,
  UserResponseDto,
} from "../../Components/AdminLayout/ProductForm/types";
import { authApi } from "../../API/Auth_API/authApi";

interface AuthState {
  user: UserResponseDto | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// -------------------- Thunks --------------------

// LOGIN
export const loginUser = createAsyncThunk<AuthResponseDto, LoginPayload>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.login(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ?? err.message ?? "Login failed"
      );
    }
  }
);

// REGISTER
export const registerUser = createAsyncThunk<AuthResponseDto, RegisterPayload>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.register(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ?? err.message ?? "Registration failed"
      );
    }
  }
);

// REFRESH TOKEN
export const refreshToken = createAsyncThunk<AuthResponseDto, string>(
  "auth/refreshToken",
  async (token, { rejectWithValue }) => {
    try {
      const res = await authApi.refresh(token);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ?? err.message ?? "Token refresh failed"
      );
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk<void, string>(
  "auth/logout",
  async (refreshToken, { rejectWithValue }) => {
    try {
      await authApi.logout(refreshToken);
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ?? err.message ?? "Logout failed"
      );
    }
  }
);

// -------------------- Slice --------------------

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },

    // Hydrate state from localStorage
    hydrateAuthState(state) {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const user = localStorage.getItem("user");

      if (accessToken && refreshToken && user) {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
      }
      console.log("Ac", accessToken);
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<AuthResponseDto>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;

        // Save tokens & user in localStorage
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) ?? "Login failed";
    });

    // REGISTER
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<AuthResponseDto>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;

        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) ?? "Registration failed";
    });

    // REFRESH TOKEN
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      refreshToken.fulfilled,
      (state, action: PayloadAction<AuthResponseDto>) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;

        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    );
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) ?? "Token refresh failed";
    });

    // LOGOUT
    builder.addCase(logoutUser.fulfilled, (state) => {
      authSlice.caseReducers.clearAuthState(state);
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.error = (action.payload as string) ?? "Logout failed";
    });
  },
});

export const { clearAuthState, hydrateAuthState } = authSlice.actions;
export default authSlice.reducer;
