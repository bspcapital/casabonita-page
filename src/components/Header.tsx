"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from 'next/image';
import { scrollToElementWithSpeed } from "@/utils/scrollTo";
import { useRouter } from 'next/router';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const onHome = router.pathname === "/";

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-sm bg-tealfont/10 z-50">
      <div className="flex items-center justify-between p-4">
        {/* 1. Logo on the left */}
        <Link href="/" className="block">
          <Image
            src="/footer-logo.png"
            alt="Casa Bonita Logo"
            width={60} // Logo width
            height={60}
          />
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="#home" className="hover:text-gray-200 text-marcellus text-lg text-gray-600" scroll={false} onClick={(e) => { e.preventDefault(); scrollToElementWithSpeed('home', 1000);}}>Home</Link>
          <Link href="#about" className="hover:text-gray-200 text-marcellus text-gray-600 text-lg" scroll={false} onClick={(e) => { e.preventDefault(); scrollToElementWithSpeed('about', 1000);}}>About</Link>
          <Link href="#discover" className="hover:text-gray-200 text-marcellus text-gray-600 text-lg" scroll={false} onClick={(e) => { e.preventDefault(); scrollToElementWithSpeed('discover', 1000);}}>Suites</Link>
          <Link
            href={onHome ? "#gallery" : "/#gallery"}
            scroll={false}
            className="hover:text-gray-200 text-marcellus text-gray-600 text-lg"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollToElementWithSpeed("gallery", 1000);
              }
              // If not on home, just let Link do its thing
            }}
          >
            Gallery
          </Link>
          <Link href="#contact" className="hover:text-gray-200 text-marcellus text-gray-600 text-lg" scroll={false} onClick={(e) => { e.preventDefault(); scrollToElementWithSpeed('contact', 1000);}}>Contact</Link>
        </nav>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        {/* 3. Spacer Div */}
        {/* Use arbitrary width matching the logo's width */}
        {/* This balances the logo, forcing the nav into the center due to justify-between */}
        <div className="w-[60px]" aria-hidden="true"></div> {/* Invisible spacer */}

        {isOpen && (
          <motion.div
            className="absolute top-full left-0 w-full bg-white shadow-none flex flex-col p-4 md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="#home" className="py-2" scroll={false} onClick={(e) => { e.preventDefault(); scrollToElementWithSpeed('home', 1000);}}>Home</Link>
            <Link href="#about" className="py-2" scroll={false} onClick={(e) => { e.preventDefault(); scrollToElementWithSpeed('about', 1000);}}>About</Link>
            <Link href="#discover" className="py-2" scroll={false} onClick={(e) => { e.preventDefault(); scrollToElementWithSpeed('discover', 1000);}}>Suites</Link>
            <Link href="#gallery" className="py-2" scroll={false} onClick={(e) => { e.preventDefault(); scrollToElementWithSpeed('gallery', 1000);}}>Gallery</Link>
            <Link href="#contact" className="py-2" scroll={false} onClick={(e) => { e.preventDefault(); scrollToElementWithSpeed('contact', 1000);}}>Contact</Link>
          </motion.div>
        )}
      </div>
    </header>
  );
}
