import { API_URL } from "@/config/env.config";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { formatUrl } from "@/helpers/url.helper";
import { STORAGE_KEYS } from "@/constants/storage.constants";
import { toast } from "sonner";
import { clearAuthStorage } from "@/helpers/auth.helper";

const BASE_URL = API_URL;
let isRedirectingToLogin = false;

export const axiosInstance = axios.create({
  baseURL: formatUrl(BASE_URL),
  timeout: 100000,
  withCredentials: false,
});

//Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

//Response interceptor
axiosInstance.interceptors.response.use(
  async (response) => {
    if (
      ["POST", "PUT", "DELETE"].includes(
        response.config.method?.toUpperCase() || "",
      )
    ) {
      toast.success("Success", {
        description: "Operation completed successfully",
      });
    }
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: number;
    };

    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (refreshToken && !originalRequest.url?.includes("refresh-token")) {
          try {
            const response = await axiosInstance.post("/auth/refresh-token", {
              refreshToken,
            });
            const { accessToken } = response.data;
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
            // Retry original request
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${accessToken}`,
            };
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            //If refresh token is invalid, logout user
            console.error("Refresh token error:", refreshError);
            clearAuthStorage();
            toast.error("Session Expired ", {
              description: "Please login to continue",
            });
            if (!isRedirectingToLogin) {
              isRedirectingToLogin = true;
              window.location.replace("login");
            }
          }
        } else {
          clearAuthStorage();
          toast.error("Authentication Error", {
            description: "Please Login to continue",
          });
          if (!isRedirectingToLogin) {
            isRedirectingToLogin = true;
            window.location.replace("/login");
          }
        }
      } else {
        const errorMessage =
          (error.response.data as { message: string })?.message ||
          "Something went wrong";
        toast.error(
          error.response.status === 422 ? "Validation Error" : "Error",
          {
            description: errorMessage,
          },
        );
      }
    } else if (error.request) {
      toast.error("Network Error", {
        description: "Please check your internet connection",
      });
    } else {
      toast.error("Error", {
        description: error.message || "An unexpected error occurred",
      });
    }
    return Promise.reject(error);
  },
);
