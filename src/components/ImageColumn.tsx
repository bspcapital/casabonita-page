// src/components/ImageColumn.tsx
"use client"
{/* Image Column (takes half width on medium screens+) */}
const ImageColumn = () => {
  return (
    <div className="md:w-1/2 w-full mt-10 md:mt-0">
      {/* Relative container for positioning the image and its background */}
      <div className="relative">
        {/* The Orange Background Shape */}
        {/* Positioned absolutely, slightly larger and offset */}
        <div 
          className="absolute inset-0 bg-[#EB8324] transform -translate-x-3 -translate-y-3 md:-translate-x-4 md:translate-y-4"
          style={{ zIndex: 1 }} // Ensure it's behind the image
        />
        {/* The Image Itself */}
        <img
          src="/about-us.jpg" // <-- *** REPLACE WITH YOUR IMAGE PATH ***
          alt="Comfortable suite interior at Casa Bonita"
          className="relative w-full h-auto shadow-lg" // Added shadow
          style={{ zIndex: 2 }} // Ensure image is on top of the orange background
        />
      </div>
    </div>
  );
};

export default ImageColumn;
