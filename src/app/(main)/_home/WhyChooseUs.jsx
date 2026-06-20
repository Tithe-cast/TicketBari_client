"use client";

import { motion } from "framer-motion";
import { FiShield, FiClock, FiTag, FiHeadphones } from "react-icons/fi";
import SectionTitle from "../../../components/SectionTitle.jsx";

const points = [
  { icon: <FiShield />, title: "Verified vendors only", desc: "Every operator is reviewed by our team before going live." },
  { icon: <FiClock />, title: "Live departure countdowns", desc: "Know exactly how much time is left before you book." },
  { icon: <FiTag />, title: "Transparent pricing", desc: "Per-unit pricing shown upfront — no hidden booking fees." },
  { icon: <FiHeadphones />, title: "Support that responds", desc: "Real people on email and Facebook for booking issues." },
];

const WhyChooseUs = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionTitle eyebrow="Why TicketBari" title="Built for travelers, not just bookings" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-xl border border-base-300 p-5 text-center"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
              {p.icon}
            </div>
            <h3 className="font-display text-sm font-semibold text-base-content">{p.title}</h3>
            <p className="mt-2 text-xs text-base-content/60">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
