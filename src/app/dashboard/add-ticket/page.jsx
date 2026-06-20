"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RoleRoute from "../../../components/RoleRoute.jsx";
import useAuth from "../../../hooks/useAuth.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";
import { uploadImageToImgbb } from "../../../lib/imgbb.js";

const TRANSPORT_TYPES = ["Bus", "Train", "Launch", "Plane"];
const PERK_OPTIONS = ["AC", "Breakfast", "WiFi", "Charging Port", "Reclining Seat", "Snacks"];

const AddTicketForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const imageFile = formData.image?.[0];
    if (!imageFile) {
      toast.error("Please choose an image");
      return;
    }

    setSubmitting(true);
    try {
      const imageUrl = await uploadImageToImgbb(imageFile);

      const perks = PERK_OPTIONS.filter((perk) => formData.perks?.includes(perk));

      await axiosSecure.post("/tickets", {
        title: formData.title,
        from: formData.from,
        to: formData.to,
        transportType: formData.transportType,
        price: formData.price,
        quantity: formData.quantity,
        departureDateTime: formData.departureDateTime,
        perks,
        image: imageUrl,
        vendorName: user.name,
        vendorEmail: user.email,
      });

      toast.success("Ticket submitted for review!");
      reset();
      router.push("/dashboard/my-tickets");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not add ticket");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="font-display mb-6 text-2xl font-bold text-base-content">Add Ticket</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 rounded-2xl bg-base-100 p-6 shadow ring-1 ring-base-300"
      >
        <div>
          <label className="label font-display text-sm">Ticket Title</label>
          <input
            type="text"
            placeholder="e.g. Green Line Deluxe AC Coach"
            className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`}
            {...register("title", { required: "Title is required" })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label font-display text-sm">From</label>
            <input
              type="text"
              className={`input input-bordered w-full ${errors.from ? "input-error" : ""}`}
              {...register("from", { required: "Required" })}
            />
          </div>
          <div>
            <label className="label font-display text-sm">To</label>
            <input
              type="text"
              className={`input input-bordered w-full ${errors.to ? "input-error" : ""}`}
              {...register("to", { required: "Required" })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label font-display text-sm">Transport Type</label>
            <select
              className="select select-bordered w-full"
              {...register("transportType", { required: true })}
            >
              {TRANSPORT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label font-display text-sm">Departure Date & Time</label>
            <input
              type="datetime-local"
              className={`input input-bordered w-full ${errors.departureDateTime ? "input-error" : ""}`}
              {...register("departureDateTime", { required: "Required" })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label font-display text-sm">Price (per unit)</label>
            <input
              type="number"
              step="0.01"
              min={0}
              className={`input input-bordered w-full ${errors.price ? "input-error" : ""}`}
              {...register("price", { required: "Required", min: 0 })}
            />
          </div>
          <div>
            <label className="label font-display text-sm">Ticket Quantity</label>
            <input
              type="number"
              min={1}
              className={`input input-bordered w-full ${errors.quantity ? "input-error" : ""}`}
              {...register("quantity", { required: "Required", min: 1 })}
            />
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
                  className="checkbox checkbox-sm checkbox-primary"
                  {...register("perks")}
                />
                <span className="label-text text-sm">{perk}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="label font-display text-sm">Ticket Image</label>
          <input
            type="file"
            accept="image/*"
            className={`file-input file-input-bordered w-full ${errors.image ? "file-input-error" : ""}`}
            {...register("image", { required: "Image is required" })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label font-display text-sm">Vendor name</label>
            <input type="text" value={user?.name || ""} readOnly className="input input-bordered w-full bg-base-200" />
          </div>
          <div>
            <label className="label font-display text-sm">Vendor email</label>
            <input type="text" value={user?.email || ""} readOnly className="input input-bordered w-full bg-base-200" />
          </div>
        </div>

        <button type="submit" disabled={submitting} className="btn btn-primary w-full font-display">
          {submitting ? <span className="loading loading-spinner loading-sm" /> : "Add Ticket"}
        </button>
      </form>
    </div>
  );
};

const AddTicketPage = () => (
  <RoleRoute role="vendor">
    <AddTicketForm />
  </RoleRoute>
);

export default AddTicketPage;
