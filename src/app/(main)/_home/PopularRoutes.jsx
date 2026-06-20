"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionTitle from "../../../components/SectionTitle.jsx";

const routes = [
  { from: "Dhaka", to: "Cox's Bazar", transportType: "Bus", note: "Overnight AC coaches" },
  { from: "Dhaka", to: "Sylhet", transportType: "Train", note: "Tea-garden views en route" },
  { from: "Dhaka", to: "Barisal", transportType: "Launch", note: "Riverboat with cabins" },
  { from: "Dhaka", to: "Chattogram", transportType: "Plane", note: "45-minute hop" },
];

const PopularRoutes = () => {
  return (
    <section className="bg-base-200 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow="Most booked" title="Popular Routes" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {routes.map((r, i) => (
            <motion.div
              key={`${r.from}-${r.to}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={`/all-tickets?search=${encodeURIComponent(r.to)}`}
                className="group block rounded-xl bg-base-100 p-5 ring-1 ring-base-300 transition hover:ring-primary"
              >
                <span className="font-ticket text-[10px] uppercase tracking-wide text-secondary">
                  {r.transportType}
                </span>
                <div className="mt-2 flex items-center gap-2 font-display text-sm font-semibold text-base-content">
                  <span>{r.from}</span>
                  <span className="route-line h-px flex-1 text-secondary" />
                  <span>{r.to}</span>
                </div>
                <p className="mt-2 text-xs text-base-content/60">{r.note}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
