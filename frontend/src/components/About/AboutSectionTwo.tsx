"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const AboutSectionTwo = () => {
  const cards = [
    {
      id: 1,
      title: "Bipasha",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/images/about/about-image-1.svg",
      imageDark: "/images/about/about-image-1-dark.svg",
    },
    {
      id: 2,
      title: "Shankar",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      image: "/images/about/about-image-2.svg",
      imageDark: "/images/about/about-image-2-dark.svg",
    },
    {
      id: 3,
      title: "Shruti",
      text: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt consectetur adipiscing elit setim.",
      image: "/images/about/about-image-3.svg",
      imageDark: "/images/about/about-image-3-dark.svg",
    },
    {
      id: 4,
      title: "Srija",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      image: "/images/about/about-image-4.svg",
      imageDark: "/images/about/about-image-4-dark.svg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [cards.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <section className="py-16 md:py-20 lg:py-28  relative">
      <div className="container mx-auto flex flex-col items-center">
        {/* Image Section */}
        <div className="relative w-full max-w-xs aspect-[25/24] mb-4">
          <Image
            src={cards[currentIndex].image}
            alt={cards[currentIndex].title}
            fill
            className="drop-shadow-three dark:hidden"
            sizes="(max-width: 640px) 100vw, 300px"
          />
          <Image
            src={cards[currentIndex].imageDark}
            alt={cards[currentIndex].title}
            fill
            className="hidden dark:block"
            sizes="(max-width: 640px) 100vw, 300px"
          />
        </div>

        {/* Title and Text Section */}
        <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl text-center">
          {cards[currentIndex].title}
        </h3>
        <p className="text-base font-medium leading-relaxed text-gray-800 dark:text-gray-200 sm:text-lg sm:leading-relaxed text-center">
          {cards[currentIndex].text}
        </p>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <button
            onClick={handlePrev}
            className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
          >
            Previous
          </button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <button
            onClick={handleNext}
            className="bg-gray-300 dark:bg-gray-950 text-black dark:text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
