"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "../hooks/useAuth.js";
import LoadingSpinner from "./LoadingSpinner.jsx";

const RoleRoute = ({ role: requiredRole, children }) => {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    } else if (role !== requiredRole) {
      router.replace("/dashboard/profile");
    }
  }, [loading, user, role, requiredRole, pathname, router]);

  if (loading || !user || role !== requiredRole) return <LoadingSpinner />;

  return children;
};

export default RoleRoute;
