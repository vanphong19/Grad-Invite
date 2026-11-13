"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { initials, invitation } from "@/config/invitation";
import { revealVariants, sectionVariants } from "@/lib/animations";

export function ThankYouSection({ onNext }: { onNext: () => void }) {
  return (
    <motion.section
      className="inside-thanks"
      aria-labelledby="thank-you-title"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <motion.p className="tc-eyebrow" variants={revealVariants}>
        Hẹn gặp bạn trong ngày đặc biệt
      </motion.p>
      <motion.div className="tc-seal" variants={revealVariants} aria-hidden="true">
        <span>{initials}</span>
        <span className="tc-seal-year">{invitation.graduationYear}</span>
      </motion.div>
      <motion.h2 id="thank-you-title" className="tc-heading" variants={revealVariants}>
        SEE YOU
        <br />
        THERE.
      </motion.h2>
      <motion.p className="tc-message" variants={revealVariants}>
        {invitation.thankYouMessage}
      </motion.p>
      <motion.p className="tc-signature" variants={revealVariants}>
        {invitation.fullName}
      </motion.p>
      <motion.p className="tc-footnote" variants={revealVariants}>
        With gratitude, always.
      </motion.p>
      <motion.button type="button" className="tc-read-again" onClick={onNext} variants={revealVariants}>
        Đọc lại lời mời
        <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" />
      </motion.button>
    </motion.section>
  );
}
