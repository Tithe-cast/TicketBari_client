"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic.js";
import TicketCard from "../../../components/TicketCard.jsx";
import SectionTitle from "../../../components/SectionTitle.jsx";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";

const LatestTickets = () => {
  const axiosPublic = useAxiosPublic();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["latest-tickets"],
    queryFn: async () => (await axiosPublic.get("/tickets/latest")).data,
  });

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionTitle
        eyebrow="Just listed"
        title="Latest Tickets"
        subtitle="The newest approved listings from vendors across the platform."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} variant="compact" />
        ))}
      </div>
    </section>
  );
};

export default LatestTickets;
