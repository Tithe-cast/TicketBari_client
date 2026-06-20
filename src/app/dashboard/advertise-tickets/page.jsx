"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import RoleRoute from "../../../components/RoleRoute.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";

const AdvertiseTicketsContent = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: allTickets = [], isLoading } = useQuery({
    queryKey: ["all-tickets-admin"],
    queryFn: async () => (await axiosSecure.get("/tickets/manage")).data,
  });

  const approvedTickets = allTickets.filter((t) => t.verificationStatus === "approved");
  const advertisedCount = approvedTickets.filter((t) => t.advertised).length;

  const handleToggle = async (id) => {
    try {
      await axiosSecure.patch(`/tickets/advertise/${id}`);
      queryClient.invalidateQueries({ queryKey: ["all-tickets-admin"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update advertise status");
    }
  };

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-2xl font-bold text-base-content">Advertise Tickets</h2>
        <span className="font-ticket text-xs text-base-content/60">
          {advertisedCount} / 6 slots used
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl bg-base-100 shadow ring-1 ring-base-300">
        <table className="table">
          <thead>
            <tr className="font-display text-xs uppercase">
              <th>Title</th>
              <th>Route</th>
              <th>Price</th>
              <th>Advertise</th>
            </tr>
          </thead>
          <tbody className="font-ticket text-sm">
            {approvedTickets.map((t) => (
              <tr key={t._id}>
                <td className="max-w-[180px] truncate">{t.title}</td>
                <td className="text-xs">{t.from} → {t.to}</td>
                <td className="text-primary">${t.price}</td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={t.advertised}
                    onChange={() => handleToggle(t._id)}
                    disabled={!t.advertised && advertisedCount >= 6}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdvertiseTicketsPage = () => (
  <RoleRoute role="admin">
    <AdvertiseTicketsContent />
  </RoleRoute>
);

export default AdvertiseTicketsPage;
