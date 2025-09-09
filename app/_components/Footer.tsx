"use client";
import React from "react";
import Link from "next/link";
import { Coffee, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-6 px-6 bg-black/60 backdrop-blur-lg border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/Akshaygore1/FakeStake"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.buymeacoffee.com/akshaygore"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <Coffee className="w-5 h-5" />
            <span className="text-sm">Support</span>
          </a>
        </div>
        <div className="flex flex-col items-center md:items-end space-y-2 md:space-y-0">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} FakeStake. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            V2 FORK OF FAKESTAKE
          </p>
        </div>
      </div>
    </footer>
  );
}
