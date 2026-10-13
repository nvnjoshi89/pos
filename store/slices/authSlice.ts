import { STORAGE_KEYS } from "@/constants/storage.constants";
import { AuthResponse } from "@/types/authResponse";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      permissions: [],
      isReady: false,
    };
  }

  try {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const userRaw = localStorage.getItem(STORAGE_KEYS.USER);
    const permissionsRaw = localStorage.getItem(STORAGE_KEYS.PERMISSIONS);
    if (token && userRaw) {
      const user = JSON.parse(userRaw);
      const permissions = permissionsRaw ? JSON.parse(permissionsRaw) : [];
      return {
        user: { ...user, permissions },
        token,
        isAuthenticated: true,
        permissions,
        isReady: true,
      };
    }
  } catch (error) {
    console.log(error);
  }
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    permissions: [],
    isReady: true,
  };
};

interface AuthState {
  user: AuthResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  permissions: string[];
  isReady: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthResponse; token: string }>,
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.isReady = true;
    },
    setUser: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isReady = true;
    },
  },
});

export const { setCredentials, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
