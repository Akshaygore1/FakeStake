import type { Metadata } from "next";
import { Figtree, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import Footer from "./_components/Footer";
import FloatingFeedback from "./_components/FloatingFeedback";

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

export const metadata: Metadata = {
  title: {
    default: "Fake Stake - Play Real Games with Fake Money",
    template: "%s | Fake Stake",
  },
  description:
    "Experience the thrill of casino games like Mines, Plinko, Dice, and Limbo without risking real money. Practice and perfect your strategies in a risk-free environment with virtual currency.",
  keywords: [
    "fake stake",
    "practice casino games",
    "free gambling games",
    "mine game",
    "plinko game",
    "dice game",
    "limbo game",
    "risk-free gaming",
    "virtual currency casino",
    "casino simulation",
    "gambling practice",
    "stake clone",
  ],
  authors: [{ name: "Fake Stake Team" }],
  creator: "Fake Stake",
  publisher: "Fake Stake",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://fakestake.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fake Stake - Risk-Free Casino Gaming Experience",
    description:
      "Play casino games with virtual currency. Perfect for learning and entertainment without financial risk. Features Mines, Plinko, Dice, and Limbo games.",
    type: "website",
    locale: "en_US",
    url: "https://fakestake.vercel.app",
    siteName: "Fake Stake",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Fake Stake - Risk-Free Casino Gaming Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fake Stake - Virtual Casino Gaming",
    description:
      "Experience risk-free casino gaming with virtual currency. Play Mines, Plinko, Dice & Limbo!",
    images: ["/opengraph.png"],
    creator: "@fakestake",
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --font-inter: ${inter.variable};
            --font-instrument-serif: ${instrumentSerif.variable};
            --font-figtree: ${figtree.variable};
          }
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
      </head>
      <body
        className={`${inter.className} ${inter.variable} ${instrumentSerif.variable}`}
      >
        <Navbar />
        {children}
        <Analytics />
        <Footer />
        <FloatingFeedback />
      </body>
    </html>
  );
}
