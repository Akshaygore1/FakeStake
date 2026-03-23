"use client";
import { IconCoffee, IconMail } from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="w-full py-8 flex justify-center">
      <div className="max-w-7xl mx-auto">
        <div>
          {/* Community Section */}
          <div className="">
            <p className="text-white/70 text-sm mb-6">
              Have questions, feedback, or interested in the games we offer?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:akshaygore789@gmail.com"
                className="p-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 border border-white/10 flex items-center gap-2"
              >
                <IconMail className="w-6 h-6" />
                <span>Get in touch!</span>
              </a>
              <a
                href="https://www.buymeacoffee.com/akshaygore"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 border border-white/10 flex items-center gap-2"
              >
                <IconCoffee className="w-6 h-6" />
                <span>Buy Me Coffee</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-6">
          <p className="text-center text-white/50 text-sm">
            © {new Date().getFullYear()} FakeStake. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
