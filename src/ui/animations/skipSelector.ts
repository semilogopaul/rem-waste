import type { Variants } from "framer-motion";

// Configuration for smooth spring animations
const springConfig = {
  type: "spring" as const,
  bounce: 0.3,
  duration: 0.5,
};

// Modal animation variants
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springConfig,
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: {
      ...springConfig,
      duration: 0.2,
    },
  },
};

// Mascot character animation variants
export const mascotVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, x: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      ...springConfig,
      duration: 0.6,
      bounce: 0.4,
    },
  },
};

// Grid container animation variants for staggered card reveals
export const cardGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      ...springConfig,
    },
  },
};

// Card animation variants for consistent hover and tap interactions
export const cardInteractionVariants: Variants = {
  hover: { scale: 1.02, transition: { ...springConfig, duration: 0.2 } },
  tap: { scale: 0.98, transition: { ...springConfig, duration: 0.1 } },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.5,
    },
  },
};
