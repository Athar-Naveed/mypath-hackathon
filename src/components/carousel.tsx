"use client";

import {useEffect, useState} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Button from "./Button/button";
import {motion} from "framer-motion";
import {slider} from "@/data/constants";

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true});
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    let autoplayInterval: NodeJS.Timeout | null = null;

    const autoplay = () => {
      if (!isHovered && isTabActive) {
        emblaApi.scrollNext();
      }
    };

    const startAutoplay = () => {
      autoplayInterval = setInterval(autoplay, 10000);
    };

    if (isTabActive) {
      startAutoplay();
    }

    // const onSelect = () => {
    //   setSelectedIndex(emblaApi.selectedScrollSnap());
    // };

    // emblaApi.on("select", onSelect);
    // onSelect();

    return () => {
      // emblaApi.off("select", onSelect);
      if (autoplayInterval) clearInterval(autoplayInterval);
    };
  }, [emblaApi, isHovered, isTabActive]);

  // Create an array of different float animations
  //   const createFloatVariants = () => [
  //     // Float 1: Up and down
  //     {
  //       y: [0, -15, 0],
  //       transition: {
  //         duration: 2,
  //         repeat: Infinity,
  //         ease: "easeInOut",
  //         repeatDelay: 0.2,
  //       },
  //     },
  //     // Float 2: Slower, higher
  //     {
  //       y: [0, -20, 0],
  //       transition: {
  //         duration: 3.5,
  //         repeat: Infinity,
  //         ease: "easeInOut",
  //       },
  //     },
  //     // Float 3: Quick, short
  //     {
  //       y: [0, -8, 0],
  //       transition: {
  //         duration: 1.5,
  //         repeat: Infinity,
  //         ease: "easeInOut",
  //         repeatDelay: 0.5,
  //       },
  //     },
  //     // Float 4: Side to side
  //     {
  //       y: [0, 8, 0, -8, 0],
  //       transition: {
  //         duration: 3,
  //         repeat: Infinity,
  //         ease: "easeInOut",
  //       },
  //     },
  //     // Float 5: Circle-ish motion
  //     {
  //       x: [0, 8, 0, -8, 0],
  //       y: [0, -8, -16, -8, 0],
  //       transition: {
  //         duration: 4,
  //         repeat: Infinity,
  //         ease: "easeInOut",
  //       },
  //     },
  //   ];

  //   const floatVariants = createFloatVariants();

  // Base animation for shooting from bottom
  const createShootingAnimation = (index: any) => ({
    hidden: {
      opacity: 0,
      y: 150,
      scale: 0.3,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 150,
        duration: 0.7,
        // Random delay for each item
        delay: 0.2 + index * 0.1 + Math.random() * 0.3,
      },
    },
  });

  return (
    <div
      className="relative overflow-hidden h-fit lg:p-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slider.map((slide, slideIndex) => (
            <div key={slideIndex} className="flex-[0_0_100%] min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start lg:p-5">
                {/* Text Section */}
                <div className="space-y-6 mt-10 p-4">
                  <h1 className="carousel-heading">{slide.title}</h1>
                  <p className="carousel-desc">{slide.description}</p>
                  <Button title={slide.buttonText} place={"Carousel"} />
                </div>

                {/* Image Section with Random Floating Animation */}
                <div className="flex items-end justify-center h-full">
                  <div className="flex gap-4">
                    {slide.images.map((imageSrc, imgIndex) => {
                      // Get a random float animation for each image
                      //   const randomFloatIndex = Math.floor(Math.random() * floatVariants.length);
                      //   const floatAnimation = floatVariants[randomFloatIndex];
                      const shootingAnimation = createShootingAnimation(imgIndex);

                      return (
                        <motion.div
                          key={`image-${slideIndex}-${imgIndex}`}
                          initial="hidden"
                          animate="visible"
                          variants={shootingAnimation}
                          className="relative"
                        >
                          {/* Star trail effect */}
                          <motion.div
                            className="absolute inset-0 z-0"
                            initial={{opacity: 0.8}}
                            animate={{
                              opacity: 0,
                              y: -30,
                              scale: 1.1,
                              transition: {duration: 0.5},
                            }}
                          >
                            <div className="w-full h-full bg-blue-300 blur-md rounded-full" />
                          </motion.div>

                          {/* Image with custom floating animation */}
                          {/* animate={floatAnimation} */}
                          <motion.div className="relative z-10">
                            <Image
                              src={imageSrc}
                              alt={`Carousel Image ${imgIndex + 1}`}
                              width={100}
                              height={100}
                              className="carousel-icons"
                              priority={false}
                            />
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
