"use client";

import PrivateRoute from "../../components/PrivateRoute.jsx";
import DashboardChrome from "../../components/DashboardChrome.jsx";

export default function DashboardLayout({ children }) {
  return (
    <PrivateRoute>
      <DashboardChrome>{children}</DashboardChrome>
    </PrivateRoute>
  );
}
