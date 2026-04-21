import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import AuctionHub from './pages/AuctionHub'
import AuctionDetail from './pages/AuctionDetail'
import Cars from './pages/Cars'
import CarDetail from './pages/CarDetail'
import SellWithUs from './pages/SellWithUs'
import HowToBid from './pages/HowToBid'
import SoldArchive from './pages/SoldArchive'
import About from './pages/About'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import useAuctionStore from './hooks/useAuctionStore'

// Pages that should not show the footer
const NO_FOOTER = ['/login', '/register']

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const tick = useAuctionStore(s => s.tick)
  const { pathname } = useLocation()

  // Global 1-second timer for all auction countdowns
  useEffect(() => {
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [tick])

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1C1C1C',
            color: '#F5F5F5',
            border: '1px solid #2A2A2A',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.8rem',
          },
          success: { iconTheme: { primary: '#2ECC71', secondary: '#1C1C1C' } },
          error:   { iconTheme: { primary: '#E74C3C', secondary: '#1C1C1C' } },
        }}
      />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"                 element={<Home />} />
          <Route path="/auction"          element={<AuctionHub />} />
          <Route path="/auction/:id"      element={<AuctionDetail />} />
          <Route path="/cars"             element={<Cars />} />
          <Route path="/cars/:id"         element={<CarDetail />} />
          <Route path="/sell-with-us"     element={<SellWithUs />} />
          <Route path="/how-to-bid"       element={<HowToBid />} />
          <Route path="/sold"             element={<SoldArchive />} />
          <Route path="/about"            element={<About />} />
          <Route path="/contact"          element={<Contact />} />
          <Route path="/register"         element={<Register />} />
          <Route path="/login"            element={<Login />} />
          <Route path="/dashboard"        element={<Dashboard />} />
        </Routes>
      </main>
      {!NO_FOOTER.includes(pathname) && <Footer />}
    </>
  )
}
