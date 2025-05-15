import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import Footer from "./_components/Footer";

const inter = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fake Stake - Play Real Games with Fake Money",
  description:
    "Experience the thrill of casino games like Mines and more without risking real money. Practice and perfect your strategies in a risk-free environment.",
  keywords: [
    "fake stake",
    "practice casino games",
    "free gambling games",
    "mine game",
    "risk-free gaming",
  ],
  openGraph: {
    title: "Fake Stake - Risk-Free Casino Gaming Experience",
    description:
      "Play casino games with virtual currency. Perfect for learning and entertainment without financial risk.",
    type: "website",
    locale: "en_US",
    url: "https://fakestake.vercel.app",
    images: [
      {
        url: "/assets/stake-logo.svg",
        width: 1200,
        height: 630,
        alt: "Fake Stake Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fake Stake - Virtual Casino Gaming",
    description: "Experience risk-free casino gaming with virtual currency",
    images: ["/assets/stake-logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
