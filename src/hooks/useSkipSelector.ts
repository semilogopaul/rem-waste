import { useState, useCallback } from "react";
import { MOBILE_BREAKPOINT } from "../constants/skip-selector";

export interface UseSkipSelectorProps {
  onSizeSelect?: (size: number | null) => void;
}

export const useSkipSelector = ({
  onSizeSelect,
}: UseSkipSelectorProps = {}) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [showMobileModal, setShowMobileModal] = useState(false);

  const handleSizeSelect = useCallback(
    (size: number) => {
      const newSize = selectedSize === size ? null : size;
      setSelectedSize(newSize);
      if (newSize && window.innerWidth < MOBILE_BREAKPOINT) {
        setShowMobileModal(true);
      }
      onSizeSelect?.(newSize);
    },
    [selectedSize, onSizeSelect]
  );

  const handleCloseMobileModal = useCallback(() => {
    setShowMobileModal(false);
  }, []);

  return {
    selectedSize,
    showMobileModal,
    handleSizeSelect,
    handleCloseMobileModal,
  };
};
