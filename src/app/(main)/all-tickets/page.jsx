"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";
import useAxiosPublic from "../../../hooks/useAxiosPublic.js";
import TicketCard from "../../../components/TicketCard.jsx";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";
import SectionTitle from "../../../components/SectionTitle.jsx";

const TRANSPORT_TYPES = ["all", "Bus", "Train", "Launch", "Plane"];
const LIMIT = 9;

const AllTicketsContent = () => {
  const axiosPublic = useAxiosPublic();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const transportType = searchParams.get("transportType") || "all";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page") || 0);
  const search = searchParams.get("search") || "";

  const { data, isLoading } = useQuery({
    queryKey: ["tickets", { search, transportType, sort, page }],
    queryFn: async () => {
      const res = await axiosPublic.get("/tickets", {
        params: { search, transportType, sort, page, limit: LIMIT },
      });
      return res.data;
    },
  });

  const tickets = data?.tickets || [];
  const total = data?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value === "" || value === "all") next.delete(key);
    else next.set(key, value);
    next.delete("page");
    router.push(`${pathname}?${next.toString()}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParam("search", searchInput.trim());
  };

  const goToPage = (p) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("page", p);
    router.push(`${pathname}?${next.toString()}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionTitle
        eyebrow="Browse"
        title="All Tickets"
        subtitle="Search a route, filter by transport, and sort by price to find the right fit."
      />

      <div className="mb-8 flex flex-col gap-3 rounded-xl bg-base-200 p-4 md:flex-row md:items-center">
        <form onSubmit={handleSearchSubmit} className="flex flex-1 gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by 'From' or 'To' (e.g. Sylhet)"
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary" aria-label="Search">
            <FiSearch />
          </button>
        </form>

        <select
          value={transportType}
          onChange={(e) => updateParam("transportType", e.target.value)}
          className="select select-bordered"
        >
          {TRANSPORT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All transport types" : t}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="select select-bordered"
        >
          <option value="">Sort by price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {isLoading ? (
        <LoadingSpinner fullScreen={false} />
      ) : tickets.length === 0 ? (
        <p className="py-16 text-center text-base-content/60">
          No tickets match your search. Try a different route or filter.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} variant="full" />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`btn btn-sm font-ticket ${page === i ? "btn-primary" : "btn-ghost"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const AllTicketsPage = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <AllTicketsContent />
  </Suspense>
);

export default AllTicketsPage;
