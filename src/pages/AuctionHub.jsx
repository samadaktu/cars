import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuctionStore from '../hooks/useAuctionStore'
import { AuctionCard, PageHeader } from '../components/ui'

const CATEGORIES = ['All', 'Classic Cars', 'Modern Classics', 'Motorbikes', 'Parts', 'Trade Cars', 'Oddballs']
const CAT_MAP    = { 'Classic Cars': 'classic', 'Modern Classics': 'modern', 'Motorbikes': 'motorbike', 'Parts': 'parts', 'Trade Cars': 'trade', 'Oddballs': 'oddball' }
const STATUSES   = ['All', '🔴 Live Now', '⏳ Ending Soon', '📅 Upcoming', '✅ Ended']

export default function AuctionHub() {
  const navigate = useNavigate()
  const auctions = useAuctionStore(s => s.auctions)
  const [category, setCategory] = useState('All')
  const [status,   setStatus]   = useState('All')
  const [search,   setSearch]   = useState('')

  const filtered = auctions.filter(a => {
    const catOk = category === 'All' || a.category === CAT_MAP[category]
    const searchOk = !search || a.title.toLowerCase().includes(search.toLowerCase())
    const t = a.timeRemaining
    const statOk =
      status === 'All'           ? true :
      status === '🔴 Live Now'   ? (t > 3600) :
      status === '⏳ Ending Soon' ? (t > 0 && t <= 3600) :
      status === '📅 Upcoming'   ? (t > 86400) :
      status === '✅ Ended'      ? (t === 0) :
      true
    return catOk && searchOk && statOk
  })

  return (
    <div className="page-enter min-h-screen">
      <PageHeader
        eyebrow="Ireland's Only Platform"
        title="Live &amp; Upcoming <em>Auctions</em>"
        subtitle="Real-time bidding on classic, vintage and modern collector vehicles. Anti-snipe protection on every lot."
      />

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Search */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search auctions..."
          className="input-dark mb-6 max-w-sm"
        />

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap border rounded-full px-4 py-2 text-[11px] font-semibold tracking-wider transition-all duration-200 flex-shrink-0 ${
                category === cat
                  ? 'bg-gold text-black border-gold'
                  : 'bg-transparent text-muted border-border hover:border-gold/40 hover:text-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`border rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all duration-200 ${
                status === s
                  ? 'bg-gold/10 text-gold border-gold/30'
                  : 'bg-transparent text-muted border-border hover:text-cream'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-muted text-xs mb-6 font-medium">
          {filtered.length} lot{filtered.length !== 1 ? 's' : ''} found
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, ease: [0.32, 0.72, 0, 1] }}
              >
                <AuctionCard auction={a} onClick={() => navigate(`/auction/${a.id}`)} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted">
            <div className="text-5xl mb-4">🔍</div>
            <div className="font-serif text-xl text-cream mb-2">No lots found</div>
            <p className="text-sm">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  )
}
