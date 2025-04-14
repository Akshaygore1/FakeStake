/* eslint-disable @next/next/no-img-element */
"use client";

import { useCommonStore } from "@/app/_store/commonStore";
import { Coffee, Coins } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { balance, clearCommonState } = useCommonStore();
  return (
    <nav className="backdrop-blur-md bg-black/30">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:p-4">
        <div className="flex justify-between items-center h-12 sm:h-16">
          <Link href="/" className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-lg sm:text-xl font-bold text-success">
              Fake
            </span>
            <img
              src="/assets/stake-logo.svg"
              alt="Logo"
              width={96}
              height={24}
              className="h-5 sm:h-6 w-auto"
            />
          </Link>
          <div className="flex gap-1 sm:gap-2">
            {balance <= 1 && (
              <div
                className="flex justify-center px-4 items-center underline cursor-pointer text-white"
                onClick={() => clearCommonState()}
              >
                Reset Credit ?
              </div>
            )}

            <div className="flex items-center gap-1 sm:gap-2 bg-gray-800/50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-700 text-white">
              <span className="text-base sm:text-lg font-medium">
                {balance?.toFixed(2) || "0.00"}
              </span>
              <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
            </div>
            <a
              href="https://www.buymeacoffee.com/akshaygore"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-success p-2 sm:p-4 rounded-full inline-flex items-center justify-center hover:bg-success/80 transition-colors"
            >
              <Coffee color="black" className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline text-black ml-2">
                Buy Me Coffee
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
