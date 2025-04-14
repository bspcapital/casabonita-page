// src/components/SuiteCarousel.tsx
"use client"; // Required for useState, useEffect, and Framer Motion

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence for smoother transitions
import Image from 'next/image'; // Use Next.js Image for optimization
import Link from "next/link";
import { scrollToElementWithSpeed } from "@/utils/scrollTo";

// Define Amenity structure
interface Amenity {
  imageSrc: string;
  text: string;
}

// Updated Suite structure
interface Suite {
  id: number;
  title: string; // e.g., "1-Bedroom Suites"
  priceDetails: string; // e.g., "Starting at 12,000..."
  image: string;
  amenities: Amenity[];
  bookingLink: string; // Can be specific per suite if needed
}

// Define the suite data (adjust details and image paths)
const suitesData: Suite[] = [
  {
    id: 1,
    title: "1-Bedroom Suites",
    priceDetails: "Starting at 12,000 Mexican pesos/month — $975 Canadian dollars/month",
    image: "/carousel/suite-1-bedroom.jpg", // Background image path
    amenities: [
      { imageSrc: "/icons/air-conditioner.svg", text: "Air Conditioning" },
      { imageSrc: "/icons/wifi.svg", text: "High-Speed\nWi-Fi" },
      { imageSrc: "/icons/cutlery.svg", text: "Fully Stocked Kitchen" },
      { imageSrc: "/icons/toilet.svg", text: "Fully Stocked Washroom" },
      { imageSrc: "/icons/swimmer.svg", text: "Pool And Grill Access" },
    ],
    bookingLink: "#contact",
  },
  {
    id: 2,
    title: "2-Bedroom Suites",
    priceDetails: "Starting at 17,500 Mexican pesos/month — $1250 Canadian dollars/month",
    image: "/carousel/suite-2-bedroom.jpg", // Background image path
     amenities: [
      { imageSrc: "/icons/air-conditioner.svg", text: "Air Conditioning" },
      { imageSrc: "/icons/wifi.svg", text: "High-Speed Wi-Fi" },
      { imageSrc: "/icons/cutlery.svg", text: "Fully Stocked Kitchen" },
      { imageSrc: "/icons/toilet.svg", text: "Fully Stocked Washroom" },
      { imageSrc: "/icons/swimmer.svg", text: "Pool And Grill Access" },
    ],
    bookingLink: "#contact",
  },
];
const SuiteCarousel: React.FC = () => {
  const [currentSuiteIndex, setCurrentSuiteIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSuiteIndex((prevIndex) => (prevIndex + 1) % suitesData.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const currentSuite = suitesData[currentSuiteIndex];

  // Slide transition variants (can remain similar)
  const variants = {
    enter: { // Start position (off-screen right)
      x: '100%', // Positioned 100% (of its own width) to the right
      opacity: 0
    },
    center: { // Active position (on-screen center)
      x: 0,      // Positioned at 0 (normal position)
      opacity: 1
    },
    exit: { // Exit position (off-screen left)
      zIndex: 0, // Ensure exiting slide goes behind entering one if needed
      x: '-100%', // Positioned 100% (of its own width) to the left
      opacity: 0
    }
  };

return (
        <div className="relative h-[550px] md:h-[600px] w-full overflow-hidden shadow-xl group">
            <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={currentSuite.id}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentSuite.image})` }}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "tween", duration: 0.5, ease: "easeInOut" },
                        opacity: { duration: 0.3 }
                    }}
                >
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 ease-in-out z-10"></div>

                    {/* Content Wrapper */}
                    <div className="relative h-full flex flex-col justify-between items-center text-center text-white p-6 md:p-10 z-20">
                        {/* Price Banner */}
                        <div className="text-marcellus absolute top-4 left-4 bg-black/80 text-white text-s px-3 py-1.5 rounded">
                            {currentSuite.priceDetails}
                        </div>

                        {/* Spacer */}
                        <div className="flex-grow"></div>

                        {/* Main Content Area */}
                        <div className="flex flex-col items-center w-full"> {/* Ensure content area can use width */}
                            {/* Suite Title */}
                            <h3 className="text-marcellus text-4xl md:text-5xl mb-6">
                                {currentSuite.title}
                            </h3>

                            {/* Amenities Container - SWITCHED TO FLEXBOX */}
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-8 max-w-md md:max-w-lg"> {/* Use flex, wrap, justify-center */}
                                {currentSuite.amenities.map((amenity, index) => (
                                    // Set basis for 2 cols on mobile, 3 cols on sm+
                                    <div key={index} className="flex basis-[45%] sm:basis-[30%] items-center justify-center gap-2 text-base text-internon"> {/* Use basis and justify-center for item content */}
                                        <Image
                                            src={amenity.imageSrc}
                                            alt={amenity.text}
                                            width={20}
                                            height={20}
                                            className="opacity-90 flex-shrink-0" // Prevent icon shrinking
                                        />
                                        {/* Apply whitespace-nowrap to the text span */}
                                        <span className="whitespace-nowrap">{amenity.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Book Now Button */}
                            <Link
                                href={currentSuite.bookingLink}
                                className="bg-white border border-white text-black px-10 py-2.5 rounded text-lg text-marcellus transition duration-300 ease-in-out hover:bg-[#F5A623] hover:border-transparent hover:text-white"
                                onClick={(e) => { e.preventDefault(); scrollToElementWithSpeed('contact', 1000);}}
                            >
                                Book Now
                            </Link>
                        </div>

                        {/* Spacer */}
                        <div className="flex-grow"></div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default SuiteCarousel;