"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cards } from "@/data/constants";
import { MessageSquare, BarChart2, BookOpen } from "lucide-react";
import { Button } from "@mui/material";
import Link from "next/link";

const Features = () => {
  const [selectedCard, setSelectedCard] = useState<number>(1);
  const [previousCard, setPreviousCard] = useState<number>(1);

  // Icons for each card with appropriate styling
  const cardIcons = {
    1: <MessageSquare size={80} strokeWidth={1.5} className="text-white/90" />,
    2: <BarChart2 size={80} strokeWidth={1.5} className="text-white/90" />,
    3: <BookOpen size={80} strokeWidth={1.5} className="text-white/90" />
  };

  // Get the currently selected card
  const selectedCardData = cards.find((card) => card.id === selectedCard) || cards[0];

  // Function to handle card selection with animation logic
  const handleCardSelect = (cardId: number) => {
    if (cardId !== selectedCard) {
      setPreviousCard(selectedCard);
      setSelectedCard(cardId);
    }
  };

  // Function to determine card position and styling based on selection and screen size
  const getCardClasses = (cardId: number) => {
    const isSelected = selectedCard === cardId;

    // Base classes for all cards
    let classes = "rounded-xl cursor-pointer overflow-hidden py-2";

    // Mobile: All cards in a grid (equal size)
    // Desktop: Selected card on left, others stacked on right
    if (isSelected) {
      classes += " bg-dark-logo-primary text-white";
      // On desktop, selected card takes left side, full height
      classes += " md:col-span-1 md:row-span-2 md:col-start-1 md:row-start-1";
    } else {
      // Unselected card styling (white with blue border)
      classes += " border border-dark-logo-primary bg-white";

      // On desktop, position unselected cards on the right
      if (cardId === 2) {
        classes += " md:col-start-2 md:row-start-1";
      } else if (cardId === 3) {
        classes += " md:col-start-2 md:row-start-2";
      }
    }

    return classes;
  };

  // Get animation properties based on card state
  const getAnimationProps = (cardId: number) => {
    const isSelected = selectedCard === cardId;
    const wasSelected = previousCard === cardId;

    // Base transition properties
    const transition = {
      type: "spring",
      stiffness: isSelected ? 300 : 400,
      damping: isSelected ? 25 : 35,
      mass: 1,
      duration: isSelected ? 1.2 : 1.0,
      ease: isSelected ? "easeOut" : "easeInOut",
      layout: true
    };

    // Animation properties
    const animate = {
      scale: 1,
      opacity: 1,
      zIndex: isSelected ? 1 : 1,
      boxShadow: isSelected ? "0px 10px 30px rgba(0, 0, 0, 0.1)" : "none",
    };

    // Mobile vs desktop sizing
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches) {
      if (isSelected) {
        // Selected card expands to fill its grid area
        // @ts-ignore
        animate.height = "100%";
        // @ts-ignore
        animate.width = "100%";
      } else {
        // Unselected cards maintain their size
        // @ts-ignore
        animate.height = "auto";
        // @ts-ignore
        animate.width = "100%";
      }
    }

    return { transition, animate };
  };

  return (
    <section className="">
      <div className="flex flex-col lg:flex-row-reverse lg:gap-4 px-5 py-12">
        {/* Cards Section */}
        <div className="w-full mb-12">
          <LayoutGroup>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:grid-rows-2 gap-4 h-auto">
              <AnimatePresence mode="popLayout">
                {cards.map((card) => {
                  const { transition, animate } = getAnimationProps(card.id);
                  return (
                    <motion.div
                      key={card.id}
                      className={getCardClasses(card.id)}
                      layoutId={`card-${card.id}`}
                      transition={transition}
                      onClick={() => handleCardSelect(card.id)}
                      initial={{ opacity: 0.9, scale: 0.95 }}
                      animate={animate}
                      exit={{
                        scale: 0.95,
                        opacity: 0.8,
                        transition: { duration: 0.5 }
                      }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.08)",
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="p-6 h-full flex flex-col"
                        layout
                      >
                        <motion.h3
                          layout="position"
                          className={`text-xl font-bold mb-2 ${card.id === selectedCard ? "text-white" : "text-dark-logo-primary"}`}
                        >
                          {card.title}
                        </motion.h3>
                        <motion.p
                          layout="position"
                          className={card.id === selectedCard ? "text-white/90" : "text-gray-700"}
                        >
                          {card.content}
                        </motion.p>

                        {/* Additional content that appears only in selected card */}
                        <AnimatePresence>
                          {card.id === selectedCard && (
                            <motion.div
                              className="mt-4 overflow-hidden"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            >
                              <div className="flex flex-col items-center mt-6 mb-2">
                                <motion.div
                                  className="flex justify-center items-center mb-6"
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: 0.2, duration: 0.4 }}
                                >
                                  {cardIcons[card.id as keyof typeof cardIcons]}
                                </motion.div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </LayoutGroup>
        </div>
        <div className="w-[35rem] xl:w-[65rem] flex items-center justify-center h-full mx-10">
          {/* Dynamic Text Section */}
          <AnimatePresence mode="wait">
            <motion.div
              className="text hidden md:grid text-left mx-auto"
              key={`text-section-${selectedCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="title mb-4">
                <h1 className="text-3xl font-medium text-black">
                  {selectedCardData.title}
                </h1>
              </div>
              <div className="desc">
                <p className="text-neutral-900 text-xl">{selectedCardData.description}</p>
              </div>
              <Link href={'/mp'}>
                <button
                  className="mt-5 bg-logo-primary text-white text-lg w-fit px-5 py-2 rounded-full"
                >
                  Check it out
                </button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Features;
