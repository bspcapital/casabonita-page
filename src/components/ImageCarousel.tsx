// components/ImageCarousel.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCarouselProps {
  images: string[];
  altTextBase: string;
}

// Define swipe power threshold
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images = [], altTextBase }) => {
  // Use state tuple: [page, direction]
  // page = current image index
  // direction = determines slide direction (1 for next, -1 for prev)
  const [[page, direction], setPage] = useState([0, 0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // derived index from page state (handle wrapping)
   const imageIndex = page % images.length < 0 ? images.length + (page % images.length) : page % images.length;


  // Reset index if images array changes (e.g., switching suites)
  useEffect(() => {
    setPage([0, 0]);
    setSelectedImageIndex(null); // Also reset selected image
  }, [images]);

  if (!images || images.length === 0) {
    // ... No changes needed here ...
    return (
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center text-gray-500 p-6">
        <div className="relative">
          <span className="relative z-20">No Image Available</span>
        </div>
      </div>
    );
  }

  // --- Handler Modifications ---
  const paginate = (newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  };

  const goToIndex = (newIndex: number) => {
     // Calculate direction based on current index
    const currentIndex = page % images.length < 0 ? images.length + (page % images.length) : page % images.length;
    const newDirection = newIndex > currentIndex ? 1 : -1;

     // We need to set the page based on the desired newIndex,
     // potentially adjusting for multiple wraps if needed, though simple set is often fine
     // For simplicity here, let's assume we aren't jumping many slides at once.
     // A more robust solution might involve calculating the "closest" page number.
     // Let's try directly calculating the page target needed:
     let targetPage = page - (page % images.length) + newIndex;
      // Adjust if wrap-around needed and direction seems wrong
      if(Math.abs(page - targetPage) > images.length / 2) {
          if(newDirection === 1) targetPage -= images.length
          else targetPage += images.length
      }


    setPage([targetPage, newDirection]);
  };

  const currentImageUrl = images[imageIndex];
  const currentAltText = `${altTextBase} - Image ${imageIndex + 1}`;
  const transitionDuration = 0.4; // seconds

  // --- Handlers for Lightbox ---
  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  // --- Slide Variants ---
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%', // Start offscreen
      opacity: 0,
      scale: 0.9, // Slightly smaller when offscreen
    }),
    center: {
      zIndex: 1, // Ensure centered item is visually on top during transition
      x: 0,      // Center position
      opacity: 1,
      scale: 1, // Normal size
      transition: {
        x: { type: "spring", stiffness: 300, damping: 50 },
        opacity: { duration: transitionDuration / 2 }, // Faster opacity change
        scale: { duration: transitionDuration },
      },
    },
    exit: (direction: number) => ({
      zIndex: 0, // Exiting item goes behind
      x: direction < 0 ? '100%' : '-100%', // Exit offscreen opposite direction
      opacity: 0,
      scale: 0.9, // Slightly smaller when exiting
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: transitionDuration / 2 }, // Faster opacity change
        scale: { duration: transitionDuration },
      },
    }),
  };


  return (
    <>
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-transparent group p-4 md:p-6 touch-action-pan-y">

        {/* Inner container - pointer-events-none */}
        <div className="relative w-full h-full pointer-events-none">

          {/* The Orange Background Shape (remains static) */}
          <div
            className="absolute inset-0 bg-[#EB8324] transform -translate-x-3 -translate-y-3 md:-translate-x-4 md:translate-y-4 z-10 rounded-md"
          />

          {/* The Image Container - holds AnimatePresence */}
          {/* Now allows pointer events for drag */}
          <div className="relative w-full h-full z-20 shadow-lg overflow-hidden rounded-md pointer-events-auto">
            <AnimatePresence initial={false} custom={direction} mode="sync"> {/* USE custom={direction}, mode="sync" or remove mode */}
              <motion.div
                key={page} // IMPORTANT: Key now uses 'page' which can be > images.length or < 0
                className="absolute inset-0 cursor-pointer" // Fills the container
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x" // Enable horizontal drag
                dragConstraints={{ left: 0, right: 0 }} // Constrain drag within bounds (visual only here)
                dragElastic={1} // Allows slight elastic drag beyond constraints
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1); // Swipe right (next image)
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1); // Swipe left (previous image)
                  }
                  // Otherwise, it snaps back due to dragConstraints/dragElastic
                }}
                onClick={(e) => {
                  // Basic check to prevent lightbox opening after a drag
                  const isDrag = Math.abs(e.movementX) > 1 || Math.abs(e.movementY) > 1; // Check movement during click event phase if available
                  // A more robust way would be setting a flag during drag start/end if the simple movement check is unreliable
                  if (!isDrag && selectedImageIndex === null) { // Only open if not dragging and not already open
                     openLightbox(imageIndex)
                  }
                }}
              >
                <Image
                  src={currentImageUrl}
                  alt={currentAltText}
                  layout="fill"
                  objectFit="cover"
                  priority={imageIndex === 0 && direction === 0} // Prioritize first image on initial load
                  draggable={false} // Prevent native image dragging interference
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* End of Inner Container */}

        {/* Navigation Arrows - Smaller, Sleeker, Positioned Further Out */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              // CHANGES:
              // - Positioning: moved further out (left-1 md:left-2)
              // - Size: Smaller padding (p-1.5), smaller icon (h-4 w-4)
              // - Style: Darker background, white icon, removed shadow
              className="absolute top-1/2 left-1 md:left-2 transform -translate-y-1/2
                        bg-black bg-opacity-30 hover:bg-opacity-50                     {/* Darker background */}
                        rounded-full p-1.5                                          {/* Smaller padding */}
                        text-white                                                   {/* White icon */}
                        opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                        transition-all duration-200 focus:outline-none
                        z-30 pointer-events-auto cursor-pointer"                
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> {/* Smaller Icon */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => paginate(1)}
              // CHANGES mirrored here
              className="absolute top-1/2 right-1 md:right-2 transform -translate-y-1/2
                        bg-black bg-opacity-30 hover:bg-opacity-50
                        rounded-full p-1.5
                        text-white
                        opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                        transition-all duration-200 focus:outline-none
                        z-30 pointer-events-auto cursor-pointer"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> {/* Smaller Icon */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
          </>
        )}
        {/* Indicator Dots - use goToIndex */}
        {images.length > 1 && (
          <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30 pointer-events-auto">
              {images.map((_, index) => ( // Use actual index for mapping
                <button
                  key={index}
                  onClick={() => goToIndex(index)} // Use goToIndex
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 focus:outline-none ${
                      index === imageIndex // Compare with derived imageIndex
                      ? 'bg-white ring-1 ring-gray-500 scale-110' // Active dot style
                      : 'bg-gray-400 bg-opacity-60 hover:bg-opacity-80 hover:bg-white' // Inactive dot style
                    } pointer-events-auto cursor-pointer`}
                    aria-label={`Go to image ${index + 1}`}
                  />
              ))}
          </div>
        )}
      </div>
            {/* --- LIGHTBOX COMPONENT (conditionally rendered) --- */}
            <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Overlay Styles
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox} // Close when clicking the background
          >
            {/* Image Wrapper (prevents background click closing when clicking image) */}
            <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
               {/* Close Button */}
               <button
                 onClick={closeLightbox}
                 className="absolute -top-2 -right-2 md:top-2 md:right-2 z-50 bg-white rounded-full p-1.5 shadow-lg text-gray-800 hover:bg-gray-200 transition"
                 aria-label="Close image preview"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
               </button>

               {/* Enlarged Image */}
               <Image
                  src={images[selectedImageIndex]} // Use the selected index
                  alt={`${altTextBase} - Large Preview ${selectedImageIndex + 1}`}
                  layout="intrinsic" // Adjust layout based on your images
                  width={1200} // Provide appropriate typical width/height estimates
                  height={800} // for 'intrinsic' or 'fixed' layout
                  objectFit="contain" // Ensure the whole image is visible
                  className="rounded-md"
                />
                {/* Optional: Add image title/caption here */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageCarousel;