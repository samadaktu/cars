import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Gavel, Trophy, Heart, Clock, User, LogOut, ChevronRight, AlertTriangle, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuctionStore from '../hooks/useAuctionStore'
import { CountdownTimer, AuctionCard } from '../components/ui'

const TABS = [
  { id: 'bids',     label: 'Active Bids',    Icon: Gavel },
  { id: 'won',      label: 'Won Auctions',   Icon: Trophy },
  { id: 'watchlist',label: 'Watchlist',      Icon: Heart },
  { id: 'profile',  label: 'Profile',        Icon: User },
]

export default function Dashboard() {
  const navigate   = useNavigate()
  const isLoggedIn = useAuctionStore(s => s.isLoggedIn)
  const user       = useAuctionStore(s => s.user)
  const logout     = useAuctionStore(s => s.logout)
  const auctions   = useAuctionStore(s => s.auctions)
  const watchlist  = useAuctionStore(s => s.watchlist)
  const [tab, setTab] = useState('bids')

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="font-serif text-2xl mb-3">Sign In Required</h2>
          <p className="text-muted text-sm mb-6">Please sign in to access your dashboard.</p>
          <Link to="/login" className="btn-gold">Sign In</Link>
        </div>
      </div>
    )
  }

  // Mock: first 2 auctions the user is bidding on
  const activeBids = auctions.slice(0, 2).map((a, i) => ({
    ...a,
    userBid: a.currentBid - (i === 0 ? 0 : 500),
    isHighest: i === 0,
  }))
  const wonAuctions = []
  const watchedAuctions = auctions.filter(a => watchlist.includes(a.id))

  const handleLogout = () => {
    logout()
    toast('Signed out successfully')
    navigate('/')
  }

  return (
    <div className="page-enter min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">

          {/* Sidebar */}
          <div>
            <div className="bg-card border border-border rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold font-bold text-lg flex-shrink-0">
                  {user?.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm">{user?.name}</div>
                  <div className="text-muted text-xs">{user?.email}</div>
                </div>
              </div>
              <nav className="space-y-1">
                {TABS.map(({ id, label, Icon }) => (
                  <button key={id} onClick={() => setTab(id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                      tab === id ? 'bg-gold/10 text-gold' : 'text-muted hover:bg-white/[0.03] hover:text-cream'
                    }`}>
                    <Icon size={15} />
                    {label}
                    {id === 'bids' && activeBids.length > 0 &&
                      <span className="ml-auto bg-gold/20 text-gold text-[10px] font-bold rounded-full px-2 py-0.5">{activeBids.length}</span>}
                    {id === 'watchlist' && watchedAuctions.length > 0 &&
                      <span className="ml-auto bg-gold/20 text-gold text-[10px] font-bold rounded-full px-2 py-0.5">{watchedAuctions.length}</span>}
                  </button>
                ))}
              </nav>
              <div className="border-t border-border mt-4 pt-4">
                <button onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
              {[
                { l: 'Active Bids', v: activeBids.length, c: 'text-gold' },
                { l: 'Auctions Won', v: wonAuctions.length, c: 'text-green-400' },
                { l: 'Watchlist', v: watchedAuctions.length, c: 'text-blue-400' },
              ].map(s => (
                <div key={s.l} className="flex justify-between items-center">
                  <span className="text-muted text-xs">{s.l}</span>
                  <span className={`font-bold text-sm ${s.c}`}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div>
            {/* Active Bids */}
            {tab === 'bids' && (
              <div>
                <h2 className="font-serif text-2xl font-bold mb-6">My Active <em>Bids</em></h2>
                {activeBids.length === 0 ? (
                  <EmptyState icon="🔨" title="No active bids" desc="Browse live auctions to start bidding" cta={{ to: '/auction', label: 'Browse Auctions' }} />
                ) : (
                  <div className="space-y-4">
                    {activeBids.map(bid => (
                      <motion.div key={bid.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border rounded-2xl p-5">
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="w-16 h-12 bg-card2 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{bid.emoji}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-serif font-semibold text-base truncate">{bid.title}</div>
                            <div className="text-muted text-xs mt-0.5">Lot #{bid.lotNumber}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-serif text-xl font-bold text-gold">€{bid.currentBid.toLocaleString()}</div>
                            <div className="text-muted text-[10px]">Current bid</div>
                          </div>
                          <div className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                            bid.isHighest
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {bid.isHighest
                              ? <><CheckCircle2 size={12} /> Highest Bidder</>
                              : <><AlertTriangle size={12} /> Outbid!</>}
                          </div>
                          <div className="text-right min-w-[80px]">
                            <div className="text-[10px] text-muted mb-0.5">Time left</div>
                            <CountdownTimer seconds={bid.timeRemaining} className="text-sm font-bold" />
                          </div>
                          <button onClick={() => navigate(`/auction/${bid.id}`)}
                            className={`text-xs font-bold px-4 py-2 rounded-xl transition-colors ${
                              bid.isHighest
                                ? 'bg-card2 border border-border text-muted hover:text-gold hover:border-gold/40'
                                : 'bg-gold text-black hover:bg-gold2'
                            }`}>
                            {bid.isHighest ? 'View Lot' : 'Re-Bid Now'} →
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Won Auctions */}
            {tab === 'won' && (
              <div>
                <h2 className="font-serif text-2xl font-bold mb-6">Won <em>Auctions</em></h2>
                <EmptyState icon="🏆" title="No auctions won yet" desc="Keep bidding — your dream car is waiting!" cta={{ to: '/auction', label: 'Browse Auctions' }} />
              </div>
            )}

            {/* Watchlist */}
            {tab === 'watchlist' && (
              <div>
                <h2 className="font-serif text-2xl font-bold mb-6">My <em>Watchlist</em></h2>
                {watchedAuctions.length === 0 ? (
                  <EmptyState icon="🤍" title="Watchlist is empty" desc="Add auctions to your watchlist to track them here" cta={{ to: '/auction', label: 'Browse Auctions' }} />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {watchedAuctions.map(a => (
                      <AuctionCard key={a.id} auction={a} onClick={() => navigate(`/auction/${a.id}`)} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile */}
            {tab === 'profile' && (
              <div>
                <h2 className="font-serif text-2xl font-bold mb-6">Profile <em>Settings</em></h2>
                <div className="bg-card border border-border rounded-2xl p-7 mb-5">
                  <h3 className="font-serif text-lg font-semibold mb-5">Personal Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { label: 'Full Name', val: user?.name },
                      { label: 'Email Address', val: user?.email },
                      { label: 'Phone Number', val: '087 xxx xxxx' },
                      { label: 'Member Since', val: 'April 2025' },
                    ].map(({ label, val }) => (
                      <div key={label}>
                        <label className="label-gold">{label}</label>
                        <div className="input-dark text-cream">{val || '—'}</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => toast.success('Profile updated!')} className="btn-gold mt-6 text-xs">Save Changes</button>
                </div>
                <div className="bg-card border border-border rounded-2xl p-7">
                  <h3 className="font-serif text-lg font-semibold mb-3">Payment Card</h3>
                  <p className="text-muted text-sm mb-5">A €1 refundable hold is placed when you register a card. This is automatically released after 7 days.</p>
                  <button onClick={() => toast('Stripe card management would open here', { icon: '💳' })}
                    className="btn-outline-gold text-xs">Manage Payment Card</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ icon, title, desc, cta }) {
  return (
    <div className="text-center py-20 bg-card border border-border rounded-2xl">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-serif text-xl text-cream mb-2">{title}</h3>
      <p className="text-muted text-sm mb-6">{desc}</p>
      {cta && <Link to={cta.to} className="btn-gold text-xs">{cta.label}</Link>}
    </div>
  )
}
