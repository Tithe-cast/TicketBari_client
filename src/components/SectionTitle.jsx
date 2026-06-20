"use client";

import { motion } from "framer-motion";

const SectionTitle = ({ eyebrow, title, subtitle, align = "center" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {eyebrow && (
        <span className="font-ticket text-xs uppercase tracking-[0.2em] text-secondary">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display mt-2 text-3xl font-bold text-base-content md:text-4xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-2xl text-base-content/70">{subtitle}</p>}
    </motion.div>
  );
};

export default SectionTitle;
