"use client";
import { useCommonStore } from "@/app/_store/commonStore";
import { Coins } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Navbar() {
  const { balance } = useCommonStore();
  return (
    <div className="w-full p-4 flex justify-between items-center bg-gray-800 text-white">
      <Link href="/">
        <Image
          src="/assets/logo-no-background.svg"
          alt="Logo"
          width={128}
          height={32}
          className="w-32"
        />
      </Link>
      <div className="flex items-center font-semibold">
        <span className="text-lg">Balance: {balance.toFixed(2)}</span>
        <Coins className="w-5 h-6 ml-1" />
      </div>
    </div>
  );
}
