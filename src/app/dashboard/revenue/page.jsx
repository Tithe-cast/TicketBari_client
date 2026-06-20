"use client";

import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import RoleRoute from "../../../components/RoleRoute.jsx";
import useAuth from "../../../hooks/useAuth.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";

const StatCard = ({ label, value }) => (
  <div className="rounded-xl bg-base-100 p-5 shadow ring-1 ring-base-300">
    <p className="font-ticket text-[11px] uppercase tracking-wide text-base-content/50">{label}</p>
    <p className="font-display mt-1 text-2xl font-bold text-base-content">{value}</p>
  </div>
);

const RevenueOverviewContent = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["vendor-stats", user?.email],
    queryFn: async () => (await axiosSecure.get(`/vendor-stats/${user.email}`)).data,
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <h2 className="font-display mb-6 text-2xl font-bold text-base-content">Revenue Overview</h2>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Tickets Added" value={data?.totalTicketsAdded ?? 0} />
        <StatCard label="Tickets Sold" value={data?.totalTicketsSold ?? 0} />
        <StatCard label="Total Revenue" value={`$${data?.totalRevenue ?? 0}`} />
      </div>

      <div className="rounded-xl bg-base-100 p-5 shadow ring-1 ring-base-300">
        <h3 className="font-display mb-4 text-sm font-semibold text-base-content">Revenue by Month</h3>
        {data?.chartData?.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#F2A93B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="py-10 text-center text-sm text-base-content/50">No paid bookings yet.</p>
        )}
      </div>
    </div>
  );
};

const RevenueOverviewPage = () => (
  <RoleRoute role="vendor">
    <RevenueOverviewContent />
  </RoleRoute>
);

export default RevenueOverviewPage;
