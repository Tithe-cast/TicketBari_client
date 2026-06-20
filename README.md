# TicketBari — Client

Next.js (App Router) frontend for **TicketBari**. Client Components + React Query for data fetching, Tailwind CSS + DaisyUI for styling, Framer Motion for animation, BetterAuth for session/auth, Stripe Elements for payments.

## Tech Stack

- Next.js 14 (App Router, Client Components)
- React 18
- Tailwind CSS + DaisyUI
- Framer Motion
- TanStack React Query
- BetterAuth (React client)
- Stripe (`@stripe/react-stripe-js`)
- React Hook Form, react-hot-toast, react-icons, recharts, swiper, react-countdown

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in your real values
npm run dev
```

Runs on `http://localhost:3000`. Make sure the **server** is running on `http://localhost:5000` (or update `NEXT_PUBLIC_API_URL`).

## Environment Variables

See `.env.example`:

- `NEXT_PUBLIC_API_URL` — your Express server URL
- `NEXT_PUBLIC_IMGBB_API_KEY` — for the Add Ticket image upload
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — for the Stripe payment form

## Project Structure

```
src/
  app/
    layout.jsx              # fonts, providers (theme, query, auth), toaster
    (main)/                 # public site — Navbar + Footer chrome
      page.jsx              # Home
      all-tickets/          # search/filter/sort/pagination
      tickets/[id]/         # protected ticket details + booking modal
      login/, register/
      about/, contact/
    dashboard/               # private — sidebar + topbar chrome
      profile/               # shared across all 3 roles
      my-bookings/, transactions/            # User
      add-ticket/, my-tickets/, requested-bookings/, revenue/   # Vendor
      manage-tickets/, manage-users/, advertise-tickets/        # Admin
      payment/[bookingId]/   # Stripe checkout
  components/                # Navbar, Footer, TicketCard, route guards, etc.
  contexts/                  # AuthProvider, ThemeProvider, QueryProvider
  hooks/                     # useAuth, useTheme, useAxiosPublic, useAxiosSecure
  lib/                       # auth-client.js (BetterAuth), imgbb.js
```

## Design System

"TicketBari" renders every ticket as a literal boarding-pass stub (see `TicketCard.jsx`): image + details on one side, a perforated tear-line, then a stub with price and a "Details" action. The dashed `.route-line` motif (`From ⋯⋯⋯ To`) repeats across the hero, cards, and ticket details page. Type: Space Grotesk (headings), Inter (body), JetBrains Mono (prices, times, ticket IDs). Palette lives in `tailwind.config.js` under the `ticketbari` / `ticketbariDark` DaisyUI themes.

## Notes on Route Guards

- `PrivateRoute` — redirects to `/login?from=...` if not authenticated.
- `RoleRoute` — same, plus redirects to `/dashboard/profile` if the role doesn't match.
- Both live in `src/components/` and wrap page content directly (Next.js layouts can't easily read auth state synchronously, so guarding happens at the page/layout component level instead).

## Deployment Notes (Vercel)

- Add all three `NEXT_PUBLIC_*` variables in the Vercel project settings.
- Set `NEXT_PUBLIC_API_URL` to your deployed server URL.
- On the server, set `CLIENT_URL` to your deployed Vercel URL so CORS and BetterAuth's `trustedOrigins` accept it.
- `next.config.mjs` whitelists the image hostnames used for tickets/avatars (imgbb, Unsplash placeholders, Google avatars). Add any other host you use for ticket images.
