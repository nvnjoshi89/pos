import { API_URL } from "@/config/env.config";
import axios from "axios";
import { formatUrl } from "@/helpers/url.helper";
import { STORAGE_KEYS } from "@/constants/storage.constants";
import { headers } from "next/headers";

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
  async(response)=>{
    if(response.status === 200){
      if(["POST","PUT","DELETE"].includes(response.config.method?.toUpperCase() || "" ))
    }
  }
)