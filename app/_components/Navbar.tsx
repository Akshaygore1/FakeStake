/* eslint-disable @next/next/no-img-element */
"use client";

import { useCommonStore } from "@/app/_store/commonStore";
import { CircleDollarSign, Coins, RotateCcw } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { url } from "../_lib/assets";

export default function Navbar() {
  const { balance, clearCommonState } = useCommonStore();
  return (
    <nav className="relative flex items-center mt-4 sm:mt-6 bg-white/5 backdrop-blur-sm w-full max-w-4xl sm:mx-6 lg:mx-auto rounded-full border border-white/10 text-white px-3 sm:px-4 lg:px-6 z-20">
      <div className="flex justify-between items-center h-10 sm:h-12 w-full gap-2 sm:gap-4">
        <Link
          href="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <img
            src={`${url}/logo.svg`}
            alt="FakeStake Logo"
            width={96}
            height={24}
            className="h-5 sm:h-6 lg:h-7 w-auto"
          />
        </Link>
        <div className="flex justify-center items-center gap-2 sm:gap-3 font-geist-mono text-white">
          <div className="flex items-center gap-1 sm:gap-2">
            {balance <= 1 && (
              <button
                onClick={() => {
                  clearCommonState();
                }}
                className="relative flex items-center gap-1 sm:gap-2 border border-success rounded-full px-2 sm:px-3 py-1
                 hover:bg-success/10 transition-colors cursor-pointer z-10"
                type="button"
              >
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap hidden sm:inline">
                  Reset Credit
                </span>
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap sm:hidden">
                  Reset
                </span>
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            )}
          </div>
          <div
            className="flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform"
            title="Current Balance"
          >
            <CircleDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
            <span className="text-sm sm:text-base font-medium">
              {balance?.toFixed(2) || "0.00"}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
