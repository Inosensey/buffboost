import type { Metadata } from "next";
import { Space_Grotesk, Inter, Oxanium } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

const oxanium = Oxanium({
  variable: "--font-oxanium",
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});


export const metadata: Metadata = {
  title: "Buff Boost",
  description: "Gamified payment gateway simulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${oxanium.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
