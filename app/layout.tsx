import type { Metadata, Viewport } from "next";
import { Figtree, Instrument_Serif, Inter, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import Script from "next/script";
import { Toaster } from "sonner";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Fake Stake - Play Casino Games Free | Practice Mines, Plinko, Dice, Roulette & More",
    template: "%s | Fake Stake - Free Casino Games",
  },
  description:
    "Play free casino games online! Experience Mines, Plinko, Dice, Limbo, Roulette, Blackjack & Flip games with virtual currency. No real money required - perfect for practice and entertainment. 100% risk-free gaming experience.",
  keywords: [
    "fake stake",
    "free casino games",
    "online casino games free",
    "practice casino games",
    "mines game online",
    "plinko game free",
    "dice game casino",
    "limbo game",
    "roulette game free",
    "blackjack free",
    "flip game casino",
    "virtual currency casino",
    "casino simulator",
    "gambling practice",
    "stake clone",
    "no deposit casino games",
    "demo casino games",
    "risk-free gaming",
    "play casino no money",
    "free betting games",
  ],
  authors: [{ name: "Fake Stake Team" }],
  creator: "Fake Stake",
  publisher: "Fake Stake",
  applicationName: "Fake Stake",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://fakestake.fun"),
  alternates: {
    canonical: "https://fakestake.fun",
  },
  category: "games",
  openGraph: {
    title:
      "Fake Stake - Play Free Casino Games Online | Mines, Plinko, Roulette & More",
    description:
      "Play casino games with virtual currency - 100% free! Features Mines, Plinko, Dice, Limbo, Roulette, Blackjack & Flip. Perfect for practice and entertainment without financial risk.",
    type: "website",
    locale: "en_US",
    url: "https://fakestake.fun",
    siteName: "Fake Stake",
    images: [
      {
        url: "https://fakestake.fun/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Fake Stake - Free Online Casino Games - Play Mines, Plinko, Roulette, Blackjack, Dice & More",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fake Stake - Free Casino Games | Play Online Now",
    description:
      "🎰 Play free casino games: Mines, Plinko, Dice, Limbo, Roulette, Blackjack & Flip! 100% risk-free with virtual currency. No real money needed!",
    images: ["https://fakestake.fun/opengraph.png"],
    creator: "@fakestake",
    site: "@fakestake",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable} ${instrumentSerif.variable} ${caveat.variable}`}
      >
        <style>{`
          :root {
            --font-inter: ${inter.variable};
            --font-instrument-serif: ${instrumentSerif.variable};
            --font-figtree: ${figtree.variable};
            --font-caveat: ${caveat.variable};
          }
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <Navbar />
        {children}
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
