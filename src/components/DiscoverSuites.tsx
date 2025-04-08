"use client";
import { motion } from "framer-motion";
import Image from 'next/image';
import SuiteCarousel from '@/components/SuiteCarousel';
import Link from 'next/link';
type Props = React.HTMLAttributes<HTMLDivElement>;
const DiscoverSuites = ({ id, className, ...rest }: Props) => {

  return (
    <section id={id} className="w-full py-16 md:py-24 px-6 lg:px-12 bg-[#F1EBE3] text-black min-h-screen">
      <div className="max-w-7xl mx-auto"> {/* Wider container */}
          {/* Section Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
              {/* Left Side Titles */}
              <div className="mb-4 md:mb-0">
                  <p className="text-2xl text-[#61C7B6] text-internon uppercase tracking-wider mb-1"> {/* Teal color */}
                      Discover Our Suites
                  </p>
                  <h2 className="text-marcellus text-3xl md:text-5xl text-black">
                      Rooms. Suites. Ville
                  </h2>
              </div>

              {/* Right Side Link */}
              <Link href="/suites" className="text-3xl text-marcellus uppercase tracking-wider group text-black" scroll={false}>
                  Explore All Suites
                  <hr className="mt-1 border-black/50 group-hover:border-black transition duration-200"/>
              </Link>
          </div>
          {/* Render the Carousel Component */}
          <SuiteCarousel />
      </div>
    </section>
  )
};
export default DiscoverSuites;
