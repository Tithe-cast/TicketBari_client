import Link from "next/link";
import { FaTicketAlt } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base-100 px-4 text-center">
      <FaTicketAlt className="mb-4 text-6xl text-primary" />
      <p className="font-ticket text-sm uppercase tracking-[0.3em] text-base-content/50">
        Ticket not found
      </p>
      <h1 className="font-display mt-2 text-5xl font-bold text-base-content">404</h1>
      <p className="mt-4 max-w-md text-base-content/70">
        This route doesn't exist — the page may have moved, or the link was mistyped.
      </p>
      <Link href="/" className="btn btn-primary mt-6 font-display">
        Back to home
      </Link>
    </div>
  );
}
