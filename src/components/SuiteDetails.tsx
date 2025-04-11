// components/SuiteDetails.tsx
import React from 'react';
import Link from 'next/link';

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
         <Link href={suite.bookLink} legacyBehavior>
            <a className="w-full sm:w-auto flex-grow sm:flex-grow-0 text-center bg-blue-600 text-white px-6 py-2.5 rounded-md hover:bg-blue-700 transition duration-200 font-medium">
                Book Now
            </a>
        </Link>
        <button
            onClick={suite.contactAction}
            disabled={!suite.contactAction} // Disable if no action provided
            className="w-full sm:w-auto flex-grow sm:flex-grow-0 text-center bg-white text-blue-600 border border-blue-600 px-6 py-2.5 rounded-md hover:bg-blue-50 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1.5 relative -top-px" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            Contact Us
        </button>
      </div>
    </div>
  );
};

export default SuiteDetails;