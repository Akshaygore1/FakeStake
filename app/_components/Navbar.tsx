/* eslint-disable @next/next/no-img-element */
"use client";

import { useCommonStore } from "@/app/_store/commonStore";
import { Coffee, Coins } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { balance, clearCommonState } = useCommonStore();
  return (
    <nav className="top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-success to-emerald-500 bg-clip-text text-transparent">
              Fake
            </span>
            <img
              src="/assets/stake-logo.svg"
              alt="Logo"
              width={96}
              height={24}
              className="h-6 sm:h-7 w-auto"
            />
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            {balance <= 1 && (
              <button
                onClick={() => clearCommonState()}
                className="text-sm text-white/70 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
              >
                Reset Credit
              </button>
            )}

            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10 text-white">
              <Coins className="w-5 h-5 text-success" />
              <span className="text-base font-medium">
                {balance?.toFixed(2) || "0.00"}
              </span>
            </div>
            <a
              href="https://www.buymeacoffee.com/akshaygore"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-success hover:bg-success/90 transition-colors p-2.5 sm:p-3 rounded-xl inline-flex items-center justify-center"
            >
              <Coffee className="w-5 h-5 text-black" />
              <span className="hidden sm:inline text-black ml-2 font-medium">
                Buy Me Coffee
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
