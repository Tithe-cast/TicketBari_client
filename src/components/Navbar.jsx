"use client";

import { useState } from "react";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import { FaTicketAlt } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth.js";
import ThemeToggle from "./ThemeToggle.jsx";

const navLinkClass = (active) =>
  `font-display text-sm font-medium transition ${
    active ? "text-primary" : "text-base-content/80 hover:text-primary"
  }`;

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = async () => {
    await logOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const links = (
    <>
      <li>
        <Link href="/" className={navLinkClass(pathname === "/")}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/all-tickets" className={navLinkClass(pathname === "/all-tickets")}>
          All Tickets
        </Link>
      </li>
      {user && (
        <li>
          <Link href="/dashboard/profile" className={navLinkClass(pathname.startsWith("/dashboard"))}>
            Dashboard
          </Link>
        </li>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <nav className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start">
          <button
            className="btn btn-ghost btn-circle lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <Link href="/" className="ml-1 flex items-center gap-2">
            <FaTicketAlt className="text-primary" size={24} />
            <span className="font-display text-xl font-bold text-base-content">TicketBari</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-6">{links}</ul>
        </div>

        <div className="navbar-end gap-2">
          <ThemeToggle />

          {!user ? (
            <Link href="/login" className="btn btn-primary btn-sm font-display">
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost flex items-center gap-2 px-2">
                <div className="avatar">
                  <div className="w-8 rounded-full ring ring-primary ring-offset-1">
                    <img
                        src={user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=F2A93B&color=0F1B3D&size=32`}
  alt={user?.name || "User"}
                          width={32}
                          height={32}
                          className="rounded-full"
                          referrerPolicy="no-referrer"
                         />
                  </div>
                </div>
                <span className="hidden font-display text-sm md:inline">{user.name}</span>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-50 mt-3 w-44 rounded-box bg-base-100 p-2 shadow-lg ring-1 ring-base-300"
              >
                <li>
                  <Link href="/dashboard/profile">My Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {mobileOpen && (
        <ul className="flex flex-col gap-3 border-t border-base-300 px-6 py-4 lg:hidden">{links}</ul>
      )}
    </header>
  );
};

export default Navbar;
