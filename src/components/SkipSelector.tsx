import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FILTER_OPTIONS,
  skipsData,
  MOBILE_BREAKPOINT,
} from "../constants/skip-selector";
import { FilterIcon } from "./FilterIcon";
import { MobileSkipDetails } from "./MobileSkipDetails";
import { SkipCard } from "./SkipCard";
import { useMobileModal } from "../hooks/useMobileModal";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useFilter } from "../hooks/useFilter";
import { cardGridVariants, cardVariants } from "../ui/animations/skipSelector";
import type { Skip, SkipSelectorProps, FilterType } from "../types";

export const SkipSelector: React.FC<SkipSelectorProps> = ({
  selectedSize,
  onSizeSelect,
}) => {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  const { filter, setFilter } = useFilter();
  const { isOpen, selectedSkip, openModal, closeModal } = useMobileModal();

  const filteredSkips = useMemo(() => {
    return skipsData.filter((skip) => {
      if (filter === "road") return skip.allowed_on_road;
      if (filter === "heavy") return skip.allows_heavy_waste;
      return true;
    });
  }, [filter]);

  const handleSkipClick = (skip: Skip) => {
    onSizeSelect(skip.size);
    if (isMobile) {
      openModal(skip);
    }
  };

  const handleContinue = () => {
    closeModal();
    // Additional continue logic here
  };

  const renderFilterButton = (
    optionId: FilterType,
    label: string,
    Icon: (typeof FILTER_OPTIONS)[number]["icon"]
  ) => (
    <motion.button
      key={optionId}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setFilter(optionId)}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
        filter === optionId
          ? "bg-blue-600 text-white"
          : "bg-white/5 text-gray-300 hover:bg-white/10"
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </motion.button>
  );

  return (
    <div className="space-y-8 px-4 sm:px-0">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-3"
        >
          Choose Your Skip Size
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-300"
        >
          Select the skip size that best suits your needs
        </motion.p>
      </div>

      {isMobile ? (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          {FILTER_OPTIONS.map((option) => (
            <FilterIcon
              key={option.id}
              Icon={option.icon}
              active={filter === option.id}
              onClick={() => setFilter(option.id as FilterType)}
              label={option.label}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center gap-4">
          {FILTER_OPTIONS.map((option) =>
            renderFilterButton(
              option.id as FilterType,
              option.label,
              option.icon
            )
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          variants={cardGridVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 ml-16 sm:ml-0"
        >
          {filteredSkips.map((skip) => (
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

      {isMobile && selectedSkip && (
        <MobileSkipDetails
          skip={selectedSkip}
          isOpen={isOpen}
          onClose={closeModal}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};
