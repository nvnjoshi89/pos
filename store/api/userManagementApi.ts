import { UserResponse, Query } from "@/types";
import { baseApi } from "./baseApi";
import { apiRoutes } from "@/lib/api.routes";

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResponse[], Query>({
      query: () => ({
        url: apiRoutes.userList,
      }),
    }),
  }),
});
