"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import RoleRoute from "../../../components/RoleRoute.jsx";
import useAuth from "../../../hooks/useAuth.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";

const statusBadge = { pending: "badge-warning", accepted: "badge-info", rejected: "badge-error", paid: "badge-success" };

const RequestedBookingsContent = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["vendor-bookings", user?.email],
    queryFn: async () => (await axiosSecure.get(`/bookings/vendor/${user.email}`)).data,
    enabled: !!user?.email,
  });

  const handleAccept = async (id) => {
    try {
      await axiosSecure.patch(`/bookings/accept/${id}`);
      toast.success("Booking accepted");
      queryClient.invalidateQueries({ queryKey: ["vendor-bookings"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not accept booking");
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/bookings/reject/${id}`);
      toast.success("Booking rejected");
      queryClient.invalidateQueries({ queryKey: ["vendor-bookings"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not reject booking");
    }
  };

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <h2 className="font-display mb-6 text-2xl font-bold text-base-content">Requested Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-base-content/60">No booking requests yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-base-100 shadow ring-1 ring-base-300">
          <table className="table">
            <thead>
              <tr className="font-display text-xs uppercase">
                <th>User</th>
                <th>Ticket</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="font-ticket text-sm">
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>
                    <div className="font-display text-sm">{b.userName}</div>
                    <div className="text-xs text-base-content/50">{b.userEmail}</div>
                  </td>
                  <td>{b.ticketTitle}</td>
                  <td>{b.bookingQuantity}</td>
                  <td className="text-primary">${b.totalPrice}</td>
                  <td>
                    <span className={`badge text-[10px] capitalize ${statusBadge[b.status]}`}>{b.status}</span>
                  </td>
                  <td>
                    {b.status === "pending" ? (
                      <div className="flex gap-2">
                        <button onClick={() => handleAccept(b._id)} className="btn btn-success btn-xs font-display">
                          Accept
                        </button>
                        <button onClick={() => handleReject(b._id)} className="btn btn-error btn-xs font-display">
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-base-content/40">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const RequestedBookingsPage = () => (
  <RoleRoute role="vendor">
    <RequestedBookingsContent />
  </RoleRoute>
);

export default RequestedBookingsPage;
