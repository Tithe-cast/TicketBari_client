"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PrivateRoute from "../../../../components/PrivateRoute.jsx";
import useAxiosSecure from "../../../../hooks/useAxiosSecure.js";
import LoadingSpinner from "../../../../components/LoadingSpinner.jsx";
import CheckoutForm from "./CheckoutForm.jsx";

const PaymentContent = () => {
  const { bookingId } = useParams();
  const axiosSecure = useAxiosSecure();
  const stripePromise = useMemo(
    () => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
    []
  );

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: async () => (await axiosSecure.get(`/bookings/${bookingId}`)).data,
    enabled: !!bookingId,
  });

  if (isLoading) return <LoadingSpinner />;
  if (!booking) return null;

  const departed = new Date(booking.departureDateTime) < new Date();

  if (departed) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-error">This ticket has already departed — payment is no longer available.</p>
      </div>
    );
  }

  if (booking.status === "paid") {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-success">This booking has already been paid for.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <h2 className="font-display mb-6 text-2xl font-bold text-base-content">Complete Payment</h2>

      <div className="mb-6 rounded-xl bg-base-100 p-5 shadow ring-1 ring-base-300">
        <h3 className="font-display text-sm font-semibold text-base-content">{booking.ticketTitle}</h3>
        <div className="mt-2 flex items-center gap-2 font-ticket text-xs text-base-content/60">
          <span>{booking.from}</span>
          <span className="route-line h-px flex-1 text-secondary" />
          <span>{booking.to}</span>
        </div>
        <p className="mt-3 font-ticket text-xs text-base-content/60">
          Qty {booking.bookingQuantity} × ${booking.unitPrice}
        </p>
        <p className="font-ticket text-lg font-semibold text-primary">Total: ${booking.totalPrice}</p>
      </div>

      <Elements stripe={stripePromise}>
        <CheckoutForm booking={booking} />
      </Elements>
    </div>
  );
};

const PaymentPage = () => (
  <PrivateRoute>
    <PaymentContent />
  </PrivateRoute>
);

export default PaymentPage;
