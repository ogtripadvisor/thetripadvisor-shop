import type { Metadata } from "next";
import "./globals.css";
import FloatingMushrooms from "@/app/components/FloatingMushrooms";
import Nav from "@/app/components/Nav";

export const metadata: Metadata = {
  title: "The TripAdvisor",
  description: "Music, merch, and the full trip — from The TripAdvisor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FloatingMushrooms />
        <Nav />
        {children}
      </body>
    </html>
  );
}