import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut } from 'lucide-react'
import useAuctionStore from '../../hooks/useAuctionStore'

const NAV_LINKS = [
  { label: 'Buy a Car',     path: '/cars' },
  { label: 'Live Auctions', path: '/auction' },
  { label: 'Sell With Us', path: '/sell-with-us' },
  { label: 'How to Bid',   path: '/how-to-bid' },
  { label: 'About',        path: '/about' },
  { label: 'Contact',      path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [userMenu, setUserMenu]   = useState(false)
  const { pathname }              = useLocation()
  const navigate                  = useNavigate()
  const isLoggedIn                = useAuctionStore(s => s.isLoggedIn)
  const user                      = useAuctionStore(s => s.user)
  const logout                    = useAuctionStore(s => s.logout)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); setUserMenu(false) }, [pathname])

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled || menuOpen ? 'bg-black/95 backdrop-blur-xl border-b border-border' : ''
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <LogoIcon />
          <div className="leading-tight">
            <div className="font-serif text-gold text-base tracking-wide">David Golding</div>
            <div className="text-muted text-[9px] tracking-[0.18em] uppercase font-sans font-medium">Classic Auctions</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors duration-200 ${
                pathname === link.path ? 'text-gold' : 'text-muted hover:text-cream'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserMenu(v => !v)}
                className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-xs font-semibold hover:border-gold/40 transition-colors"
              >
                <span className="w-6 h-6 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold text-[10px] font-bold">
                  {user?.initials}
                </span>
                {user?.name?.split(' ')[0]}
              </button>
              <AnimatePresence>
                {userMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl overflow-hidden"
                  >
                    <Link to="/dashboard" className="flex items-center gap-2 px-4 py-3 text-xs font-medium hover:bg-white/5 transition-colors">
                      <User size={14} className="text-gold" /> My Dashboard
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-xs font-medium hover:bg-white/5 transition-colors text-red-400">
                      <LogOut size={14} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-outline-gold text-[11px] px-5 py-2">Login</Link>
              <Link to="/register" className="btn-gold text-[11px] px-5 py-2">Register</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden p-2 text-cream"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-black backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, ease: [0.32, 0.72, 0, 1] }}
              >
                <Link
                  to={link.path}
                  className="font-serif text-3xl text-cream hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.06 }}
              className="flex flex-col items-center gap-3 mt-4"
            >
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="btn-gold">My Dashboard</Link>
                  <button onClick={handleLogout} className="text-red-400 text-sm font-semibold">Sign Out</button>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn-gold">Register to Bid</Link>
                  <Link to="/login" className="text-muted text-sm font-semibold hover:text-gold transition-colors">Sign In</Link>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function LogoIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="16" stroke="#C9A84C" strokeWidth="1.5"/>
      <circle cx="18" cy="18" r="8" stroke="#C9A84C" strokeWidth="1" strokeDasharray="2 3"/>
      <line x1="18" y1="2" x2="18" y2="8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18" y1="28" x2="18" y2="34" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="2" y1="18" x2="8" y2="18" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="28" y1="18" x2="34" y2="18" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="18" r="2.5" fill="#C9A84C"/>
    </svg>
  )
}
