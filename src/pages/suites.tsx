import React, { useState, useLayoutEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

// Import the new components
import ImageCarousel from '@/components/ImageCarousel';
import SuiteDetails from '@/components/SuiteDetails';
import Inner from '@/components/Inner';

// --- Define Data Structure (can be shared or imported) ---
interface SuiteInfo {
  id: string;
  tabName: string;
  title: string;
  description: string;
  amenities: string[];
  maxOccupancy: string;
  size: string;
  images: string[]; // Array of image URLs (relative to /public)
  bookLink: string;
  contactAction?: () => void;
}

// --- Sample Suite Data (Replace with your actual details and image paths) ---
const suitesData: SuiteInfo[] = [
   {
    id: '1-bedroom-oceanview',
    tabName: '1-Bedroom Suite',
    title: '1-Bedroom Oceanview Suite',
    description: 'Our spacious 1-bedroom suites at Casa Bonita offer a comfortable retreat in Rincon de Guayabitos, perfect for families, friends, or couples. Each suite is equipped with air conditioning and high-speed Wi-Fi. The fully stocked kitchen allows for easy meal preparation, while the matrimonial-size bed ensures a restful night’s sleep. Outside, you’ll find a refreshing pool and grill area, ideal for relaxing and enjoying the outdoors.',
    amenities: [
      'Matrimonial-size Bed', 'High-speed WiFi', 'Fully-stocked Kitchen',
      'Air Conditioning', 'Fully-equipped Bathroom', 'Refreshing Pool', 'Grill Area'
    ],
    maxOccupancy: '2 guests',
    size: '650 sq ft',
    images: ['/suites/one-1.jpg', '/suites/one-2.jpg'], // CHANGE THESE
    bookLink: '/booking?suite=1bed-ocean',
    contactAction: () => alert("Contact Request Sent for 1-Bed!"),
  },
  {
    id: '2-bedroom-luxury',
    tabName: '2-Bedroom Suite',
    title: '2-Bedroom Luxury Suite',
    description:
      'Our spacious 2-bedroom suites at Casa Bonita offer an ideal setting for families, friends, or couples seeking a comfortable retreat in Rincon de Guayabitos. Each suite is thoughtfully designed to provide all the comforts of home, featuring a cozy living room where guests can relax together, air conditioning for a pleasant stay even during warm days, and high-speed Wi-Fi to keep you connected.',
    amenities: [
      'Queen-size Bed', 'Full-size Bed', 'High-speed WiFi', 'Fully-stocked Kitchen', 
      'Air conditioning', 'Fully-equipped Bathroom', 'Living Room', 'Refreshing Pool', 'Grill Area'
    ],
    maxOccupancy: '4 guests (up to 6)',
    size: '950 sq ft',
    images: ['/suites/two-1.jpg', '/suites/two-2.jpg'], // CHANGE THESE
    bookLink: '/booking?suite=2bed-luxury',
    contactAction: () => alert("Contact Request Sent for 2-Bed!"),
  },
];


// --- The Main Suites Page Component ---
const SuitesPage: React.FC = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>(suitesData[0].id);

  const selectedSuite = suitesData.find((suite) => suite.id === selectedSuiteId);

  if (!selectedSuite) {
    return <div>Error: Suite data missing or invalid ID selected.</div>; // Basic error handling
  }
  const contentVariants = {
    initial: {
      opacity: 0,
      y: 15, // Start slightly down
    },
    animate: {
      opacity: 1,
      y: 0,   // Animate to original position
      transition: {
        duration: 0.4, // Adjust duration as needed
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -15, // Exit slightly up
      transition: {
        duration: 0.3, // Adjust duration as needed
        ease: "easeIn",
      },
    },
  };

  return (
    <Inner backgroundColor={"ffffff"}>
      <div className="bg-tanski">
        <Head>
          <title>Our Comfortable Suites - Casa Bonita</title>
          <meta
            name="description"
            content="Experience the perfect blend of comfort and elegance with our accommodations."
          />
        </Head>

        <main className="container mx-auto px-4 py-12 md:py-30">
          {/* Section Title */}
          <div className="text-center mb-10 md:mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl mb-3 text-gray-800 text-marcellus">
              Our Comfortable Suites
            </h1>
            <p className="text-md md:text-xl text-gray-600 max-w-2xl mx-auto text-internon">
              Feel right at home in our simple, comfy rooms just steps from the beach.
            </p>
          </div>

          {/* Main Suite Selector Container */}
          <div className="max-w-10xl mx-auto border border-gray-200 rounded-lg shadow-xl bg-peach overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 text-marcellus">
              {suitesData.map((suite) => (
                <button
                  key={suite.id}
                  onClick={() => setSelectedSuiteId(suite.id)}
                  className={`bg-gray flex-1 py-3 px-4 text-center text-sm sm:text-base font-medium transition-colors duration-200 ${
                    selectedSuiteId === suite.id
                      ? 'border-b-2 border-tealfont text-gray-600 bg-peach'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 bg-gray-50'
                  }`}
                >
                  {suite.tabName}
                </button>
              ))}
            </div>

            {/* Content Area: Image Carousel + Details */}
            <div className="p-4 md:p-8 lg:p-10">
            <AnimatePresence mode="wait">
            <motion.div
                  key={selectedSuiteId} // <-- Unique key based on the selected suite
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10">
                  {/* Left Side: Image Carousel */}
                  <div className="w-full md:w-1/2 aspect-square md:aspect-[4/3]"> {/* Adjust aspect ratio as needed */}
                    {/* Ensure selectedSuite exists before accessing properties */}
                    {selectedSuite && (
                          <ImageCarousel
                            images={selectedSuite.images}
                            altTextBase={selectedSuite.title}
                          />
                        )}
                  </div>

                  {/* Right Side: Text Details & Buttons */}
                  <div className="w-full md:w-1/2">
                    {selectedSuite && <SuiteDetails suite={selectedSuite} />}
                  </div>
                </div>
            </motion.div>
            </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </Inner>
  );
};

export default SuitesPage;