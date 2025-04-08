"use client";
import { motion } from "framer-motion";
import Image from 'next/image';

export default function Hero() {
  const whyChooseUsData = [
  {
    iconSrc: "/icons/home.png", // <-- REPLACE with actual path
    title: "Unmatched Comfort",
    description: "Our suites are designed for relaxation, featuring modern amenities and cozy furnishings that ensure a restful stay for every guest."
  },
  {
    iconSrc: "/icons/location-1.png", // <-- REPLACE with actual path
    title: "Prime Location",
    description: "Situated just minutes from the beach, Casa Bonita offers easy access to the stunning coastline and vibrant local attractions."
  },
  {
    iconSrc: "/icons/support.png", // <-- REPLACE with actual path
    title: "Personalized Service",
    description: "At Casa Bonita, hospitality is personal—expect friendly, attentive service that makes your stay effortless and memorable."
  },
  {
    iconSrc: "/icons/affordable.png", // <-- REPLACE with actual path
    title: "Affordable Rates",
    description: "We offer competitive pricing for our spacious suites, ensuring that you receive exceptional value for your stay."
  },
  {
    iconSrc: "/icons/insight-1.png", // <-- REPLACE with actual path
    title: "Local Insights",
    description: "Our knowledgeable staff is here to share insider tips and recommendations, helping you discover the best dining." // Trimmed slightly to match image line break
  },
  {
    iconSrc: "/icons/atmosphere.png", // <-- REPLACE with actual path
    title: "Family-Friendly Atmosphere",
    description: "Casa Bonita is perfect for families, offering a welcoming environment with amenities that cater to guests of all ages."
  },
  ];

  return (
    <section className="w-full py-16 md:py-24 px-6 bg-white text-black">
          <div className="max-w-6xl mx-auto text-center"> {/* Centered container */}

            {/* Section Header */}
            <p className="text-internon text-2xl text-tealfont uppercase tracking-wider mb-2"> {/* Assuming tealfont color */}
              WHY CHOOSE US ?
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-12 md:mb-16 text-marcellus">
               {/* Added responsive line break suggestion */}
              Discover Why Casa Bonita is the<br className="hidden md:block" /> Ideal Choice for Your Stay
            </h2>

            {/* Features Grid */}
            {/* 1 column on mobile, 3 columns on medium screens and up */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16 text-center">
              {whyChooseUsData.map((feature, index) => (
                // Each feature item container
                <div key={index} className="flex flex-col items-center">
                  {/* Icon - Adjust width/height as needed for your images */}
                  <div className="mb-5">
                    <Image
                      src={feature.iconSrc}
                      alt="" // Alt text can be empty if icons are purely decorative
                      width={80} // Adjust size to match your icon's visual size
                      height={80} // Adjust size to match your icon's visual size
                      className="" // Add classes if needed (e.g., rounded-full if the image isn't already)
                    />
                  </div>
                  {/* Title */}
                  <h3 className="text-2xl text-marcellus uppercase tracking-wider mb-2">
                    {feature.title}
                  </h3>
                  {/* Description */}
                  <p className="text-base text-gray-600 leading-relaxed text-internon"> {/* Added leading-relaxed */}
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
    </section>
  );
}
