import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zoology Lab Specimen Catalog",
  description:
    "A catalog of lab specimens, each with its own page — scan a specimen's QR label to jump straight to it.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
