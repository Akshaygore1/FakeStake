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
    <footer className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-black/40 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* About Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-success to-emerald-500 bg-clip-text text-transparent">
              About FakeStake
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              An open-source project dedicated to providing a safe and
              educational platform for learning about crypto gambling mechanics
              without real financial risk.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6"></div>

          {/* Community Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">
              Join Our Community
            </h3>
            <p className="text-white/70 text-sm mb-6">
              Connect with us and contribute to make FakeStake even better!
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/Akshaygore1/FakeStake"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 border border-white/10"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.buymeacoffee.com/akshaygore"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 border border-white/10 flex items-center gap-2"
              >
                <Coffee className="w-6 h-6" />
                <span>Buy Me Coffee</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-center text-white/50 text-sm">
            © {new Date().getFullYear()} FakeStake. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
