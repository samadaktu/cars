import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SOLD_ARCHIVE } from '../data/listings'
import { PageHeader } from '../components/ui'

export default function SoldArchive() {
  return (
    <div className="page-enter min-h-screen">
      <PageHeader
        eyebrow="Proven Track Record"
        title="Sold <em>Archive</em>"
        subtitle="A selection of vehicles sold through David Golding Cars & Classic Auctions — each one a story well told."
      />

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SOLD_ARCHIVE.map((item, i) => (
            <motion.div key={item.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-card border border-border rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div className="aspect-[4/3] bg-card2 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
                {item.emoji}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge-sold">✓ Sold</span>
                  <span className="text-[10px] text-muted font-medium">{item.category}</span>
                </div>
                <h3 className="font-serif text-base font-semibold mb-2">{item.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="font-serif text-xl font-bold text-green-400">
                    {item.sold ? `€${item.sold.toLocaleString()}` : 'Sold — Price Undisclosed'}
                  </div>
                  <div className="text-muted text-xs">{item.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="relative bg-gradient-to-br from-card via-card2 to-card border border-gold/20 rounded-2xl p-12 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "linear-gradient(rgba(201,168,76,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.15) 1px,transparent 1px)", backgroundSize: '40px 40px' }} />
          <div className="relative">
            <h3 className="font-serif text-3xl font-bold mb-3">Want to Sell Your Classic?</h3>
            <p className="text-muted text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Join hundreds of satisfied sellers who've trusted David Golding with their prized vehicles. Free valuation, no obligation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/sell-with-us" className="btn-gold">Get a Free Valuation →</Link>
              <Link to="/contact" className="btn-outline-gold">Contact David</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
