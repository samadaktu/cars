import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { BID_INCREMENTS, FAQS } from '../data/listings'
import { PageHeader } from '../components/ui'

export default function HowToBid() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="page-enter min-h-screen">
      <PageHeader
        eyebrow="Complete Guide"
        title="How to <em>Bid</em>"
        subtitle="Everything you need to know to start bidding on Ireland's premier classic car auction platform."
      />

      <div className="max-w-4xl mx-auto px-6 pb-20">
        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {[
            { n: '01', icon: '📋', title: 'Register Free', desc: 'Create a free account with your name, email, address and contact details. Takes less than 2 minutes.' },
            { n: '02', icon: '💳', title: 'Add Your Card', desc: 'A €1 refundable hold is placed to confirm you\'re a serious bidder. Fully refunded in 7 working days.' },
            { n: '03', icon: '🔨', title: 'Bid Live & Win', desc: 'Browse active lots, place bids in real-time, and watch the live action from anywhere in Ireland.' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 text-center relative overflow-hidden">
              <div className="absolute top-3 right-4 font-mono text-[10px] text-gold/30 font-bold tracking-widest">{s.n}</div>
              <div className="text-4xl mb-4">{s.icon}</div>
              <div className="font-serif text-lg font-semibold mb-2">{s.title}</div>
              <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Anti-snipe explainer */}
        <div className="bg-gold/5 border border-gold/20 rounded-2xl p-7 mb-14">
          <div className="flex items-start gap-4">
            <div className="text-3xl flex-shrink-0">⚡</div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-gold mb-2">Anti-Snipe Protection</h3>
              <p className="text-muted text-sm leading-relaxed mb-3">
                David Golding Classic Auctions uses anti-sniping technology on every lot. If a bid is placed within the final <strong className="text-cream">2 minutes</strong> of any auction, the countdown automatically extends by <strong className="text-cream">2 minutes</strong>.
              </p>
              <p className="text-muted text-sm leading-relaxed">
                This ensures all bidders have a fair opportunity to respond and prevents last-second sniper tactics. The auction only ends when no new bids are placed in the final 2-minute window.
              </p>
            </div>
          </div>
        </div>

        {/* Increment table */}
        <div className="mb-14">
          <h2 className="font-serif text-2xl font-semibold border-b border-border pb-4 mb-6">Bid Increment Table</h2>
          <div className="rounded-2xl overflow-hidden border border-border">
            <table className="w-full">
              <thead>
                <tr className="bg-gold/8" style={{ background: 'rgba(201,168,76,0.08)' }}>
                  <th className="text-left px-5 py-3.5 text-gold text-[11px] font-bold tracking-widest uppercase">Current Bid</th>
                  <th className="text-left px-5 py-3.5 text-gold text-[11px] font-bold tracking-widest uppercase">Minimum Increment</th>
                </tr>
              </thead>
              <tbody>
                {BID_INCREMENTS.map(({ from, to, increment }, i) => (
                  <tr key={i} className="border-t border-border hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 text-muted text-sm">
                      €{from.toLocaleString()} — {to === Infinity ? 'above' : `€${to.toLocaleString()}`}
                    </td>
                    <td className="px-5 py-3.5 text-gold font-semibold text-sm">€{increment.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-14">
          <h2 className="font-serif text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-0">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button
                  className="w-full flex items-center justify-between py-5 text-left hover:text-gold transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-semibold pr-4">{faq.q}</span>
                  <span className="flex-shrink-0 text-gold">
                    {openFaq === i ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted text-sm leading-relaxed pb-5">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-card to-card2 border border-border rounded-2xl p-10">
          <h3 className="font-serif text-2xl font-semibold mb-3">Ready to Start Bidding?</h3>
          <p className="text-muted text-sm mb-7">Registration is free and takes less than 2 minutes. Ireland's finest classic cars await.</p>
          <Link to="/register" className="btn-gold text-sm px-10 py-4">Register Now — It's Free →</Link>
        </div>
      </div>
    </div>
  )
}
