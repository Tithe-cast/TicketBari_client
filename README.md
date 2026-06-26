# TicketBari — Client

> Next.js frontend for TicketBari — Bangladesh's online ticket booking platform for Bus, Train, Launch, and Plane travel.

## 🌐 Live URLs

| | URL |
|---|---|
| **Client (Live Site)** | https://ticket-bari-client-green.vercel.app |
| **Server (API)** | https://ticketbari-server-55dz.onrender.com |

## Tech Stack

- Next.js 14 (App Router, Client Components)
- React 18
- Tailwind CSS + DaisyUI
- Framer Motion
- TanStack React Query
- BetterAuth (React client)
- Stripe (`@stripe/react-stripe-js`)
- React Hook Form, react-hot-toast, react-icons, recharts, swiper, react-countdown

## 🎯 Purpose

TicketBari Client delivers a complete travel ticket booking experience. Travelers discover routes, view live departure countdowns, book seats, and pay securely via Stripe — all from one clean interface. Vendors manage their listings and track revenue. Admins control approvals and homepage advertising.

---

## ✨ Key Features

### 🏠 Home Page
- **Hero Banner Slider** — full-width animated slides built with Swiper.js and Framer Motion entrance animations
- **Advertisement Section** — exactly 6 admin-curated tickets displayed as boarding-pass stub cards
- **Latest Tickets Section** — 6–8 most recently approved tickets
- **Popular Routes** — staggered card grid linking directly into filtered search results
- **Why Choose Us** — four value-proposition cards with icon animations

### 🎫 All Tickets Page
- **Search** by From or To location
- **Filter** by transport type — Bus, Train, Launch, Plane
- **Sort** by price (Low to High / High to Low)
- **Pagination** — 9 tickets per page with numbered page controls
- All filters update the URL so results are shareable and bookmarkable

### 🎟️ Ticket Details Page *(Protected)*
- Full ticket details — image, route, transport type, price, quantity, perks, departure
- **Live countdown** to departure date and time
- **Book Now button** — disabled when departed or sold out
- **Booking modal** — enter quantity, see total price, submit request
- Quantity validation — cannot exceed available seats

### 👤 User Dashboard
- **My Profile** — avatar, name, email, role badge
- **My Booked Tickets** — 3-column grid with status badges (pending / accepted / rejected / paid), countdown timers, Pay Now button, and Cancel option
- **Transaction History** — table with Transaction ID, Ticket Title, Amount, and Payment Date
- **Stripe Payment** — card form powered by Stripe Elements; blocks payment after departure

### 🏪 Vendor Dashboard
- **Vendor Profile** — profile info and role badge
- **Add Ticket** — full form with imgbb image upload, perks checkboxes (AC, Breakfast, WiFi, etc.), departure datetime picker
- **My Added Tickets** — 3-column grid with verification status; Update and Delete buttons disabled on rejected tickets
- **Requested Bookings** — table with Accept / Reject actions per booking request
- **Revenue Overview** — stat cards (tickets added, sold, revenue) plus a monthly revenue bar chart

### 🛠️ Admin Dashboard
- **Admin Profile** — profile info and admin badge
- **Manage Tickets** — full ticket table with Approve / Reject per submission
- **Manage Users** — searchable user table; Make Admin, Make Vendor, and Mark as Fraud actions
- **Advertise Tickets** — toggle advertising per ticket; hard cap of 6 active at once

### 🎨 Design & UX
- **Boarding-pass card design** — every ticket card is styled as a literal stub with a perforated tear-line, dashed route-line motif, and a price stub
- **Dark / Light mode** toggle with smooth icon animation
- **Framer Motion** — page entrance animations, card hover lifts, staggered section reveals, modal transitions
- **Space Grotesk** (headings) · **Inter** (body) · **JetBrains Mono** (prices, times, IDs)
- Fully responsive — mobile, tablet, and desktop
- Loading spinners on all data fetches
- Custom **404 page** for invalid routes
- Private routes redirect to login and restore the intended destination after login

---

## 📦 npm Packages Used

