import { API_URL } from "@/config/env.config";
import axios from "axios";
import { formatUrl } from "@/helpers/url.helper";

const BASE_URL = API_URL;
let isRedirectingToLogin = false;

export const axiosInstance = axios.create({
  baseURL: formatUrl(BASE_URL),
  timeout: 100000,
  withCredentials: false,
});
