// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Aleksa Vucak · Portfolio",
  description: "Aleksa Vucak's SWE Portfolio",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-black">
      <body className="min-h-screen bg-black text-white antialiased overscroll-y-none">
        {children}
        {/* Vercel analytics & performance */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}