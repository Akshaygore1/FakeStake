"use client";
import React from "react";
import Link from "next/link";
import { Github } from "lucide-react";

export default function Footer() {

    const handleLogoClick = () => {
        const targetSection: HTMLElement | null = document.getElementById("Top".toLowerCase());
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="w-full p-8 flex flex-col justify-center items-center bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-md text-white">
            <img src="/assets/logo-no-background.svg" className="w-52 mb-4 hover:cursor-pointer" onClick={handleLogoClick} alt="Logo" />
            <div className="text-center w-[80%] sm:w-[30%] mb-4">
                <p className="text-md sm:text-lg font-semibold">Join Us in Building Something Great!</p>
                <p className="text-xs sm:text-sm text-gray-400">
                    Whether you're a seasoned developer or just starting out, your contributions can make a big impact. Help us improve and grow by contributing to this open-source project on GitHub.
                </p>
            </div>
            <a className="flex justify-center items-center mb-4 text-gray-500 hover:text-white" href="https://github.com/Akshaygore1/FakeStake" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2" /> Become a Contributor
            </a>  
            <p className="text-xs sm:text-sm text-gray-300">Made with ❤</p>
        </div>
    );
}
