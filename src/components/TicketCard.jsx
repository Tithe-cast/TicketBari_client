"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

/**
 * The site's signature visual element: every ticket renders as a literal
 * boarding-pass stub — image + details on the left, a perforated tear-line,
 * then a narrow stub with the price and "See details" action.
 */
const TicketCard = ({ ticket, variant = "full" }) => {
  const { _id, title, image, price, quantity, transportType, perks = [], from, to, departureDateTime } = ticket;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="relative flex h-full overflow-hidden rounded-2xl bg-base-100 shadow-md ring-1 ring-base-300 hover:shadow-xl"
    >
      <div className="relative w-2/5 shrink-0 overflow-hidden">
        <Image src={image} alt={title} fill sizes="200px" className="object-cover" />
        <span className="badge badge-secondary absolute left-2 top-2 z-10 font-ticket text-[10px] text-secondary-content">
          {transportType}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="font-display line-clamp-2 text-base font-semibold leading-snug text-base-content">
            {title}
          </h3>

          {variant === "full" && from && to && (
            <div className="mt-2 flex items-center gap-2 font-ticket text-xs text-base-content/70">
              <span className="truncate">{from}</span>
              <span className="route-line h-px flex-1 text-secondary" />
              <span className="truncate">{to}</span>
            </div>
          )}

          {perks.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {perks.slice(0, 3).map((perk) => (
                <span key={perk} className="badge badge-ghost badge-sm">
                  {perk}
                </span>
              ))}
            </div>
          )}

          {variant === "full" && departureDateTime && (
            <p className="mt-2 font-ticket text-[11px] text-base-content/60">
              Departs {new Date(departureDateTime).toLocaleString()}
            </p>
          )}
        </div>

        <p className="mt-2 font-ticket text-xs text-base-content/60">
          {quantity > 0 ? `${quantity} seats left` : "Sold out"}
        </p>
      </div>

      <div className="relative flex w-24 shrink-0 flex-col items-center justify-center gap-2 border-l border-dashed border-base-300 bg-base-200 px-2 text-center">
        <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-base-100" />
        <span className="absolute -left-2 -bottom-2 h-4 w-4 rounded-full bg-base-100" />
        <span className="font-ticket text-[10px] uppercase tracking-wide text-base-content/50">Price</span>
        <p className="font-ticket text-lg font-semibold text-primary">${price}</p>
        <Link href={`/tickets/${_id}`} className="btn btn-xs btn-secondary gap-1 font-ticket">
          Details <FiArrowRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
};

export default TicketCard;
