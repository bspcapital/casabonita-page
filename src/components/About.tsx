"use client"
import ImageColumn from '@/components/ImageColumn';
type Props = React.HTMLAttributes<HTMLDivElement>;
const About = ({ id }: Props) => {

  return (
    <section id={id} className="w-full py-16 md:py-24 px-6 bg-gray-50 min-h-screen scroll-mt-[100px]"> {/* Added padding, adjusted bg */}
      {/* Increased max-width for better spacing in two columns */}
      <div className="max-w-6xl mx-auto">
        {/* Flex container for columns: stack on mobile, row on medium screens+ */}
        {/* Added gap for spacing between columns, items-center to vertically align */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* Text Column (takes half width on medium screens+) */}
          <div className="md:w-1/2 w-full text-center md:text-left"> {/* Center text on mobile */}
            {/* Adjusted heading styles to match example more closely */}
            <h1 className="text-internon text-2xl text-tealfont uppercase tracking-wider mb-2">
              About Us
            </h1>
            <h2 className="text-3xl md:text-[2.5rem] text-gray-900 mb-6 text-marcellus"> {/* Darker black, larger size */}
              Meet Casa Bonita in Rincon - A Hotel Committed to Your Comfort
            </h2>
            {/* Added leading-relaxed for better readability */}
            <p className="text-lg text-gray-700 leading-relaxed text-internon">
              At Casa Bonita, we believe that every guest deserves a unique and unforgettable experience.
              Nestled in the picturesque Rincon de Guayabitos, our hotel offers a tranquil escape with a warm, welcoming atmosphere.<br /><br />
              With 12 beautifully appointed suites, we cater to both individuals and families looking for a peaceful retreat just moments from the beach.
              Our commitment to quality ensures that each room is equipped with modern amenities, including fully stocked kitchens, high-speed Wi-Fi, and air conditioning.
            </p>
          </div>
          <ImageColumn />
        </div>
      </div>
    </section>
  );
};
export default About;