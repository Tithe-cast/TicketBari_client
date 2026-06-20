"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../../../hooks/useAuth.js";
import useAxiosSecure from "../../../../hooks/useAxiosSecure.js";

const BookingModal = ({ ticket, onClose, onBooked }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (quantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }
    if (quantity > ticket.quantity) {
      setError(`Only ${ticket.quantity} ticket(s) available`);
      return;
    }

    setSubmitting(true);
    try {
      await axiosSecure.post("/bookings", {
        ticketId: ticket._id,
        bookingQuantity: quantity,
        userName: user.name,
        userEmail: user.email,
      });
      toast.success("Booking request submitted!");
      onBooked?.();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal modal-open"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="modal-box"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-display text-lg font-bold text-base-content">Book "{ticket.title}"</h3>
          <p className="mt-1 text-sm text-base-content/60">
            {ticket.from} → {ticket.to} · ${ticket.price} per unit
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label className="label font-display text-sm">Quantity</label>
              <input
                type="number"
                min={1}
                max={ticket.quantity}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="input input-bordered w-full"
              />
              {error && <p className="mt-1 text-xs text-error">{error}</p>}
            </div>

            <div className="flex items-center justify-between rounded-lg bg-base-200 px-4 py-2">
              <span className="font-ticket text-xs uppercase text-base-content/50">Total</span>
              <span className="font-ticket text-lg font-semibold text-primary">
                ${(quantity * ticket.price).toFixed(2)}
              </span>
            </div>

            <div className="modal-action">
              <button type="button" onClick={onClose} className="btn btn-ghost font-display">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="btn btn-primary font-display">
                {submitting ? <span className="loading loading-spinner loading-sm" /> : "Confirm Booking"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
