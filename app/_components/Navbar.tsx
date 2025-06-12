/* eslint-disable @next/next/no-img-element */
"use client";

import { useCommonStore } from "@/app/_store/commonStore";
import { Button } from "@/components/ui/button";
import { Coffee, Coins, Minus, Plus } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { balance, clearCommonState, setBalance } = useCommonStore();
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

          <div className="flex items-center">
            <Button
              onClick={() => {
                setBalance(balance + 10);
              }}
              className="bg-white/5 rounded-l-xl rounded-r-none backdrop-blur-sm px-4 py-2 border border-white/10 text-white"
            >
              <Plus size={16} />
            </Button>
            <div className="flex h-9 text-sm items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 border border-white/10 text-white">
              <Coins size={16} className=" text-success" />
              <span>{balance?.toFixed(2) || "0.00"}</span>
            </div>
            <Button
              onClick={() => {
                setBalance(Math.max(0, balance - 10));
              }}
              className="bg-white/5 rounded-l-none rounded-r-xl backdrop-blur-sm px-4 py-2 border border-white/10 text-white"
            >
              <Minus size={16} />
            </Button>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="https://www.buymeacoffee.com/akshaygore"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="text-white">
                <Coffee size={16} />
                <span className="hidden sm:inline">Buy Me Coffee</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
