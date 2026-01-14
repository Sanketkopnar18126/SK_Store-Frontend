import {
  createAsyncThunk,
  createSlice,
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
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

/* ---------------- THUNKS ---------------- */

export const loginUser = createAsyncThunk<AuthResponseDto, LoginPayload>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.login(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data ?? "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk<AuthResponseDto, RegisterPayload>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.register(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data ?? "Register failed");
    }
  }
);

export const refreshToken = createAsyncThunk<AuthResponseDto>(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.refresh();
      return res.data;
    } catch {
      return rejectWithValue("Refresh failed");
    }
  }
);

export const logoutUser = createAsyncThunk<void>(
  "auth/logout",
  async () => {
    await authApi.logout();
  }
);

/* ---------------- SLICE ---------------- */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },

    hydrateAuthState(state) {
      const accessToken = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");

      if (accessToken && user) {
        state.accessToken = accessToken;
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;

        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;

        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })

      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;

        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })

      .addCase(logoutUser.fulfilled, (state) => {
        authSlice.caseReducers.clearAuthState(state);
      });
  },
});

export const { clearAuthState, hydrateAuthState } = authSlice.actions;
export default authSlice.reducer;
