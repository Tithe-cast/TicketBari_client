"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaTicketAlt, FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth.js";

const Register = () => {
  const { registerUser, googleLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ name, email, password }) => {
    setSubmitting(true);
    const { error } = await registerUser(name, email, password);
    setSubmitting(false);

    if (error) {
      toast.error(error.message || "Could not create account");
      return;
    }

    toast.success("Account created!");
    router.push("/");
  };

  const handleGoogle = async () => {
    const { error } = await googleLogin();
    if (error) toast.error(error.message || "Google sign-in failed");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-base-200 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-base-100 p-8 shadow-xl ring-1 ring-base-300">
        <div className="mb-6 flex flex-col items-center">
          <FaTicketAlt className="mb-2 text-3xl text-primary" />
          <h1 className="font-display text-2xl font-bold text-base-content">Create your account</h1>
          <p className="mt-1 text-sm text-base-content/60">Start booking in under a minute</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label font-display text-sm">Full name</label>
            <input
              type="text"
              placeholder="Jane Doe"
              className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="mt-1 text-xs text-error">{errors.name.message}</p>}
          </div>

          <div>
            <label className="label font-display text-sm">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
          </div>

          <div>
            <label className="label font-display text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                className={`input input-bordered w-full pr-10 ${errors.password ? "input-error" : ""}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Use at least 6 characters" },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute inset-y-0 right-3 flex items-center text-base-content/50"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={submitting} className="btn btn-primary w-full font-display">
            {submitting ? <span className="loading loading-spinner loading-sm" /> : "Create account"}
          </button>
        </form>

        <div className="divider text-xs text-base-content/40">OR</div>

        <button onClick={handleGoogle} className="btn btn-outline w-full gap-2 font-display">
          <FaGoogle /> Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-base-content/70">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
