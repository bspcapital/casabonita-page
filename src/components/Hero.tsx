"use client";
import { motion } from "framer-motion";

type Props = React.HTMLAttributes<HTMLDivElement>;
const Hero = ({ id }: Props) => {

  return (
    <section id={id} className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="absolute inset-0 bg-[url('/home-bg.jpg')] bg-cover bg-center opacity-70" />
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <h2 className="text-3xl text-marcellus italic">IDEAL FOR FAMILIES AND COUPLES ALIKE, PERFECT FOR MONTHLY STAYS</h2>
          <h1 className="text-8xl text-marcellus">Casa Bonita</h1>
          <p className="text-4xl mt-4 text-marcellus text-[#8CEBFF]">Your Haven of Comfort in Rincon de Guayabitos</p>
          <p className="text-xl mt-4 text-inter">Just 750 metres from the beach</p>
          <a href="/booking" className="mt-6 inline-block bg-blue-500 px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition">
            Book Now
          </a>
        </motion.div>
      </section>
  );
}
export default Hero;