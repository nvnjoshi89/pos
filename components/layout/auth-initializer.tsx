"use client";
import { useAuth } from "@/hooks/use-auth";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  useAuth();
  return <>{children}</>;
}
