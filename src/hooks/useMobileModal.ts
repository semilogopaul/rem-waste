import { useState, useCallback } from "react";
import type { Skip } from "../types";

export const useMobileModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  const openModal = useCallback((skip: Skip) => {
    setSelectedSkip(skip);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setSelectedSkip(null), 200); // Clear after animation
  }, []);

  return {
    isOpen,
    selectedSkip,
    openModal,
    closeModal,
  };
};
