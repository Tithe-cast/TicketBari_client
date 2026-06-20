import Link from "next/link";
import { FaTicketAlt, FaFacebook } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import { SiVisa, SiMastercard } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-neutral text-neutral-content">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <FaTicketAlt className="text-primary" size={22} />
            <span className="font-display text-lg font-bold">TicketBari</span>
          </div>
          <p className="mt-3 text-sm text-neutral-content/70">
            Book bus, train, launch & flight tickets easily.
          </p>
        </div>

        <div>
          <h4 className="font-display mb-3 text-sm font-semibold uppercase tracking-wide">Quick Links</h4>
          <ul className="space-y-2 text-sm text-neutral-content/70">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/all-tickets" className="hover:text-primary">All Tickets</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
            <li><Link href="/about" className="hover:text-primary">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display mb-3 text-sm font-semibold uppercase tracking-wide">Contact Info</h4>
          <ul className="space-y-2 text-sm text-neutral-content/70">
            <li className="flex items-center gap-2"><FiMail /> support@ticketbari.com</li>
            <li className="flex items-center gap-2"><FiPhone /> +880 1234-567890</li>
            <li className="flex items-center gap-2"><FaFacebook /> facebook.com/ticketbari</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display mb-3 text-sm font-semibold uppercase tracking-wide">Payment Methods</h4>
          <div className="flex items-center gap-3 text-2xl text-neutral-content/70">
            <SiVisa />
            <SiMastercard />
            <span className="font-display text-sm font-semibold text-primary">stripe</span>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300/30 py-4 text-center text-xs text-neutral-content/60">
        © 2025 TicketBari. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
