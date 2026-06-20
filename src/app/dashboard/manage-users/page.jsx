"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import RoleRoute from "../../../components/RoleRoute.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";

const roleBadge = { user: "badge-info", vendor: "badge-secondary", admin: "badge-primary" };

const ManageUsersContent = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users", search],
    queryFn: async () => (await axiosSecure.get("/users", { params: { search } })).data,
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["all-users"] });

  const handleMakeAdmin = async (id) => {
    try {
      await axiosSecure.patch(`/users/admin/${id}`);
      toast.success("User is now an admin");
      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  const handleMakeVendor = async (id) => {
    try {
      await axiosSecure.patch(`/users/vendor/${id}`);
      toast.success("User is now a vendor");
      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  const handleMarkFraud = async (id) => {
    if (!confirm("Mark this vendor as fraud? All their tickets will be hidden.")) return;
    try {
      await axiosSecure.patch(`/users/fraud/${id}`);
      toast.success("Vendor marked as fraud");
      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-2xl font-bold text-base-content">Manage Users</h2>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered input-sm w-full sm:w-64"
        />
      </div>

      <div className="overflow-x-auto rounded-xl bg-base-100 shadow ring-1 ring-base-300">
        <table className="table">
          <thead>
            <tr className="font-display text-xs uppercase">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="font-ticket text-sm">
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td className="text-xs">{u.email}</td>
                <td>
                  <span className={`badge text-[10px] capitalize ${roleBadge[u.role]}`}>{u.role}</span>
                  {u.fraud && <span className="badge badge-error ml-1 text-[10px]">fraud</span>}
                </td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    {u.role !== "admin" && (
                      <button onClick={() => handleMakeAdmin(u._id)} className="btn btn-outline btn-xs font-display">
                        Make Admin
                      </button>
                    )}
                    {u.role !== "vendor" && (
                      <button onClick={() => handleMakeVendor(u._id)} className="btn btn-outline btn-xs font-display">
                        Make Vendor
                      </button>
                    )}
                    {u.role === "vendor" && !u.fraud && (
                      <button onClick={() => handleMarkFraud(u._id)} className="btn btn-error btn-xs font-display">
                        Mark as Fraud
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ManageUsersPage = () => (
  <RoleRoute role="admin">
    <ManageUsersContent />
  </RoleRoute>
);

export default ManageUsersPage;
