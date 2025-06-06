import { useState, useCallback } from "react";

export interface UseSkipSelectorProps {
  onSizeSelect?: (size: number | undefined) => void;
}

export const useSkipSelector = ({
  onSizeSelect,
}: UseSkipSelectorProps = {}) => {
  const [selectedSize, setSelectedSize] = useState<number>();
  const [showMobileModal, setShowMobileModal] = useState(false);

  const handleSizeSelect = useCallback(
    (size: number) => {
      const newSize = selectedSize === size ? undefined : size;
      setSelectedSize(newSize);
      if (newSize && window.innerWidth < 640) {
        // sm breakpoint
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
