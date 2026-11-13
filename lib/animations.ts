import type { Variants } from "motion/react";

export const invitationEase = [0.22, 1, 0.36, 1] as const;

export const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.075, delayChildren: 0.06 },
  },
};

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: invitationEase },
  },
};

export const imageRevealVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: invitationEase },
  },
};
