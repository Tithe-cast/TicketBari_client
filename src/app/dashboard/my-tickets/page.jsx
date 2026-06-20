"use client";

import { useQuery } from "@tanstack/react-query";
import RoleRoute from "../../../components/RoleRoute.jsx";
import useAuth from "../../../hooks/useAuth.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";
import VendorTicketCard from "./VendorTicketCard.jsx";

const MyAddedTicketsContent = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["vendor-tickets", user?.email],
    queryFn: async () => (await axiosSecure.get(`/tickets/vendor/${user.email}`)).data,
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <h2 className="font-display mb-6 text-2xl font-bold text-base-content">My Added Tickets</h2>

      {tickets.length === 0 ? (
        <p className="text-base-content/60">You haven't added any tickets yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <VendorTicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

const MyAddedTicketsPage = () => (
  <RoleRoute role="vendor">
    <MyAddedTicketsContent />
  </RoleRoute>
);

export default MyAddedTicketsPage;
