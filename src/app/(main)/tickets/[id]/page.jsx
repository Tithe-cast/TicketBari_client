"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import PrivateRoute from "../../../../components/PrivateRoute.jsx";
import useAxiosSecure from "../../../../hooks/useAxiosSecure.js";
import LoadingSpinner from "../../../../components/LoadingSpinner.jsx";
import DepartureCountdown from "../../../../components/Countdown.jsx";
import BookingModal from "./BookingModal.jsx";

const TicketDetailsContent = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [modalOpen, setModalOpen] = useState(false);

  const { data: ticket, isLoading, refetch } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => (await axiosSecure.get(`/tickets/${id}`)).data,
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (!ticket) return null;

  const departed = new Date(ticket.departureDateTime) < new Date();
  const soldOut = ticket.quantity <= 0;
  const bookDisabled = departed || soldOut;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="relative h-72 overflow-hidden rounded-2xl lg:h-full">
          <Image src={ticket.image} alt={ticket.title} fill className="object-cover" />
        </div>

        <div>
          <span className="badge badge-secondary font-ticket text-xs">{ticket.transportType}</span>
          <h1 className="font-display mt-3 text-3xl font-bold text-base-content">{ticket.title}</h1>

          <div className="mt-4 flex items-center gap-2 font-ticket text-sm text-base-content/70">
            <FiMapPin />
            <span>{ticket.from}</span>
            <span className="route-line h-px flex-1 text-secondary" />
            <span>{ticket.to}</span>
            <FiMapPin />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-base-200 p-4">
            <div>
              <p className="font-ticket text-[11px] uppercase text-base-content/50">Price per unit</p>
              <p className="font-ticket text-xl font-semibold text-primary">${ticket.price}</p>
            </div>
            <div>
              <p className="font-ticket text-[11px] uppercase text-base-content/50">Seats left</p>
              <p className="font-ticket text-xl font-semibold text-base-content">{ticket.quantity}</p>
            </div>
            <div className="col-span-2">
              <p className="font-ticket text-[11px] uppercase text-base-content/50">Departure</p>
              <p className="font-ticket text-sm text-base-content">
                {new Date(ticket.departureDateTime).toLocaleString()}
              </p>
              <div className="mt-1">
                <DepartureCountdown departureDateTime={ticket.departureDateTime} />
              </div>
            </div>
          </div>

          {ticket.perks?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {ticket.perks.map((perk) => (
                <span key={perk} className="badge badge-outline">{perk}</span>
              ))}
            </div>
          )}

          <button
            onClick={() => setModalOpen(true)}
            disabled={bookDisabled}
            className="btn btn-primary mt-8 w-full font-display disabled:btn-disabled"
          >
            {departed ? "Departed" : soldOut ? "Sold Out" : "Book Now"}
          </button>
        </div>
      </div>

      {modalOpen && (
        <BookingModal ticket={ticket} onClose={() => setModalOpen(false)} onBooked={refetch} />
      )}
    </div>
  );
};

const TicketDetailsPage = () => (
  <PrivateRoute>
    <TicketDetailsContent />
  </PrivateRoute>
);

export default TicketDetailsPage;
