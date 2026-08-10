import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import Player from "../components/Player";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap'
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: 'swap'
});

export const metadata: Metadata = {
  title: "SurSangeet — Studio AI Music Deck",
  description: "Tactile ML vector audio deck streaming Kaggle-driven YouTube tracks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${outfit.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-[#090a0f] text-slate-100 antialiased selection:bg-purple-500 selection:text-white" suppressHydrationWarning>
        <Providers>
          {children}
          <Player />
        </Providers>
      </body>
    </html>
  );
}
