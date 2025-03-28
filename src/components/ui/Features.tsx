"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {cards} from "@/data/constants";

const Features = () => {
  const [selectedCard, setSelectedCard] = useState<number>(1);

  // Get the currently selected card
  const selectedCardData = cards.find((card) => card.id === selectedCard) || cards[0];

  // Function to determine card position and styling based on selection and screen size
  const getCardClasses = (cardId: number) => {
    const isSelected = selectedCard === cardId;

    // Base classes for all cards
    let classes = "rounded-xl cursor-pointer overflow-hidden transition-all duration-300";

    // Mobile: All cards in a grid (equal size)
    // Desktop: Selected card on left, others stacked on right
    if (isSelected) {
      classes += " bg-dark-logo-primary text-white";
      // On mobile, all cards are equal size in a grid
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

  return (
    <section className="min-w-[320px] max-w-[1440px] mx-auto">
      <div className="flex flex-col lg:flex-row-reverse lg:gap-4 px-4 py-12">
        {/* Cards Section */}
        <div className="w-full mb-12">
          {/* 
          Mobile (320px-640px): Regular grid, all cards equal size
          Desktop (768px+): 2 column grid, selected card on left (full height), others stacked on right
        */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:grid-rows-2 gap-4 h-auto">
            {/* On mobile, show all cards in a grid */}
            {/* On desktop, show the selected card first */}
            {cards.map((card) => (
              <motion.div
                key={card.id}
                className={getCardClasses(card.id)}
                layout
                transition={{type: "spring", stiffness: 300, damping: 30}}
                onClick={() => setSelectedCard(card.id)}
              >
                <div className="p-6 h-full flex flex-col">
                  <h3
                    className={`text-xl font-bold mb-2 ${card.id === selectedCard ? "text-white" : "text-dark-logo-primary"}`}
                  >
                    {card.title}
                  </h3>
                  <p className={card.id === selectedCard ? "text-white/90" : "text-gray-700"}>
                    {card.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="w-[35rem] xl:w-[65rem] flex items-center justify-center h-full mx-10">
          {/* Dynamic Text Section */}
          <motion.div
            className="text hidden md:grid text-left mx-auto"
            key={`text-section-${selectedCard}`}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
          >
            <div className="title mb-4">
              <h1 className="text-3xl font-bold text-dark-logo-primary">
                {selectedCardData.title}
              </h1>
            </div>
            <div className="desc">
              <p className="text-gray-700">{selectedCardData.description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
