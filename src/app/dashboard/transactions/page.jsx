"use client";

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";

const TransactionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["my-payments", user?.email],
    queryFn: async () => (await axiosSecure.get(`/payments/user/${user.email}`)).data,
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <h2 className="font-display mb-6 text-2xl font-bold text-base-content">Transaction History</h2>

      {payments.length === 0 ? (
        <p className="text-base-content/60">No transactions yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-base-100 shadow ring-1 ring-base-300">
          <table className="table">
            <thead>
              <tr className="font-display text-xs uppercase">
                <th>Transaction ID</th>
                <th>Ticket</th>
                <th>Amount</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody className="font-ticket text-sm">
              {payments.map((p) => (
                <tr key={p._id}>
                  <td className="max-w-[180px] truncate">{p.transactionId}</td>
                  <td>{p.ticketTitle}</td>
                  <td className="text-primary">${p.amount}</td>
                  <td>{new Date(p.paymentDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
