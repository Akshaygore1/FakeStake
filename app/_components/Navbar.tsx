/* eslint-disable @next/next/no-img-element */
"use client";

import { useCommonStore } from "@/app/_store/commonStore";
import { CircleDollarSign, RotateCcw, Home, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { url } from "@/app/_lib/assets";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { balance, clearCommonState } = useCommonStore();
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/games", label: "Games", icon: Gamepad2 },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-lg border-r border-gray-800 text-white z-30">
      <div className="flex flex-col h-full p-6">
        {/* Logo */}
        <div className="mb-8">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <img
              src={`${url}/chatgpt.svg`}
              alt="FakeStake Logo"
              width={96}
              height={24}
              className="h-6 w-auto"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-green-600 text-black"
                        : "hover:bg-gray-800 text-gray-300 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Balance and Reset */}
        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <CircleDollarSign className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Balance</span>
            </div>
            <span className="text-sm font-bold">
              {balance?.toFixed(2) || "0.00"}
            </span>
          </div>
          {balance <= 1 && (
            <button
              onClick={() => {
                clearCommonState();
              }}
              className="w-full flex items-center justify-center space-x-2 bg-green-600 text-black px-4 py-3 rounded-lg hover:bg-green-500 transition-colors"
              type="button"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="font-medium">Reset Credit</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
