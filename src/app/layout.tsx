import type { Metadata } from "next";
import {
  Geist,
  IBM_Plex_Mono,
  Inter,
  Playfair_Display,
  Plus_Jakarta_Sans,
} from "next/font/google";

import "./globals.css";

import { AudioProvider } from "@/context/AudioContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-plex-mono",
  display: "swap",
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
      className={`${inter.variable} ${geist.variable} ${plexMono.variable} ${playfair.variable} ${jakarta.variable} h-full antialiased [scrollbar-width:none]`}
    >
      <body className="relative min-h-screen overflow-x-hidden bg-[#f5f5f3] font-sans text-slate-900">
        <AudioProvider>
          <main>{children}</main>
          <div className="pointer-events-none fixed inset-x-80 -bottom-7.5 z-0 h-24 rounded-full bg-white/65 blur-xl" />
        </AudioProvider>
      </body>
    </html>
  );
}
