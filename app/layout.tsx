import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/providers/store-provider";
import { AuthInitializer } from "@/components/layout/auth-initializer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Dashboard",
};

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <StoreProvider>
          <AuthInitializer>{children}</AuthInitializer>
        </StoreProvider>
      </body>
    </html>
  );
}
