// components/SuiteDetails.tsx
import React from 'react';
import Link from 'next/link';
import { scrollToElementWithSpeed } from "@/utils/scrollTo";
// Re-use or import the SuiteInfo interface definition
interface SuiteInfo {
  id: string;
  tabName: string;
  title: string;
  description: string;
  amenities: string[];
  maxOccupancy: string;
  size: string;
  images: string[];
  bookLink: string;
  contactAction?: () => void;
}

interface SuiteDetailsProps {
  suite: SuiteInfo;
}

const SuiteDetails: React.FC<SuiteDetailsProps> = ({ suite }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-marcellus mb-3">
        {suite.title}
      </h2>
      <p className="text-gray-600 mb-4 leading-relaxed text-internon">
        {suite.description}
      </p>

      {/* Amenities */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-1.5 text-internon text-lg">Amenities include:</h4>
        <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base text-internon">
          {suite.amenities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Occupancy & Size (pushes buttons down) */}
      <div className="text-sm sm:text-base text-gray-700 space-y-1 mb-6 mt-auto pt-4 text-internon">
        <p><span className="font-medium">Max Occupancy:</span> {suite.maxOccupancy}</p>
        <p><span className="font-medium">Size:</span> {suite.size}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 text-marcellus">
         <Link href="/#contact" className="w-full sm:w-auto flex-grow sm:flex-grow-0 text-center bg-blue-600 text-white px-6 py-2.5 rounded-md hover:bg-blue-700 transition duration-200 font-medium">
                Book Now
        </Link>
        <Link href="/#contact" className="w-full sm:w-auto flex-grow sm:flex-grow-0 text-center bg-white text-blue-600 border border-blue-600 px-6 py-2.5 rounded-md hover:bg-blue-50 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                Contact Us
        </Link>
      </div>
    </div>
  );
};

export default SuiteDetails;