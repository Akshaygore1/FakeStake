"use client";
import React from "react";
import Link from "next/link";
import { Coffee, Github, Twitter } from "lucide-react";

export default function Footer() {
  const handleLogoClick = () => {
    const targetSection: HTMLElement | null = document.getElementById(
      "Top".toLowerCase()
    );
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full py-12 px-6 bg-black/30 backdrop-blur-lg border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">About FakeStake</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            An open-source project dedicated to providing a safe and educational
            platform for learning about crypto gambling mechanics without real
            financial risk.
          </p>
        </div>
        <div></div>
        {/* Community Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Join Our Community</h3>
          <p className="text-gray-400 text-sm mb-4">
            Connect with us and contribute to make FakeStake even better!
          </p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/Akshaygore1/FakeStake"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.buymeacoffee.com/akshaygore"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 flex flex-row gap-2 border border-success hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              <Coffee className="w-6 h-6" />
              <span>Buy Me Cofee</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center pt-6">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} FakeStake. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
