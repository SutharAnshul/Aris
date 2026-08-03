import type { Variants, Transition } from "framer-motion";

export const easeOut: Transition["ease"] = [0.16, 1, 0.3, 1];

export const screenVariants: Variants = {
  enter: (dir: 1 | -1) => ({
    opacity: 0,
    x: dir === 1 ? 16 : -16,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: easeOut },
  },
  exit: (dir: 1 | -1) => ({
    opacity: 0,
    x: dir === 1 ? -16 : 16,
    transition: { duration: 0.22, ease: easeOut },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.02,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: easeOut },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: easeOut } },
};
