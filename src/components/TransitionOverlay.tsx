"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tanColor = "bg-[#F1EBE3]";

const TransitionOverlay: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleLoad = () => {
      // Loading bar completes first, then slide out
      setTimeout(() => setIsLoading(false), 1200);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isMounted) {
    return (
      <div className={`fixed inset-0 ${tanColor} z-[9999]`} />
    );
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="overlay"
            className={`fixed inset-0 ${tanColor} z-[9999] flex items-center justify-center`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              x: "100%",
              opacity: 0,
              transition: { 
                duration: 0.9,
                ease: [0.43, 0.13, 0.23, 0.96]
              }
            }}
          >
          {/* Loading Bar */}
            <motion.div
              className="w-1/20 h-1 bg-black/70 origin-left"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: 1,
                opacity: 0.8,
                transition: {
                  duration: 1,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ 
        opacity: isLoading ? 0 : 1, 
        transition: 'opacity 0.3s ease 0.3s' // Fade in after slide starts
      }}>
        {/* Content placeholder */}
      </div>
    </>
  );
};

export default TransitionOverlay;