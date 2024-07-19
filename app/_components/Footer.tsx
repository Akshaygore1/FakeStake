"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";

export default function Footer() {
  const handleLogoClick = () => {
    const targetSection: HTMLElement | null = document.getElementById("Top".toLowerCase());
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full p-8 flex flex-col justify-center items-center bg-gray-800 text-white backdrop-blur-lg">
      <Image
        src="/assets/logo-no-background.svg"
        alt="Logo"
        className="w-52 mb-4 hover:cursor-pointer"
        width={208}
        height={52}
        onClick={handleLogoClick}
      />
      <div className="text-center w-[80%] sm:w-[30%] mb-4">
        <p className="text-md sm:text-lg font-semibold">Join Us in Building Something Great!</p>
        <p className="text-xs sm:text-sm text-gray-500">
          Whether you&apos;re a seasoned developer or just starting out, your contributions can make a big impact. Help us improve and grow by contributing to this open source project on GitHub.
        </p>
      </div>
      <a className="flex justify-center items-center mb-4 text-gray-500 hover:text-white" href="https://github.com/Akshaygore1/FakeStake" target="_blank" rel="noopener noreferrer">
        <Github className="mr-2" /> Become a Contributor
      </a>  
      Made with ❤
    </div>
  );
}
