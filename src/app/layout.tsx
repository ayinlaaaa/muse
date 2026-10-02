import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/geist";
import "@fontsource/instrument-serif/400.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { AuthProvider } from "@/hooks/use-auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "MUSE | AI Music Companion",
  description: "Your music, understood. Discover music, build playlists, and explore your taste through conversation.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/favicon-180.png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#0B0B0C",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-primary antialiased font-sans">
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
