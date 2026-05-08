import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist } from "next/font/google";
import "./globals.css";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { AudioProvider } from "@/context/AudioContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Tomilola Obasan | Portfolio",
  description: "Portfolio website for software engineer Tomilola Obasan.",
  icons: {
    icon: "/images/profile.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geist.variable} [scrollbar-width:none] ${playfair.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans text-slate-900">
        <AudioProvider>
          <div>{children}</div>
        </AudioProvider>
      </body>
    </html>
  );
}
