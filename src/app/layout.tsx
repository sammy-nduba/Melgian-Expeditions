import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/presentation/layouts/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Melgian Expeditions | Explore Beyond. Experience More.",
    template: "%s | Melgian Expeditions",
  },
  description:
    "Discover luxury safari tours, curated destinations, premium travel packages, and unforgettable wildlife experiences with Melgian Expeditions.",
  keywords: [
    "luxury safari",
    "African tours",
    "premium travel",
    "wildlife tours",
    "safari packages",
  ],
  openGraph: {
    title: "Melgian Expeditions | Explore Beyond. Experience More.",
    description:
      "Luxury safari and travel experiences designed for unforgettable adventures.",
    type: "website",
    locale: "en_US",
    siteName: "Melgian Expeditions",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