| Package | Version | Purpose |
|---|---|---|
| `next` | 14.2.5 | React framework — App Router, file-based routing |
| `react` | ^18.3.1 | UI library |
| `better-auth` | ^1.2.7 | Auth client — email/password + Google OAuth |
| `@tanstack/react-query` | ^5.51.23 | Server state, caching, and data fetching |
| `axios` | ^1.7.4 | HTTP client with JWT interceptors |
| `framer-motion` | ^11.5.4 | Animations — entrance, hover, modal, icon transitions |
| `tailwindcss` | ^3.4.10 | Utility-first CSS framework |
| `daisyui` | ^4.12.10 | Tailwind component library with custom themes |
| `@stripe/react-stripe-js` | ^2.8.0 | Stripe Card Element and payment hooks |
| `@stripe/stripe-js` | ^4.4.0 | Stripe.js loader |
| `react-hook-form` | ^7.52.2 | Form state management and validation |
| `react-hot-toast` | ^2.4.1 | Toast notification system |
| `react-icons` | ^5.2.1 | Icon library (Feather, Font Awesome, Simple Icons) |
| `recharts` | ^2.12.7 | Vendor revenue bar chart |
| `swiper` | ^11.1.9 | Homepage hero banner slider |
| `react-countdown` | ^2.3.5 | Live departure countdown timer |

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in your real values

# 3. Start development server
npm run dev
```

Client runs on `http://localhost:3000`

---

## ⚙️ Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Express server URL (e.g. `http://localhost:5001`) |
| `NEXT_PUBLIC_IMGBB_API_KEY` | imgbb API key for ticket image uploads |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (`pk_test_...`) |

---

## 📁 Project Structure

```
src/
  app/
    layout.jsx                    # Root layout — fonts, providers, toaster
    not-found.jsx                 # Custom 404 page
    (main)/                       # Public site — Navbar + Footer chrome
      page.jsx                    # Home page
      all-tickets/page.jsx        # Search, filter, sort, paginate
      tickets/[id]/page.jsx       # Ticket details + booking modal
      login/page.jsx              # Email/password + Google login
      register/page.jsx           # Registration form
      about/page.jsx              # About page
      contact/page.jsx            # Contact page
    dashboard/                    # Private — sidebar + topbar chrome
      profile/page.jsx            # Shared profile (all roles)
      my-bookings/page.jsx        # User: booked tickets grid
      transactions/page.jsx       # User: Stripe transaction history
      add-ticket/page.jsx         # Vendor: add ticket form
      my-tickets/page.jsx         # Vendor: manage own tickets
      my-tickets/[id]/edit/       # Vendor: update ticket form
      requested-bookings/page.jsx # Vendor: accept/reject bookings
      revenue/page.jsx            # Vendor: revenue charts
      manage-tickets/page.jsx     # Admin: approve/reject all tickets
      manage-users/page.jsx       # Admin: role + fraud management
      advertise-tickets/page.jsx  # Admin: homepage ad slots
      payment/[bookingId]/        # Stripe checkout page
  components/
    Navbar.jsx                    # Sticky navbar with mobile menu
    Footer.jsx                    # 4-column footer with X logo
    TicketCard.jsx                # Boarding-pass stub card design
    DashboardSidebar.jsx          # Role-aware sidebar navigation
    DashboardChrome.jsx           # Dashboard drawer layout
    PrivateRoute.jsx              # Redirect to login if not authenticated
    RoleRoute.jsx                 # Redirect if wrong role
    Countdown.jsx                 # Live departure countdown
    ThemeToggle.jsx               # Dark/light mode toggle
    SectionTitle.jsx              # Animated section headings
    LoadingSpinner.jsx            # Loading state indicator
  contexts/
    AuthProvider.jsx              # BetterAuth session + JWT + role sync
    ThemeProvider.jsx             # DaisyUI theme state
    QueryProvider.jsx             # React Query client
  hooks/
    useAuth.js                    # Auth context shortcut
    useTheme.js                   # Theme context shortcut
    useAxiosPublic.js             # Unauthenticated axios instance
    useAxiosSecure.js             # JWT-attached axios with 401 logout
  lib/
    auth-client.js                # BetterAuth React client setup
    imgbb.js                      # imgbb image upload helper
```

