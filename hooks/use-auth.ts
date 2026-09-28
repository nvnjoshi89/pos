"use client";

import { STORAGE_KEYS } from "@/constants/storage.constants";
import { clearAuthStorage, hasAuthToken } from "@/helpers/auth.helper";
import { logout, setCredentials } from "@/store/authSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export function useAuth() {
  const dispatch = useDispatch();
  const hasInitialized = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initAuth = () => {
      try {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        const storedUserRaw = localStorage.getItem(STORAGE_KEYS.USER);
        const PermissionRaw = localStorage.getItem(STORAGE_KEYS.PERMISSIONS);
        if (!token || !storedUserRaw) {
          dispatch(logout());
          clearAuthStorage();
          setIsReady(true);
          return;
        }
        const storedUser = JSON.parse(storedUserRaw);
        const permissions = PermissionRaw ? JSON.parse(PermissionRaw) : [];
        const currentUser = {
          ...storedUser,
          permissions,
        };
        dispatch(
          setCredentials({
            user: currentUser,
            token,
          }),
        );
      } catch (error) {
        console.error("Auth initialization error:", error);
        dispatch(logout());
        clearAuthStorage();
      } finally {
        setIsReady(true);
      }
    };
    initAuth();
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    clearAuthStorage();
  }, [dispatch]);

  const isLoggedIn = useCallback(() => {
    return hasAuthToken();
  }, []);

  return {
    handleLogout,
    isLoggedIn,
    isReady,
  };
}
