import React from 'react'
import { motion } from 'framer-motion'

/* ─────────────── COUNTDOWN TIMER ─────────────── */
export function CountdownTimer({ seconds, className = '' }) {
  const h   = Math.floor(seconds / 3600)
  const m   = Math.floor((seconds % 3600) / 60)
  const s   = seconds % 60
  const fmt = n => String(n).padStart(2, '0')
  const colorClass = seconds < 600
    ? 'text-red-400'
    : seconds < 3600
    ? 'text-orange-400'
    : 'text-green-400'

  return (
    <span className={`font-mono font-medium ${colorClass} ${className}`}>
      {fmt(h)}:{fmt(m)}:{fmt(s)}
    </span>
  )
}

/* ─────────────── LIVE DOT ─────────────── */
export function LiveDot() {
  return <span className="live-dot inline-block" />
}

/* ─────────────── STATUS BADGE ─────────────── */
export function StatusBadge({ seconds, small = false }) {
  const base = small ? 'text-[9px] px-2 py-0.5' : ''
  if (seconds <= 0)    return <span className={`badge-sold ${base}`}>✓ Ended</span>
  if (seconds < 600)   return <span className={`badge-live ${base}`}><LiveDot /> Ending Soon</span>
  if (seconds < 86400) return <span className={`badge-live ${base}`}><LiveDot /> Live</span>
  return <span className={`badge-upcoming ${base}`}>📅 Upcoming</span>
}

/* ─────────────── AUCTION CARD ─────────────── */
export function AuctionCard({ auction, onClick }) {
  const { title, subtitle, emoji, currentBid, bids, timeRemaining, noReserve } = auction

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="card-dark cursor-pointer group"
      onClick={onClick}
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] bg-card2 overflow-hidden">
        {auction.image ? (
          <img
            src={auction.image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl transition-transform duration-500 group-hover:scale-110">{emoji}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <StatusBadge seconds={timeRemaining} />
          {noReserve && <span className="badge-noreserve">No Reserve</span>}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-serif text-base font-semibold leading-snug mb-1">{title}</h3>
        <p className="text-muted text-[11px] mb-4 leading-relaxed line-clamp-2">{subtitle}</p>

        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-[10px] text-muted font-semibold tracking-wider uppercase mb-1">Current Bid</div>
            <div className="font-serif text-2xl font-bold text-gold">€{currentBid.toLocaleString()}</div>
            <div className="text-muted text-[11px] mt-0.5">{bids} bids placed</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-muted font-semibold tracking-wider uppercase mb-1">Time Left</div>
            <CountdownTimer seconds={timeRemaining} className="text-sm" />
          </div>
        </div>

        <button
          className="bid-btn w-full"
          onClick={e => { e.stopPropagation(); onClick?.() }}
        >
          Bid Now →
        </button>
      </div>
    </motion.div>
  )
}

/* ─────────────── CAR CARD ─────────────── */
export function CarCard({ car, onClick }) {
  const { title, year, mileage, transmission, fuel, price, emoji } = car

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="card-dark cursor-pointer group"
      onClick={onClick}
    >
      <div className="aspect-[4/3] bg-card2 overflow-hidden">
        {car.image ? (
          <img
            src={car.image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl transition-transform duration-500 group-hover:scale-110">{emoji}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-serif text-base font-semibold mb-2 leading-snug">{title}</h3>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted mb-3">
          <span>{year}</span>
          <span>· {mileage} miles</span>
          <span>· {transmission}</span>
          <span>· {fuel}</span>
        </div>
        <div className="font-serif text-xl font-bold text-gold mb-4">€{price.toLocaleString()}</div>
        <button className="w-full bg-transparent border border-gold/40 text-gold rounded-xl py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-200">
          View Details
        </button>
      </div>
    </motion.div>
  )
}

/* ─────────────── PAGE HEADER ─────────────── */
export function PageHeader({ eyebrow, title, subtitle, centered = false }) {
  return (
    <div className={`max-w-7xl mx-auto px-6 pt-28 pb-10 ${centered ? 'text-center' : ''}`}>
      {eyebrow && <div className={`section-eyebrow ${centered ? 'justify-center' : ''}`}>{eyebrow}</div>}
      <h1 className="section-title mb-3" dangerouslySetInnerHTML={{ __html: title }} />
      {subtitle && <p className="text-muted text-sm leading-relaxed max-w-xl">{subtitle}</p>}
    </div>
  )
}

/* ─────────────── SECTION HEADER ─────────────── */
export function SectionHeader({ eyebrow, title, subtitle, action, centered = false }) {
  return (
    <div className={`flex items-end justify-between mb-10 gap-6 flex-wrap ${centered ? 'flex-col items-center text-center' : ''}`}>
      <div className={centered ? 'text-center' : ''}>
        {eyebrow && <div className={`section-eyebrow ${centered ? 'justify-center' : ''}`}>{eyebrow}</div>}
        <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
        {subtitle && <p className="text-muted text-sm leading-relaxed max-w-lg mt-2">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

/* ─────────────── STAT COUNTER ─────────────── */
export function StatCounter({ number, label }) {
  return (
    <div className="text-center">
      <div className="font-serif text-4xl font-bold text-gold mb-1">{number}</div>
      <div className="text-muted text-[11px] font-semibold tracking-widest uppercase">{label}</div>
    </div>
  )
}

/* ─────────────── FORM FIELD ─────────────── */
export function FormField({ label, id, type = 'text', placeholder, required, rows, options, value, onChange }) {
  const inputClass = 'input-dark'

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="label-gold">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          rows={rows || 4}
          placeholder={placeholder}
          className={`${inputClass} resize-y`}
          value={value}
          onChange={onChange}
        />
      ) : type === 'select' ? (
        <select id={id} className={`${inputClass} cursor-pointer`} value={value} onChange={onChange}>
          {options?.map(o => (
            <option key={o.value || o} value={o.value || o} style={{ background: '#1C1C1C' }}>
              {o.label || o}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={inputClass}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  )
}

// Attached to bid-btn so Tailwind keeps it
const styles = `
.bid-btn {
  @apply bg-gold text-black border-none px-4 py-3 rounded-xl font-sans font-bold text-xs tracking-widest uppercase cursor-pointer transition-all duration-200 hover:bg-gold2 hover:-translate-y-px active:scale-95;
}
`
