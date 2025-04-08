// src/components/ContactForm.tsx
"use client";

import React from 'react';
import ImageColumn from '@/components/ImageColumn';
type Props = React.HTMLAttributes<HTMLDivElement>;

const ContactForm = ({ id }: Props) => {
  // Placeholder for form submission logic (to be added later)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement form submission (e.g., send data to an API route)
    console.log("Form submitted (placeholder)");
    // You might want to clear the form or show a success message here
  };

  return (
    <section id={id} className="w-full py-16 md:py-24 px-6 lg:px-12 bg-white text-black min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* Image Column (Left) */}
          <ImageColumn />

          {/* Form Column (Right) */}
          <div className="md:w-1/2 w-full mt-10 md:mt-0">
            {/* Header */}
            <p className="text-internon text-2xl text-tealfont uppercase tracking-wider mb-2">
              CONTACT US
            </p>
            <h2 className="text-3xl md:text-5xl text-black mb-8 text-marcellus">
              Get In Touch With Us!
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Grid for Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 text-internon">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-base font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    autoComplete="name"
                    required
                    placeholder="Full Name"
                    className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    placeholder="Email Address"
                    className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    placeholder="Phone Number"
                    className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>

                {/* Subject Dropdown */}
                <div>
                  <label htmlFor="subject" className="block text-base font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  >
                    <option value="Booking Inquiry">Booking Inquiry</option>
                    <option value="General Question">General Question</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>

                 {/* Preferred Stay Dates */}
                 <div>
                  <label htmlFor="stayDates" className="block text-base font-medium text-gray-700 mb-1">
                    Preferred Stay Dates
                  </label>
                  <input
                    type="text" // Consider using a date picker library later
                    name="stayDates"
                    id="stayDates"
                    placeholder="Preferred Stay Dates"
                    className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>

                {/* Number of Guests */}
                <div>
                  <label htmlFor="numGuests" className="block text-base font-medium text-gray-700 mb-1">
                    Number of Guests
                  </label>
                  <input
                    type="number" // Use number type
                    name="numGuests"
                    id="numGuests"
                    min="1" // Set minimum guest count
                    placeholder="Number of Guests"
                    className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div> {/* End Grid */}

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-base font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Message"
                  className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                >
                  Submit
                </button>
              </div>
            </form>
          </div> {/* End Form Column */}

        </div> {/* End Two Column Layout */}
      </div> {/* End Max Width Container */}
    </section>
  );
};

export default ContactForm;