"use client";

import { FiMenu } from "react-icons/fi";
import DashboardSidebar from "./DashboardSidebar.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import useAuth from "../hooks/useAuth.js";

const DashboardChrome = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <div className="navbar sticky top-0 z-30 border-b border-base-300 bg-base-100 px-4 lg:px-8">
          <div className="flex-1">
            <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-circle lg:hidden">
              <FiMenu size={20} />
            </label>
            <h1 className="font-display ml-2 text-lg font-semibold capitalize">
              {user?.name ? `Welcome, ${user.name.split(" ")[0]}` : "Dashboard"}
            </h1>
          </div>
          <ThemeToggle />
        </div>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>

      <div className="drawer-side z-40">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay" />
        <div className="min-h-full w-64 border-r border-base-300 bg-base-100">
          <DashboardSidebar />
        </div>
      </div>
    </div>
  );
};

export default DashboardChrome;
