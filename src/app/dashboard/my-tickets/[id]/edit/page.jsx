"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import RoleRoute from "../../../../../components/RoleRoute.jsx";
import useAuth from "../../../../../hooks/useAuth.js";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure.js";
import LoadingSpinner from "../../../../../components/LoadingSpinner.jsx";
import { uploadImageToImgbb } from "../../../../../lib/imgbb.js";

const TRANSPORT_TYPES = ["Bus", "Train", "Launch", "Plane"];
const PERK_OPTIONS = ["AC", "Breakfast", "WiFi", "Charging Port", "Reclining Seat", "Snacks"];

const UpdateTicketForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const { data: ticket, isLoading } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => (await axiosSecure.get(`/tickets/${id}`)).data,
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (ticket) {
      reset({
        title: ticket.title,
        from: ticket.from,
        to: ticket.to,
        transportType: ticket.transportType,
        price: ticket.price,
        quantity: ticket.quantity,
        departureDateTime: ticket.departureDateTime?.slice(0, 16),
        perks: ticket.perks,
      });
    }
  }, [ticket, reset]);

  if (isLoading) return <LoadingSpinner />;
  if (!ticket) return null;

  if (ticket.verificationStatus === "rejected") {
    return <p className="text-error">Rejected tickets cannot be updated.</p>;
  }

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      let imageUrl = ticket.image;
      const imageFile = formData.image?.[0];
      if (imageFile) {
        imageUrl = await uploadImageToImgbb(imageFile);
      }

      const perks = PERK_OPTIONS.filter((perk) =>
        Array.isArray(formData.perks) ? formData.perks.includes(perk) : formData.perks === perk
      );

      await axiosSecure.patch(`/tickets/${id}`, {
        title: formData.title,
        from: formData.from,
        to: formData.to,
        transportType: formData.transportType,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        departureDateTime: formData.departureDateTime,
        perks,
        image: imageUrl,
      });

      toast.success("Ticket updated!");
      router.push("/dashboard/my-tickets");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update ticket");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="font-display mb-6 text-2xl font-bold text-base-content">Update Ticket</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 rounded-2xl bg-base-100 p-6 shadow ring-1 ring-base-300"
      >
        <div>
          <label className="label font-display text-sm">Ticket Title</label>
          <input
            type="text"
            className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`}
            {...register("title", { required: "Title is required" })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label font-display text-sm">From</label>
            <input type="text" className="input input-bordered w-full" {...register("from", { required: true })} />
          </div>
          <div>
            <label className="label font-display text-sm">To</label>
            <input type="text" className="input input-bordered w-full" {...register("to", { required: true })} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label font-display text-sm">Transport Type</label>
            <select className="select select-bordered w-full" {...register("transportType", { required: true })}>
              {TRANSPORT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label font-display text-sm">Departure Date & Time</label>
            <input
              type="datetime-local"
              className="input input-bordered w-full"
              {...register("departureDateTime", { required: true })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label font-display text-sm">Price (per unit)</label>
            <input type="number" step="0.01" min={0} className="input input-bordered w-full" {...register("price", { required: true, min: 0 })} />
          </div>
          <div>
            <label className="label font-display text-sm">Ticket Quantity</label>
            <input type="number" min={0} className="input input-bordered w-full" {...register("quantity", { required: true, min: 0 })} />
          </div>
        </div>

        <div>
          <label className="label font-display text-sm">Perks</label>
          <div className="flex flex-wrap gap-3">
            {PERK_OPTIONS.map((perk) => (
              <label key={perk} className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  value={perk}
                  defaultChecked={ticket.perks?.includes(perk)}
                  className="checkbox checkbox-sm checkbox-primary"
                  {...register("perks")}
                />
                <span className="label-text text-sm">{perk}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="label font-display text-sm">
            Replace Image <span className="text-base-content/50">(optional)</span>
          </label>
          <input type="file" accept="image/*" className="file-input file-input-bordered w-full" {...register("image")} />
        </div>

        <button type="submit" disabled={submitting} className="btn btn-primary w-full font-display">
          {submitting ? <span className="loading loading-spinner loading-sm" /> : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

const UpdateTicketPage = () => (
  <RoleRoute role="vendor">
    <UpdateTicketForm />
  </RoleRoute>
);

export default UpdateTicketPage;
