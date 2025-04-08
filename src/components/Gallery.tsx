// src/components/Gallery.tsx
"use client"; // Required for hooks and interactivity

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

// --- Data Definition ---
const galleryImageCount = 15; // Total number of gallery images
// *** IMPORTANT: Adjust the 'src' pattern if your paths/names are different ***
const galleryImages = Array.from({ length: galleryImageCount }, (_, i) => ({
  id: i + 1,
  src: `/gallery/${i + 1}.jpg`, // Assumes /public/gallery/1.jpg, /public/gallery/2.jpg, etc.
  alt: `Gallery image ${i + 1}`, // Basic alt text
}));
// --- OR ---
// const galleryImages = [ { id: 1, src: '...', alt: '...' }, ... ]; // Manual array if needed

// --- Animation Variants ---
const galleryGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    }
  }
};

const galleryItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

type Props = React.HTMLAttributes<HTMLDivElement>;

const Gallery = ({ id, className, ...rest }: Props) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  // --- Navigation Functions ---
  const goToNext = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent closing lightbox when clicking arrow
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prevIndex) =>
      prevIndex === null ? 0 : (prevIndex + 1) % galleryImages.length
    );
  };

  const goToPrevious = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent closing lightbox when clicking arrow
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prevIndex) =>
      prevIndex === null ? 0 : (prevIndex - 1 + galleryImages.length) % galleryImages.length
    );
  };
  // --- End Navigation Functions ---

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (event.key === 'Escape') {
          closeLightbox();
        } else if (event.key === 'ArrowRight') {
          // Simulate a fake event to stop propagation if needed, or just call the core logic
          goToNext(event as any); // Cast event type or create fake event if strict typing needed
        } else if (event.key === 'ArrowLeft') {
          goToPrevious(event as any);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // Add functions to dependency array if they aren't stable references (though they should be here)
  }, [selectedImageIndex]);

  return (
    <>
      {/* Gallery Section */}
      <section id={id} className="w-full py-16 md:py-24 bg-[#F1EBE3] text-black min-h-screen">
        {/* ... Rest of the section header and grid ... */}
         <div>
          {/* Section Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 max-w-7xl mx-auto">
             <div className="mb-4 md:mb-0">
               <p className="text-internon text-2xl text-tealfont uppercase tracking-wider mb-2">
                 Discover Our Gallery
               </p>
               <h2 className="text-3xl md:text-4xl lg:text-5xl text-black text-marcellus">
                 Discover Casa Bonita Through<br className="hidden md:block" /> Our Lens
               </h2>
             </div>
             <a href="/gallery" className="text-xl text-marcellus uppercase tracking-wider group text-black">
               SEE MORE
               <hr className="mt-1 border-black/50 group-hover:border-black transition duration-200"/>
             </a>
           </div>

           {/* Animated Gallery Grid */}
           <motion.div
             className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 px-2 md:px-4"
             variants={galleryGridVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.1 }}
           >
             {galleryImages.map((image, index) => (
               <motion.div
                 key={image.id}
                 className="relative overflow-hidden shadow-md aspect-3/2 cursor-pointer"
                 variants={galleryItemVariants}
                 onClick={() => openLightbox(index)}
               >
                 <Image /* ... image props ... */
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                 />
               </motion.div>
             ))}
           </motion.div>
         </div>
      </section>

      {/* LIGHTBOX IMPLEMENTATION */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/80 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeLightbox} // Close on overlay click
            />

            {/* --- Navigation Buttons --- */}
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="fixed top-1/2 left-4 md:left-8 transform -translate-y-1/2 z-51 bg-black/30 text-white rounded-full p-2 hover:bg-black/60 transition"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="fixed top-1/2 right-4 md:right-8 transform -translate-y-1/2 z-51 bg-black/30 text-white rounded-full p-2 hover:bg-black/60 transition"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {/* --- End Navigation Buttons --- */}


            {/* Image Modal Container - Adjusted padding to not overlap buttons */}
            <motion.div
              // Use key to force re-render on index change for smoother image transition if needed
              key={selectedImageIndex}
              className="fixed inset-0 z-50 flex items-center justify-center p-16 md:p-24" // Increased padding
              initial={{ opacity: 0 }} // Simpler fade for switching images
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }} // Faster transition between images
              onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
            >
                {/* Image Wrapper */}
                <div className="relative p-2 shadow-xl max-w-full max-h-full"> {/* Allow full size within padding */}
                    <Image
                        key={galleryImages[selectedImageIndex].id} // Add key here too for potential transition help
                        src={galleryImages[selectedImageIndex].src}
                        alt={galleryImages[selectedImageIndex].alt}
                        width={1200}
                        height={800}
                        style={{
                            width: 'auto',
                            height: 'auto',
                            maxWidth: '100%',
                             // Max height is now constrained by parent padding (p-16/p-24)
                            maxHeight: 'calc(100vh - 8rem)', // Example for p-16 (4rem padding top/bottom)
                            // Adjust if padding changes: calc(100vh - (2 * padding_value))
                        }}
                        className="block"
                        priority
                    />
                    {/* Close Button - Positioned relative to this inner wrapper */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-2 right-2 md:top-3 md:right-3 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/75 transition z-50" // Ensure button is above image
                        aria-label="Close image preview"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                       </svg>
                    </button>
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* END LIGHTBOX IMPLEMENTATION */}
    </>
  );
};

export default Gallery;