"use client";

import Authloading from "@/components/layout/auth-loading";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export function LoginGuard({ children }: { children: ReactNode }) {
  const { isLoggedIn, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && isLoggedIn()) {
      router.replace("/user/user-management");
    }
  }, [isLoggedIn, isReady, router]);

  if (!isReady || isLoggedIn()) {
    return <Authloading />;
  }
  return <>{children}</>;
}
