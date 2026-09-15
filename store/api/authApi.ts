import { LoginRequest, LoginResponse } from "@/types/auth";
import { baseApi } from "./baseApi";
import { apiRoutes } from "@/lib/api.routes";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: apiRoutes.login,
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
