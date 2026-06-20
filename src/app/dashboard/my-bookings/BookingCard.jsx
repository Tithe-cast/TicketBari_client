"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";
import DepartureCountdown from "../../../components/Countdown.jsx";

const statusBadge = {
  pending: "badge-warning",
  accepted: "badge-info",
  rejected: "badge-error",
  paid: "badge-success",
};

const BookingCard = ({ booking }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const departed = new Date(booking.departureDateTime) < new Date();

  const handleCancel = async () => {
    try {
      await axiosSecure.delete(`/bookings/${booking._id}`);
      toast.success("Booking cancelled");
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not cancel booking");
    }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-base-100 shadow ring-1 ring-base-300">
      <div className="relative h-36 w-full">
        <Image src={booking.ticketImage} alt={booking.ticketTitle} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display line-clamp-1 text-sm font-semibold text-base-content">
            {booking.ticketTitle}
          </h3>
          <span className={`badge font-ticket text-[10px] capitalize ${statusBadge[booking.status]}`}>
            {booking.status}
          </span>
        </div>

        <div className="flex items-center gap-2 font-ticket text-xs text-base-content/60">
          <span className="truncate">{booking.from}</span>
          <span className="route-line h-px flex-1 text-secondary" />
          <span className="truncate">{booking.to}</span>
        </div>

        <p className="font-ticket text-xs text-base-content/60">
          Qty {booking.bookingQuantity} · Total{" "}
          <span className="font-semibold text-primary">${booking.totalPrice}</span>
        </p>

        {booking.status !== "rejected" && !departed && (
          <DepartureCountdown departureDateTime={booking.departureDateTime} />
        )}

        <div className="mt-auto flex gap-2 pt-2">
          {booking.status === "accepted" && !departed && (
            <Link
              href={`/dashboard/payment/${booking._id}`}
              className="btn btn-primary btn-sm flex-1 font-display"
            >
              Pay Now
            </Link>
          )}
          {booking.status === "pending" && (
            <button onClick={handleCancel} className="btn btn-outline btn-error btn-sm flex-1 font-display">
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
