import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FILTER_OPTIONS,
  skipsData,
  MOBILE_BREAKPOINT,
} from "../constants/skip-selector";
import { MobileSkipDetails } from "./MobileSkipDetails";
import { SkipCard } from "./SkipCard";
import { useMobileModal } from "../hooks/useMobileModal";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useFilter } from "../hooks/useFilter";
import { cardGridVariants, cardVariants } from "../ui/animations/skipSelector";
import { filterSkips } from "../utils/skipFilters";
import type { Skip, SkipSelectorProps, FilterType } from "../types";

export const SkipSelector: React.FC<SkipSelectorProps> = ({
  selectedSize,
  onSizeSelect,
}) => {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  const { filter, setFilter } = useFilter();
  const { isOpen, selectedSkip, openModal, closeModal } = useMobileModal();

  const filteredSkips = useMemo(() => filterSkips(skipsData, filter), [filter]);

  const handleSkipClick = (skip: Skip) => {
    onSizeSelect(skip.size);
    if (isMobile) {
      openModal(skip);
    }
  };

  const handleContinue = () => {
    closeModal();
  };

  return (
    <div className="space-y-8 px-4 sm:px-0">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-3"
        >
          Choose Your Skip Size
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="text-lg text-gray-300"
        >
          Select the skip size that best suits your needs
        </motion.p>
      </div>

      <div
        className="flex justify-center gap-2 sm:gap-4"
        role="toolbar"
        aria-label="Skip filter options"
      >
        {FILTER_OPTIONS.map((option) =>
          isMobile ? (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(option.id as FilterType)}
              className={`
                relative p-2.5 rounded-xl transition-all duration-200
                ${
                  filter === option.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
                }
              `}
              title={option.label}
              aria-label={option.label}
              aria-pressed={filter === option.id}
              aria-controls="skip-grid"
            >
              <option.icon className="w-5 h-5" aria-hidden="true" />
              {filter === option.id && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ) : (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter(option.id as FilterType)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                ${
                  filter === option.id
                    ? "bg-blue-600 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }
              `}
              aria-label={option.label}
              aria-pressed={filter === option.id}
              aria-controls="skip-grid"
            >
              <option.icon className="w-5 h-5" aria-hidden="true" />
              <span>{option.label}</span>
            </motion.button>
          )
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          variants={cardGridVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          id="skip-grid"
        >
          {" "}
          {filteredSkips.map((skip: Skip) => (
            <motion.div
              key={skip.id}
              variants={cardVariants}
              layoutId={`skip-${skip.id}`}
            >
              <SkipCard
                skip={skip}
                isSelected={selectedSize === skip.size}
                onClick={() => handleSkipClick(skip)}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isMobile && selectedSkip && (
          <MobileSkipDetails
            skip={selectedSkip}
            isOpen={isOpen}
            onClose={closeModal}
            onContinue={handleContinue}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
