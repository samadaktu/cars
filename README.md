# David Golding Cars & Classic Auctions

A fully responsive, production-grade React.js website for David Golding Cars & Classic Auctions — Ireland's premier classic car dealership and auction platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The dev server runs at **http://localhost:5173**

## 🗂️ Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx        # Sticky nav with mobile menu
│   │   └── Footer.jsx        # Full footer with links
│   ├── ui/
│   │   └── index.jsx         # Shared UI components (cards, timers, etc.)
│   └── auction/
│       └── BidPanel.jsx      # Live bidding panel with real-time simulation
├── pages/
│   ├── Home.jsx              # Hero, auctions, cars, stats, testimonials
│   ├── AuctionHub.jsx        # Browse all auctions with filters
│   ├── AuctionDetail.jsx     # Individual auction + live bidding
│   ├── Cars.jsx              # Fixed-price car listings with filters
│   ├── CarDetail.jsx         # Individual car detail + contact panel
│   ├── SellWithUs.jsx        # Consignment / sell form
│   ├── HowToBid.jsx          # Guide + FAQ accordion + bid increment table
│   ├── SoldArchive.jsx       # Past sold vehicles
│   ├── About.jsx             # David's story
│   ├── Contact.jsx           # Contact form (validated)
│   ├── Register.jsx          # Registration with validation
│   ├── Login.jsx             # Login with demo access
│   └── Dashboard.jsx         # User dashboard (bids, watchlist, profile)
├── hooks/
│   └── useAuctionStore.js    # Zustand global state (auctions, auth, bids)
├── data/
│   └── listings.js           # All auction/car/sold data + FAQs
├── App.jsx                   # Routes + global timer
├── main.jsx                  # Entry point
└── index.css                 # Tailwind + custom CSS
```

## ✨ Key Features

- **Live Auction Bidding** — Real-time bid updates with simulated competing bidders
- **Anti-Snipe Protection** — Bids in last 2 mins extend auction by 2 mins
- **Bid Increment Enforcement** — Server-validated minimum increment tiers
- **Global Countdown Timers** — All auctions tick down simultaneously
- **Bid History Panel** — Live scrolling bid history per auction
- **Watchlist** — Add/remove auctions, persisted in Zustand store
- **Authentication** — Register/login with form validation (demo: any email/password)
- **User Dashboard** — Active bids, won auctions, watchlist, profile
- **Filter & Search** — Cars page with price, transmission, category filters
- **Contact Form** — Full validation + success state
- **Sell With Us Form** — Vehicle enquiry form with validation
- **Responsive** — Mobile-first, works on all screen sizes
- **Framer Motion** — Page transitions, card hovers, bid flash animations

## 🎨 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + Vite | Framework |
| React Router v6 | Routing |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Zustand | State management |
| react-hot-toast | Notifications |
| Lucide React | Icons |

## 🔐 Demo Login

Any email + any password will create a session. The demo user is:
- **Name:** John Murphy
- **Email:** any@email.com
- **Password:** anything

## 📱 Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/auction` | Auction Hub |
| `/auction/:id` | Live Bidding Page |
| `/cars` | Cars For Sale |
| `/cars/:id` | Car Detail |
| `/sell-with-us` | Sell With Us |
| `/how-to-bid` | How to Bid + FAQ |
| `/sold` | Sold Archive |
| `/about` | About David |
| `/contact` | Contact |
| `/register` | Register |
| `/login` | Login |
| `/dashboard` | User Dashboard |
