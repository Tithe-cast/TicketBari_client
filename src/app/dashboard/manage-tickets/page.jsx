"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import RoleRoute from "../../../components/RoleRoute.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";

const statusBadge = { pending: "badge-warning", approved: "badge-success", rejected: "badge-error" };

const ManageTicketsContent = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["all-tickets-admin"],
    queryFn: async () => (await axiosSecure.get("/tickets/manage")).data,
  });

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/tickets/approve/${id}`);
      toast.success("Ticket approved");
      queryClient.invalidateQueries({ queryKey: ["all-tickets-admin"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not approve ticket");
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/tickets/reject/${id}`);
      toast.success("Ticket rejected");
      queryClient.invalidateQueries({ queryKey: ["all-tickets-admin"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not reject ticket");
    }
  };

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <h2 className="font-display mb-6 text-2xl font-bold text-base-content">Manage Tickets</h2>

      <div className="overflow-x-auto rounded-xl bg-base-100 shadow ring-1 ring-base-300">
        <table className="table">
          <thead>
            <tr className="font-display text-xs uppercase">
              <th>Title</th>
              <th>Vendor</th>
              <th>Route</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="font-ticket text-sm">
            {tickets.map((t) => (
              <tr key={t._id}>
                <td className="max-w-[160px] truncate">{t.title}</td>
                <td className="text-xs">{t.vendorEmail}</td>
                <td className="text-xs">{t.from} → {t.to}</td>
                <td className="text-primary">${t.price}</td>
                <td>
                  <span className={`badge text-[10px] capitalize ${statusBadge[t.verificationStatus]}`}>
                    {t.verificationStatus}
                  </span>
                </td>
                <td>
                  {t.verificationStatus === "pending" ? (
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(t._id)} className="btn btn-success btn-xs font-display">
                        Approve
                      </button>
                      <button onClick={() => handleReject(t._id)} className="btn btn-error btn-xs font-display">
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
    </div>
  );
};

const ManageTicketsPage = () => (
  <RoleRoute role="admin">
    <ManageTicketsContent />
  </RoleRoute>
);

export default ManageTicketsPage;
