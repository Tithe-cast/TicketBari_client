import { FiMail, FiPhone } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";

const Contact = () => (
  <div className="mx-auto max-w-3xl px-4 py-16">
    <h1 className="font-display text-3xl font-bold text-base-content">Contact Us</h1>
    <p className="mt-4 text-base-content/70">
      Questions about a booking, a vendor listing, or anything else? Reach us through any of the
      channels below.
    </p>
    <ul className="mt-6 space-y-3 text-base-content/80">
      <li className="flex items-center gap-3"><FiMail /> support@ticketbari.com</li>
      <li className="flex items-center gap-3"><FiPhone /> +880 1234-567890</li>
      <li className="flex items-center gap-3"><FaFacebook /> facebook.com/ticketbari</li>
    </ul>
  </div>
);

export default Contact;
