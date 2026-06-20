"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiUser, FiBookmark, FiCreditCard, FiPlusSquare, FiList, FiInbox,
  FiBarChart2, FiCheckSquare, FiUsers, FiTrendingUp, FiHome,
} from "react-icons/fi";
import { FaTicketAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth.js";

const userLinks = [
  { href: "/dashboard/profile", label: "My Profile", icon: <FiUser /> },
  { href: "/dashboard/my-bookings", label: "My Booked Tickets", icon: <FiBookmark /> },
  { href: "/dashboard/transactions", label: "Transaction History", icon: <FiCreditCard /> },
];

const vendorLinks = [
  { href: "/dashboard/profile", label: "Vendor Profile", icon: <FiUser /> },
  { href: "/dashboard/add-ticket", label: "Add Ticket", icon: <FiPlusSquare /> },
  { href: "/dashboard/my-tickets", label: "My Added Tickets", icon: <FiList /> },
  { href: "/dashboard/requested-bookings", label: "Requested Bookings", icon: <FiInbox /> },
  { href: "/dashboard/revenue", label: "Revenue Overview", icon: <FiBarChart2 /> },
];

const adminLinks = [
  { href: "/dashboard/profile", label: "Admin Profile", icon: <FiUser /> },
  { href: "/dashboard/manage-tickets", label: "Manage Tickets", icon: <FiCheckSquare /> },
  { href: "/dashboard/manage-users", label: "Manage Users", icon: <FiUsers /> },
  { href: "/dashboard/advertise-tickets", label: "Advertise Tickets", icon: <FiTrendingUp /> },
];

const DashboardSidebar = () => {
  const { role } = useAuth();
  const pathname = usePathname();
  const links = role === "admin" ? adminLinks : role === "vendor" ? vendorLinks : userLinks;

  return (
    <aside className="flex h-full w-full flex-col gap-1 bg-base-100 p-4">
      <Link href="/" className="mb-6 flex items-center gap-2 px-2">
        <FaTicketAlt className="text-primary" size={22} />
        <span className="font-display text-lg font-bold">TicketBari</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                active ? "bg-primary text-primary-content" : "text-base-content/80 hover:bg-base-200"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/"
        className="mt-4 flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-base-content/60 hover:bg-base-200"
      >
        <FiHome /> Back to site
      </Link>
    </aside>
  );
};

export default DashboardSidebar;
