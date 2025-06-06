import { motion } from "framer-motion";
import type { IconType } from "../types";
import { useState, useCallback, useEffect } from "react";

interface FilterIconProps {
  Icon: IconType;
  active: boolean;
  onClick: () => void;
  label: string;
}

export const FilterIcon = ({
  Icon,
  active,
  onClick,
  label,
}: FilterIconProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = useCallback(() => {
    onClick();
    setShowTooltip(true);
  }, [onClick]);

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`
        relative p-3 rounded-xl transition-all duration-200 group
        ${
          active
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
            : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
        }
      `}
      title={label}
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
      {active && (
        <motion.div
          layoutId="activeFilter"
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span
        className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-slate-900 text-xs text-white pointer-events-none z-10 whitespace-nowrap shadow-lg border border-blue-500/20 transition-opacity duration-200 ${
          showTooltip || "group-hover:opacity-100"
        } ${showTooltip ? "opacity-100" : "opacity-0"}`}
      >
        {label}
      </span>
    </motion.button>
  );
};
