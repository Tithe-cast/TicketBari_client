"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import useAuth from "../../../hooks/useAuth.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";

const roleLabel = { user: "User Profile", vendor: "Vendor Profile", admin: "Admin Profile" };
const roleBadgeClass = { user: "badge-info", vendor: "badge-secondary", admin: "badge-primary" };

const Profile = () => {
  const { user, role } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => (await axiosSecure.get(`/users/${user.email}`)).data,
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="font-display mb-6 text-2xl font-bold text-base-content">
        {roleLabel[role] || "My Profile"}
      </h2>
<div className="rounded-2xl bg-base-100 p-8 text-center shadow ring-1 ring-base-300">
        <div className="avatar mx-auto">

<div className="relative h-24 w-24 overflow-hidden rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
  <img
    src={user?.image || `https://ui-avatars.com/api/?name=${user?.name}&background=F2A93B&color=0F1B3D&size=96`}
    alt={dbUser?.name || "User"}
    className="h-full w-full object-cover"
    referrerPolicy="no-referrer"
  />
</div>
   </div>   
        

        <h3 className="font-display mt-4 text-xl font-semibold text-base-content">{dbUser?.name}</h3>
        <p className="text-sm text-base-content/60">{dbUser?.email}</p>

        <span className={`badge mt-3 font-ticket capitalize ${roleBadgeClass[role] || ""}`}>{role}</span>

        {dbUser?.fraud && (
          <p className="mt-4 rounded-lg bg-error/10 px-3 py-2 text-xs text-error">
            Your vendor account has been flagged. Listings are hidden until this is resolved.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
