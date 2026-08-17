import { STORAGE_KEYS } from "@/constants/storage.constants";

export function clearAuthStorage() {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.PERMISSIONS);
}

export function hasAuthToken() {
  return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}
