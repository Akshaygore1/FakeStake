/* eslint-disable @next/next/no-img-element */
"use client";

import { useCommonStore } from "@/app/_store/commonStore";
import { CircleDollarSign, Coins } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { balance } = useCommonStore();
  return (
    <nav className="flex w-fit items-center mx-auto my-6 bg-white/5 backdrop-blur-sm min-w-[700px] rounded-full border border-white/10 text-white px-4 sm:px-6 z-10">
      <div className="flex justify-between items-center h-12 w-full gap-4">
        <Link
          href="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <img
            src="/assets/chatgpt.svg"
            alt="Logo"
            width={96}
            height={24}
            className="h-6 sm:h-7 w-auto"
          />
        </Link>
        <div className="flex justify-center items-center gap-2 font-geist-mono text-white">
          <CircleDollarSign className="w-5 h-5 text-success" />
          <span className="text-base font-medium">
            {balance?.toFixed(2) || "0.00"}
          </span>
        </div>
      </div>
    </nav>
  );
}
