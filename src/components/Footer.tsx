// src/components/Footer.tsx
"use client"; // May be needed if you add interactivity later

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Use Next.js Link for internal navigation
import { scrollToElementWithSpeed } from "@/utils/scrollTo";
import { useRouter } from 'next/router';

const Footer: React.FC = () => {
  const router = useRouter();
  const onHome = router.pathname === "/";

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement newsletter submission logic
    console.log("Newsletter submitted (placeholder)");
  };

  return (
    <footer className="w-full bg-[#61C7B6] text-black pt-16 pb-8 px-6 lg:px-12"> {/* Teal background, black text, padding */}
      <div className="max-w-7xl mx-auto">
        {/* Top Section: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Column 1: Logo, Description, Social */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/footer-logo.png" // *** REPLACE with your logo path ***
                alt="Casa Bonita Logo"
                width={150} // Adjust width
                height={75} // Adjust height
                className="h-auto" // Maintain aspect ratio
              />
            </Link>
            <p className="text-internon text-base leading-relaxed">
              Established in 2024, <strong>Casa Bonita</strong> is 12-suite cozy hotel located in the peaceful residential area of Rincon de Guayabitos, Mexico. Just 750 meters from the beach, or a 5 minute walk.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/CasaBonitaInRincon" target="_blank" rel="noopener noreferrer" className="bg-[#F5A623] text-black p-2 rounded-full hover:opacity-80 transition duration-200">
                 {/* <FaFacebookF className="w-4 h-4" /> */ }
                 {/* OR use Image component if you have icon image files */}
                 <Image src="/icons/facebook.png" alt="Facebook" width={23} height={23} />
              </a>
              <a href="https://www.instagram.com/Casa.Bonita.Rincon" target="_blank" rel="noopener noreferrer" className="bg-[#F5A623] text-black p-2 rounded-full hover:opacity-80 transition duration-200">
                {/* <FaInstagram className="w-4 h-4" /> */ }
                {/* OR use Image component */}
                <Image src="/icons/instagram.png" alt="Instagram" width={23} height={23} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-2xl text-marcellus uppercase tracking-wider mb-4 border-b border-black/30 pb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
              <Link
                href={onHome ? "#home" : "/#home"}
                scroll={false}
                className="flex items-center gap-2 hover:text-gray-700 text-internon text-base"
                onClick={(e) => {
                  if (onHome) {
                    e.preventDefault();
                    scrollToElementWithSpeed("home", 1000);
                  }
                }}
              >
                Home
              </Link>
              </li>
              <li>
              <Link
                href={onHome ? "#about" : "/#about"}
                scroll={false}
                className="flex items-center gap-2 hover:text-gray-700 text-internon text-base"
                onClick={(e) => {
                  if (onHome) {
                    e.preventDefault();
                    scrollToElementWithSpeed("about", 1000);
                  }
                }}
              >
                About
              </Link>
              </li>
              <li>
              <Link
                href={onHome ? "#discover" : "/#discover"}
                scroll={false}
                className="flex items-center gap-2 hover:text-gray-700 text-internon text-base"
                onClick={(e) => {
                  if (onHome) {
                    e.preventDefault();
                    scrollToElementWithSpeed("discover", 1000);
                  }
                }}
              >
                Suites
              </Link>
              </li>
              <li>
              <Link
                href={onHome ? "#gallery" : "/#gallery"}
                scroll={false}
                className="flex items-center gap-2 hover:text-gray-700 text-internon text-base"
                onClick={(e) => {
                  if (onHome) {
                    e.preventDefault();
                    scrollToElementWithSpeed("gallery", 1000);
                  }
                }}
              >
                Gallery
              </Link>
              </li>
              <li>
              <Link
                href={onHome ? "#contact" : "/#contact"}
                scroll={false}
                className="flex items-center gap-2 hover:text-gray-700 text-internon text-base"
                onClick={(e) => {
                  if (onHome) {
                    e.preventDefault();
                    scrollToElementWithSpeed("contact", 1000);
                  }
                }}
              >
                Contact
              </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Reach Out */}
          <div className="space-y-3">
            <h3 className="text-2xl text-marcellus uppercase tracking-wider mb-4 border-b border-black/30 pb-2">Reach Out</h3>
            <div className="space-y-2 leading-relaxed text-internon text-base">
              <p>Email: Casabonitarincon@gmail.com</p>
              <p>Tel: +52-327-978-2122</p>
              <p>Whatsapp: +52-327-978-2122</p>
              <p>
                Address: Mirlo 32, Rincon de Guayabitos,
                <br />
                Nayarit, Mexico 63724
              </p>
            </div>
          </div>

          {/* Column 4: Join Our Newsletter */}
          <div className="space-y-3">
            <h3 className="text-2xl text-marcellus uppercase tracking-wider mb-4 border-b border-black/30 pb-2">Join Our Newsletter</h3>
            <p className="leading-relaxed mb-4 text-internon text-base">
              Stay updated with the latest news, exclusive offers, and valuable insights straight to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex items-center">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                type="email"
                name="newsletter-email"
                id="newsletter-email"
                required
                placeholder="Email"
                className="text-internon text-base flex-grow border border-black/50 rounded-l-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black/50 focus:border-black/50 sm:text-sm text-black" // Text black for input
              />
              <button
                type="submit"
                className="bg-[#F5A623] text-black px-4 py-1.5 rounded-r-md border border-[#F5A623] hover:opacity-80 transition duration-200 text-internon text-base font-medium" // Orange color
              >
                Send
              </button>
            </form>
          </div>

        </div> {/* End Top Section Grid */}

        {/* Bottom Section: Copyright & Credits */}
        <div className="border-t border-black/30 pt-6 flex flex-col md:flex-row justify-between items-center text-xs">
          <p className="mb-2 md:mb-0">
            © Copyright {new Date().getFullYear()} Casa Bonita All Right Reserved
          </p>
          <p>
            Design & Developed By BSP Capital {/* Or link if needed <a href="..." >DotClickLLC</a> */}
          </p>
        </div>

      </div> {/* End Max Width Container */}
    </footer>
  );
};

export default Footer;