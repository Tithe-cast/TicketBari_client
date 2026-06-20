"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth.js";
import useAxiosSecure from "../../../../hooks/useAxiosSecure.js";

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      fontFamily: "var(--font-jetbrains-mono), monospace",
      color: "#191A2E",
      "::placeholder": { color: "#9CA3AF" },
    },
    invalid: { color: "#E2562E" },
  },
};

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState("");

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { totalPrice: booking.totalPrice })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch(() => toast.error("Could not initialize payment"));
  }, [booking.totalPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);
    setCardError("");

    const card = elements.getElement(CardElement);

    const { error: methodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setCardError(methodError.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: { name: user?.name || "Anonymous", email: user?.email },
      },
    });

    if (confirmError) {
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        await axiosSecure.post("/payments", {
          bookingId: booking._id,
          transactionId: paymentIntent.id,
          amount: booking.totalPrice,
          userEmail: user.email,
          ticketTitle: booking.ticketTitle,
        });
        toast.success("Payment successful!");
        router.push("/dashboard/transactions");
      } catch (err) {
        toast.error(err.response?.data?.message || "Payment succeeded but recording failed");
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-base-300 bg-base-100 p-4">
        <CardElement options={cardElementOptions} />
      </div>
      {cardError && <p className="text-xs text-error">{cardError}</p>}

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn btn-primary w-full font-display"
      >
        {processing ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          `Pay $${booking.totalPrice}`
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
