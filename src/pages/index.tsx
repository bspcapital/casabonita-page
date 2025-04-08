import Gallery from '@/components/Gallery';
import ContactForm from '@/components/ContactForm';
import About from '@/components/About';
import Hero from '@/components/Hero';
import Inner from '@/components/Inner';
import DiscoverSuites from "@/components/DiscoverSuites";
import WhyChooseUs from "@/components/WhyChooseUs";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "auto" }); // or "smooth"
        }, 10); // Match this to your tan overlay exit time
      }
    }
  }, []);
  
  return (
    <Inner backgroundColor={"ffffff"}>
    <div>
        <main className="relative w-full flex flex-col items-center justify-center text-white bg-black">
          {/* Hero Section */}
          <Hero id="home"/>

          {/* About Section */}
          <About id="about"/>

          {/* Discover Our Suites Section */}
          <DiscoverSuites id="discover"/>

          {/* Why Choose Us Section */}
          <WhyChooseUs />

          {/* Gallery Section */}
          <Gallery id="gallery"/>

          {/* Contact Us */}
          <ContactForm id="contact"/>
        </main>
    </div>
    </Inner>
  );
}
