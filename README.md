# TicketBari — Client

Next.js (App Router) frontend for **TicketBari**. Client Components + React Query for data fetching, Tailwind CSS + DaisyUI for styling, Framer Motion for animation, BetterAuth for session/auth, Stripe Elements for payments.
## Live link:https://ticket-bari-client-green.vercel.app/
## Tech Stack

- Next.js 14 (App Router, Client Components)
- React 18
- Tailwind CSS + DaisyUI
- Framer Motion
- TanStack React Query
- BetterAuth (React client)
- Stripe (`@stripe/react-stripe-js`)
- React Hook Form, react-hot-toast, react-icons, recharts, swiper, react-countdown


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


