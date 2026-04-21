import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Share2, Info, AlertTriangle, CheckCircle2, Zap } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuctionStore from '../../hooks/useAuctionStore'
import { CountdownTimer } from '../ui'

export default function BidPanel({ auctionId }) {
  const navigate          = useNavigate()
  const auction           = useAuctionStore(s => s.auctions.find(a => a.id === auctionId))
  const placeBid          = useAuctionStore(s => s.placeBid)
  const simulateBid       = useAuctionStore(s => s.simulateBid)
  const toggleWatchlist   = useAuctionStore(s => s.toggleWatchlist)
  const watchlist         = useAuctionStore(s => s.watchlist)
  const isLoggedIn        = useAuctionStore(s => s.isLoggedIn)
  const getIncrement      = useAuctionStore(s => s.getIncrement)

  const [bidAmount,    setBidAmount]    = useState('')
  const [showModal,    setShowModal]    = useState(false)
  const [confirming,   setConfirming]   = useState(false)
  const [newBidFlash,  setNewBidFlash]  = useState(false)
  const prevBid = useRef(auction?.currentBid)
  const simTimerRef = useRef(null)

  // Flash animation when bid changes
  useEffect(() => {
    if (!auction) return
    if (auction.currentBid !== prevBid.current) {
      setNewBidFlash(true)
      setTimeout(() => setNewBidFlash(false), 800)
      prevBid.current = auction.currentBid
    }
  }, [auction?.currentBid])

  // Set default bid amount
  useEffect(() => {
    if (!auction) return
    const next = auction.currentBid + getIncrement(auction.currentBid)
    setBidAmount(next)
  }, [auction?.currentBid])

  // Simulate other bidders
  useEffect(() => {
    const randomDelay = () => Math.floor(Math.random() * 18000) + 7000
    const schedule = () => {
      simTimerRef.current = setTimeout(() => {
        const newBid = simulateBid(auctionId)
        if (newBid) {
          toast.error(`⚡ New bid: €${newBid.toLocaleString()} — You've been outbid!`, { duration: 4000 })
        }
        schedule()
      }, randomDelay())
    }
    schedule()
    return () => clearTimeout(simTimerRef.current)
  }, [auctionId])

  if (!auction) return null

  const minBid    = auction.currentBid + getIncrement(auction.currentBid)
  const inWatchlist = watchlist.includes(auctionId)

  const handlePlaceBid = () => {
    if (!isLoggedIn) {
      toast.error('Please sign in to place a bid')
      navigate('/login')
      return
    }
    if (parseInt(bidAmount) < minBid) {
      toast.error(`Minimum bid is €${minBid.toLocaleString()}`)
      return
    }
    setShowModal(true)
  }

  const handleConfirm = async () => {
    setConfirming(true)
    await new Promise(r => setTimeout(r, 600))
    const result = placeBid(auctionId, parseInt(bidAmount))
    setConfirming(false)
    setShowModal(false)
    if (result.success) {
      toast.success(`🎉 Bid placed! You're the highest bidder at €${parseInt(bidAmount).toLocaleString()}`)
    } else {
      toast.error(result.message)
    }
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  const endDate = new Date(Date.now() + auction.timeRemaining * 1000).toLocaleString('en-IE', {
    weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  })

  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-5 sticky top-24 relative overflow-hidden">
        {/* Gold top bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold via-gold/50 to-transparent rounded-t-2xl" />

        {/* Current bid */}
        <motion.div
          animate={{ backgroundColor: newBidFlash ? 'rgba(201,168,76,0.12)' : 'rgba(201,168,76,0.04)' }}
          transition={{ duration: 0.3 }}
          className="border border-gold/15 rounded-xl p-4 mb-4 text-center"
        >
          <div className="text-[10px] text-muted font-semibold tracking-widest uppercase mb-1">Current Bid</div>
          <motion.div
            key={auction.currentBid}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="font-serif text-4xl font-bold text-gold"
          >
            €{auction.currentBid.toLocaleString()}
          </motion.div>
          <div className="text-muted text-xs mt-1">{auction.bids} bids placed</div>
        </motion.div>

        {/* Meta row */}
        <div className="flex justify-between text-xs bg-card2 rounded-lg px-3 py-2.5 mb-4">
          <div>
            <div className="text-muted text-[10px] font-semibold tracking-wider uppercase mb-0.5">Ends</div>
            <div className="text-cream font-semibold text-[11px]">{endDate}</div>
          </div>
          <div className="text-right">
            <div className="text-muted text-[10px] font-semibold tracking-wider uppercase mb-0.5">Lot No.</div>
            <div className="text-cream font-semibold text-[11px]">#{auction.lotNumber}</div>
          </div>
        </div>

        {/* Countdown */}
        <div
          className={`flex items-center justify-center rounded-xl py-3 mb-4 border ${
            auction.timeRemaining < 600
              ? 'bg-red-500/5 border-red-500/20'
              : auction.timeRemaining < 3600
              ? 'bg-orange-500/5 border-orange-500/20'
              : 'bg-green-500/5 border-green-500/20'
          }`}
        >
          <CountdownTimer seconds={auction.timeRemaining} className="text-2xl" />
        </div>

        {/* Anti-snipe notice */}
        <div className="flex gap-2 items-start bg-white/[0.03] border border-white/[0.05] rounded-lg p-3 mb-4">
          <Zap size={13} className="text-gold flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-muted leading-relaxed">
            <strong className="text-cream">Anti-Snipe Active:</strong> Bids in the last 2 minutes extend the auction by 2 minutes.
          </p>
        </div>

        {/* Reserve status */}
        <div className={`flex items-center justify-center gap-2 rounded-lg py-2 mb-4 text-xs font-semibold ${
          auction.reserveMet
            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
            : 'bg-orange-500/10 border border-orange-500/20 text-orange-400'
        }`}>
          {auction.reserveMet
            ? <><CheckCircle2 size={13} /> Reserve Met</>
            : <><AlertTriangle size={13} /> Reserve Not Yet Met</>
          }
        </div>

        {/* Bid input */}
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold font-semibold text-sm">€</span>
            <input
              type="number"
              value={bidAmount}
              onChange={e => setBidAmount(e.target.value)}
              className="w-full bg-card2 border border-border rounded-xl py-3 pl-8 pr-3 text-cream font-semibold text-sm outline-none focus:border-gold transition-colors"
              min={minBid}
              step={getIncrement(auction.currentBid)}
            />
          </div>
          <button
            onClick={() => setBidAmount(minBid)}
            className="bg-gold/10 border border-gold/20 text-gold px-3 rounded-xl text-[11px] font-bold hover:bg-gold/20 transition-colors whitespace-nowrap"
          >
            + Quick
          </button>
        </div>
        <div className="text-[10px] text-muted mb-4 text-center">
          Min. next bid: <span className="text-gold font-semibold">€{minBid.toLocaleString()}</span>
        </div>

        {/* Place bid button */}
        <button
          onClick={handlePlaceBid}
          className="w-full bg-gold text-black font-bold text-sm tracking-widest uppercase py-4 rounded-xl hover:bg-gold2 transition-all duration-200 active:scale-95 mb-3"
        >
          🔨 Place Bid
        </button>

        {/* Secondary actions */}
        <div className="flex gap-2">
          <button
            onClick={() => { toggleWatchlist(auctionId); toast(inWatchlist ? 'Removed from watchlist' : 'Added to watchlist! 🤍') }}
            className={`flex-1 flex items-center justify-center gap-2 border rounded-xl py-2.5 text-[11px] font-semibold transition-all duration-200 ${
              inWatchlist
                ? 'bg-gold/10 border-gold/30 text-gold'
                : 'bg-transparent border-border text-muted hover:border-gold/40 hover:text-gold'
            }`}
          >
            <Heart size={13} fill={inWatchlist ? 'currentColor' : 'none'} />
            {inWatchlist ? 'Watching' : 'Watchlist'}
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 border border-border rounded-xl py-2.5 text-[11px] font-semibold text-muted hover:border-gold/40 hover:text-gold transition-all duration-200"
          >
            <Share2 size={13} /> Share
          </button>
        </div>

        {/* Bid history */}
        <div className="mt-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-[10px] text-muted font-bold tracking-wider uppercase">Bid History</div>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="max-h-48 overflow-y-auto space-y-0">
            <AnimatePresence>
              {auction.bidHistory.map((b, i) => (
                <motion.div
                  key={`${b.user}-${b.amount}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex justify-between items-center py-2 border-b border-border/50 last:border-0 ${
                    i === 0 && b.user === 'You' ? 'bg-gold/5 -mx-2 px-2 rounded' : ''
                  }`}
                >
                  <span className={`text-xs font-medium ${b.user === 'You' ? 'text-gold' : 'text-cream'}`}>
                    {b.user}
                  </span>
                  <span className="font-serif text-gold text-sm font-semibold">€{b.amount.toLocaleString()}</span>
                  <span className="text-muted text-[10px]">{b.time}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card border border-border rounded-2xl p-7 max-w-sm w-full"
            >
              <h3 className="font-serif text-xl font-semibold mb-2">Confirm Your Bid</h3>
              <p className="text-muted text-sm leading-relaxed mb-5">
                You are about to place a bid on <strong className="text-cream">{auction.title}</strong>. This cannot be undone once confirmed.
              </p>
              <div className="bg-gold/5 border border-gold/15 rounded-xl p-4 text-center mb-6">
                <div className="text-[10px] text-muted tracking-widest uppercase mb-1">Your Bid Amount</div>
                <div className="font-serif text-3xl font-bold text-gold">€{parseInt(bidAmount).toLocaleString()}</div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-border text-muted rounded-xl py-3 text-sm font-semibold hover:border-cream hover:text-cream transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={confirming}
                  className="flex-2 bg-gold text-black rounded-xl py-3 text-sm font-bold tracking-wider hover:bg-gold2 transition-colors disabled:opacity-70"
                  style={{ flex: 2 }}
                >
                  {confirming ? 'Confirming...' : 'Confirm Bid →'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
