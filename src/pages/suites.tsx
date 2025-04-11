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
    description:
      'Our cozy one-bedroom suite is perfect for couples or solo travelers looking for a peaceful retreat. Featuring a spacious bedroom, fully equipped kitchen, and a private balcony with stunning ocean views.',
    amenities: [
      'Queen-sized bed with premium linens', 'High-speed WiFi', 'Smart TV',
      'Air conditioning', 'Modern bathroom', 'Complimentary toiletries',
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
      'Our spacious two-bedroom suite is ideal for families or groups. With two separate bedrooms, a generous living area, kitchen, and an expansive terrace overlooking the Caribbean Sea.',
    amenities: [
      'King-sized bed', 'Two twin beds', 'Two full bathrooms', 'High-speed WiFi',
      'Smart TVs', 'Air conditioning', 'Dining area (seats 6)',
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
            <div className="flex border-b border-gray-200">
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