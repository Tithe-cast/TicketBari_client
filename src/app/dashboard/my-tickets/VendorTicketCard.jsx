"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";

const statusBadge = { pending: "badge-warning", approved: "badge-success", rejected: "badge-error" };

const VendorTicketCard = ({ ticket }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const disabled = ticket.verificationStatus === "rejected";

  const handleDelete = async () => {
    if (!confirm(`Delete "${ticket.title}"? This cannot be undone.`)) return;
    try {
      await axiosSecure.delete(`/tickets/${ticket._id}`);
      toast.success("Ticket deleted");
      queryClient.invalidateQueries({ queryKey: ["vendor-tickets"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete ticket");
    }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-base-100 shadow ring-1 ring-base-300">
      <div className="relative h-36 w-full">
        <Image src={ticket.image} alt={ticket.title} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display line-clamp-1 text-sm font-semibold text-base-content">{ticket.title}</h3>
          <span className={`badge font-ticket text-[10px] capitalize ${statusBadge[ticket.verificationStatus]}`}>
            {ticket.verificationStatus}
          </span>
        </div>
        <div className="flex items-center gap-2 font-ticket text-xs text-base-content/60">
          <span className="truncate">{ticket.from}</span>
          <span className="route-line h-px flex-1 text-secondary" />
          <span className="truncate">{ticket.to}</span>
        </div>
        <p className="font-ticket text-xs text-base-content/60">
          ${ticket.price} · {ticket.quantity} left
        </p>

        <div className="mt-auto flex gap-2 pt-2">
          <Link
            href={`/dashboard/my-tickets/${ticket._id}/edit`}
            aria-disabled={disabled}
            className={`btn btn-outline btn-sm flex-1 font-display ${disabled ? "btn-disabled" : ""}`}
          >
            Update
          </Link>
          <button
            onClick={handleDelete}
            disabled={disabled}
            className="btn btn-outline btn-error btn-sm flex-1 font-display"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorTicketCard;
