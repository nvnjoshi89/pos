import { configureStore, Middleware, PayloadAction } from "@reduxjs/toolkit";
import authReducer, { setUser } from "./authSlice";
import adminManagementReducer from "./slices/adminManagementSlice";
import { setLocalStorage } from "@/helpers/localStorage";
import { STORAGE_KEYS } from "@/constants/storage.constants";
import { baseApi } from "./api/baseApi";

const storageMiddleware: Middleware =
  () => (next) => (action: PayloadAction | unknown) => {
    switch ((action as PayloadAction).type) {
      case setUser.type:
        setLocalStorage(STORAGE_KEYS.USER, (action as PayloadAction).payload);
        break;
    }
    return next(action);
  };

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    adminManagement: adminManagementReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(storageMiddleware)
      .concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
