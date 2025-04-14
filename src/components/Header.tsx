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
        <div className="w-[60px] flex-shrink-0">
          <Link href="/" className="block">
            <Image
              src="/footer-logo.png"
              alt="Casa Bonita Logo"
              width={60}
              height={60}
            />
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 space-x-6 justify-center">
          <Link
            href={onHome ? "#home" : "/#home"}
            scroll={false}
            className="hover:text-gray-200 text-marcellus text-gray-600 text-lg"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollToElementWithSpeed("home", 1000);
              }
            }}
          >
            Home
          </Link>
          <Link
            href={onHome ? "#about" : "/#about"}
            scroll={false}
            className="hover:text-gray-200 text-marcellus text-gray-600 text-lg"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollToElementWithSpeed("about", 1000);
              }
            }}
          >
            About
          </Link>
          <Link
            href={onHome ? "#discover" : "/#discover"}
            scroll={false}
            className="hover:text-gray-200 text-marcellus text-gray-600 text-lg"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollToElementWithSpeed("discover", 1000);
              }
            }}
          >
            Suites
          </Link>
          <Link
            href={onHome ? "#gallery" : "/#gallery"}
            scroll={false}
            className="hover:text-gray-200 text-marcellus text-gray-600 text-lg"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollToElementWithSpeed("gallery", 1000);
              }
            }}
          >
            Gallery
          </Link>
          <Link
            href={onHome ? "#contact" : "/#contact"}
            scroll={false}
            className="hover:text-gray-200 text-marcellus text-gray-600 text-lg"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollToElementWithSpeed("contact", 1000);
              }
            }}
          >
            Contact
          </Link>
        </nav>
        {/*
        <div className="ml-auto flex items-center space-x-2 text-sm">
            <button
              onClick={() => router.push(router.asPath, router.asPath, { locale: "en" })}
              className={`px-2 py-1 rounded ${router.locale === "en" ? "bg-gray-200 font-semibold" : ""}`}
            >
              EN
            </button>
            <button
              onClick={() => router.push(router.asPath, router.asPath, { locale: "es" })}
              className={`px-2 py-1 rounded ${router.locale === "es" ? "bg-gray-200 font-semibold" : ""}`}
            >
              ES
            </button>
          </div>
        */}

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
            <Link
            href={onHome ? "#home" : "/#home"}
            scroll={false}
            className="py-2"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollToElementWithSpeed("home", 1000);
              }
              setIsOpen(false);
            }}
          >
            Home
          </Link>
          <Link
            href={onHome ? "#about" : "/#about"}
            scroll={false}
            className="py-2"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollToElementWithSpeed("about", 1000);
              }
              setIsOpen(false);
            }}
          >
            About
          </Link>
          <Link
            href={onHome ? "#discover" : "/#discover"}
            scroll={false}
            className="py-2"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollToElementWithSpeed("discover", 1000);
              }
              setIsOpen(false);
            }}
          >
            Suites
          </Link>
          <Link
            href={onHome ? "#gallery" : "/#gallery"}
            scroll={false}
            className="py-2"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollToElementWithSpeed("gallery", 1000);
              }
              setIsOpen(false);
            }}
          >
            Gallery
          </Link>
          <Link
            href={onHome ? "#contact" : "/#contact"}
            scroll={false}
            className="py-2"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollToElementWithSpeed("contact", 1000);
              }
              setIsOpen(false);
            }}
          >
            Contact
          </Link>
          </motion.div>
          
        )}
      </div>
    </header>
  );
}
