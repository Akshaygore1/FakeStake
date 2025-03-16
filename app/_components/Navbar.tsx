"use client";

import { useCommonStore } from "@/app/_store/commonStore";
import { Coins } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const { balance } = useCommonStore();
  return (
    <nav className="backdrop-blur-md bg-black/30 ">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-[#00ff62]">Fake</span>
            <Image
              src="/assets/stake-logo.svg"
              alt="Logo"
              width={96}
              height={24}
              className="h-6 w-auto"
              priority
            />
          </Link>

          <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700">
            <span className="text-lg font-medium">
              {balance?.toFixed(2) || "0.00"}
            </span>
            <Coins className="w-5 h-5 text-[#00ff62]" />
          </div>
        </div>
      </div>
    </nav>
  );
}
