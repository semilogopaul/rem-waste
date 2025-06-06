import { motion } from "framer-motion";
import type { IconType } from "../types";

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
}: FilterIconProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`
      relative p-3 rounded-xl transition-all duration-200
      ${
        active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
          : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
      }
    `}
    title={label}
  >
    <Icon className="w-5 h-5" />
    {active && (
      <motion.div
        layoutId="activeFilter"
        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl -z-10"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
  </motion.button>
);
