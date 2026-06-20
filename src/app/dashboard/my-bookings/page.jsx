"use client";

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";
import BookingCard from "./BookingCard.jsx";

const MyBookedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => (await axiosSecure.get(`/bookings/user/${user.email}`)).data,
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <h2 className="font-display mb-6 text-2xl font-bold text-base-content">My Booked Tickets</h2>

      {bookings.length === 0 ? (
        <p className="text-base-content/60">You haven't booked any tickets yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookedTickets;
