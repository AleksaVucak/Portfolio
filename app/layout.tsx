// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Aleksa Vucak · Portfolio",
  description: "Modern AI & software engineering portfolio of Aleksa Vucak.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {/* Vercel analytics & performance */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}