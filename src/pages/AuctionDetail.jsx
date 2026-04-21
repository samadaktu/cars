import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Info } from 'lucide-react'
import useAuctionStore from '../hooks/useAuctionStore'
import BidPanel from '../components/auction/BidPanel'
import { AuctionCard, StatusBadge } from '../components/ui'

export default function AuctionDetail() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const auction      = useAuctionStore(s => s.auctions.find(a => a.id === parseInt(id)))
  const auctions     = useAuctionStore(s => s.auctions)
  const [activeThumb, setActiveThumb] = useState(0)

  if (!auction) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <div className="text-5xl mb-4">🚗</div>
          <h2 className="font-serif text-2xl mb-3">Auction Not Found</h2>
          <Link to="/auction" className="btn-gold">Back to Auctions</Link>
        </div>
      </div>
    )
  }

  const related = auctions.filter(a => a.id !== auction.id).slice(0, 2)
  const thumbs  = auction.gallery || [auction.image]

  return (
    <div className="page-enter min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        {/* Back button */}
        <button
          onClick={() => navigate('/auction')}
          className="flex items-center gap-2 text-muted text-xs font-semibold hover:text-gold transition-colors mb-6"
        >
          <ChevronLeft size={16} /> Back to Auctions
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* ── LEFT: Vehicle Details ── */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <StatusBadge seconds={auction.timeRemaining} />
              {auction.noReserve && <span className="badge-noreserve">No Reserve</span>}
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl font-bold mb-1">{auction.title}</h1>
            <p className="text-muted text-sm mb-6">{auction.subtitle}</p>

            {/* Gallery */}
            <div className="bg-card2 rounded-2xl aspect-video flex items-center justify-center mb-3 overflow-hidden">
              {thumbs[activeThumb] ? (
                <img
                  src={thumbs[activeThumb]}
                  alt={auction.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[8rem] select-none">{auction.emoji}</span>
              )}
            </div>
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {thumbs.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`w-20 h-14 rounded-lg bg-card2 flex-shrink-0 overflow-hidden border-2 transition-colors ${
                    activeThumb === i ? 'border-gold' : 'border-transparent hover:border-border'
                  }`}
                >
                  <img src={t} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Key stats */}
            <div className="flex flex-wrap gap-3 mb-8">
              {auction.keyStats.map(stat => (
                <div key={stat.label} className="bg-card2 border border-border rounded-xl px-4 py-3 text-center">
                  <div className="font-semibold text-sm text-cream">{stat.value}</div>
                  <div className="text-muted text-[10px] tracking-wider uppercase mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-serif text-lg font-semibold border-b border-border pb-3 mb-4">About This Vehicle</h2>
              <p className="text-muted text-sm leading-relaxed">{auction.description}</p>
            </div>

            {/* Seller */}
            <div className="bg-gold/5 border border-gold/15 rounded-xl p-4 mb-8 flex items-center gap-3">
              <Info size={16} className="text-gold flex-shrink-0" />
              <div className="text-sm text-muted">
                <strong className="text-cream">Seller:</strong> {auction.seller}
              </div>
            </div>

            {/* Specs table */}
            <div className="mb-10">
              <h2 className="font-serif text-lg font-semibold border-b border-border pb-3 mb-4">Specifications</h2>
              <table className="w-full">
                <tbody>
                  {auction.specs.map(([key, val]) => (
                    <tr key={key} className="border-b border-border/50">
                      <td className="py-2.5 pr-4 text-muted text-sm w-2/5 font-medium">{key}</td>
                      <td className="py-2.5 text-cream text-sm font-semibold">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Buyer's notes */}
            <div className="bg-card border border-border rounded-xl p-5 mb-10">
              <h3 className="font-serif text-base font-semibold mb-3">Buyer's Notes</h3>
              <ul className="space-y-2 text-muted text-sm">
                <li className="flex gap-2"><span className="text-gold">→</span> Payment must be made within 48 hours of auction close.</li>
                <li className="flex gap-2"><span className="text-gold">→</span> Collection from Garville Lane, Dublin 6 by appointment.</li>
                <li className="flex gap-2"><span className="text-gold">→</span> Nationwide shipping available at buyer's cost.</li>
                <li className="flex gap-2"><span className="text-gold">→</span> All cars sold as seen. Viewings available by appointment before bidding.</li>
                <li className="flex gap-2"><span className="text-gold">→</span> A 5% buyer's premium + VAT is added to the hammer price.</li>
              </ul>
            </div>

            {/* Related lots */}
            <h2 className="font-serif text-xl font-semibold mb-5">Similar <em>Lots</em></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map(a => (
                <AuctionCard key={a.id} auction={a} onClick={() => navigate(`/auction/${a.id}`)} />
              ))}
            </div>
          </div>

          {/* ── RIGHT: Bid Panel ── */}
          <div>
            <BidPanel auctionId={auction.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
