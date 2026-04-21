import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Star, Shield, Award } from 'lucide-react'
import useAuctionStore from '../hooks/useAuctionStore'
import { AuctionCard, CarCard, SectionHeader, StatCounter } from '../components/ui'
import { CAR_LISTINGS } from '../data/listings'

const FADE_UP = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      variants={FADE_UP}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      transition={{ duration: 0.6, delay, ease: [0.32, 0.72, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const auctions = useAuctionStore(s => s.auctions)
  const liveAuctions = auctions.filter(a => a.timeRemaining > 0).slice(0, 3)

  return (
    <div className="page-enter">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Backgrounds */}
        <div className="absolute inset-0">
          <img
            src="/images/hero_bg.png"
            alt="Premium Classic Cars"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
        <div className="absolute inset-0 bg-grid-gold bg-grid opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)' }} />

        {/* Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 border border-gold/30 rounded-full px-5 py-2 text-gold text-[11px] font-semibold tracking-[0.2em] uppercase mb-8 bg-gold/5"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse2" />
            Live Auctions Running Now
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="font-serif text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.04] tracking-tight mb-6"
          >
            Ireland's Premier<br />
            <em className="text-gold">Classic Car</em><br />
            Auction &amp; Sales
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-muted text-lg font-light leading-relaxed max-w-xl mx-auto mb-10"
          >
            Est. 1988 — Dublin's most trusted name in classic, vintage &amp; modern collector cars.
            Where passion meets provenance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4 justify-center mb-14"
          >
            <Link to="/auction" className="btn-gold text-sm px-8 py-4">
              Browse Live Auctions
              <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">🔨</span>
            </Link>
            <Link to="/cars" className="btn-ghost text-sm px-8 py-4">
              Buy a Car Now
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">🚗</span>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-6 justify-center text-sm"
          >
            {[
              { icon: '⭐', bold: '4.9/5', label: 'Trustpilot' },
              { icon: '💬', bold: '125+',  label: 'Reviews' },
              { icon: '📅', bold: 'Est.',  label: '1988' },
              { icon: '📍', bold: '',      label: 'Dublin 6' },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-muted font-medium">
                <span>{b.icon}</span>
                {b.bold && <span className="text-gold font-bold">{b.bold}</span>}
                <span>{b.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted text-[10px] tracking-[0.2em] uppercase animate-bounce2">
          Scroll
          <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* ─── LIVE AUCTIONS ─── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <SectionHeader
              eyebrow="🔴 Real-Time"
              title="Live Auctions — <em>Ending Soon</em>"
              subtitle="Bid live from anywhere in Ireland. Anti-snipe protection on every lot."
              action={
                <Link to="/auction" className="inline-flex items-center gap-2 text-gold text-xs font-bold tracking-widest uppercase hover:gap-3 transition-all">
                  View All <ArrowRight size={14} />
                </Link>
              }
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveAuctions.map((a, i) => (
              <AnimatedSection key={a.id} delay={i * 0.08}>
                <AuctionCard auction={a} onClick={() => navigate(`/auction/${a.id}`)} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider mx-6" />

      {/* ─── FEATURED CARS ─── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Fixed Price"
              title="Available Now — <em>Buy Directly</em>"
              subtitle="No bidding required. Fair, transparent pricing on hand-selected vehicles."
              action={
                <Link to="/cars" className="inline-flex items-center gap-2 text-gold text-xs font-bold tracking-widest uppercase hover:gap-3 transition-all">
                  Browse All <ArrowRight size={14} />
                </Link>
              }
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAR_LISTINGS.slice(0, 3).map((c, i) => (
              <AnimatedSection key={c.id} delay={i * 0.08}>
                <CarCard car={c} onClick={() => navigate(`/cars/${c.id}`)} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <div className="bg-dark border-y border-border py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '37+',    label: 'Years in Business' },
            { number: '125+',   label: '5-Star Reviews' },
            { number: '4.9/5',  label: 'Trustpilot Rating' },
            { number: 'Dublin 6', label: 'Rathgar, Ireland' },
          ].map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <StatCounter number={s.number} label={s.label} />
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <SectionHeader eyebrow="Simple Process" title="How It Works" centered />
          </AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            {[
              {
                title: '🔨 How to Buy at Auction',
                steps: [
                  { n: 1, bold: 'Register & Verify', text: 'Create a free account with your details. Verified in minutes.' },
                  { n: 2, bold: 'Add Payment Card', text: 'A €1 refundable hold confirms you\'re a serious bidder. Refunded in 7 days.' },
                  { n: 3, bold: 'Bid Live & Win', text: 'Watch bids in real-time and win your dream car from anywhere in Ireland.' },
                ],
                cta: { label: 'Learn More About Bidding', to: '/how-to-bid', outline: false },
              },
              {
                title: '🚗 How to Sell Your Car',
                steps: [
                  { n: 1, bold: 'Contact David', text: 'Reach out with photos and details. Expert valuation within 24 hours.' },
                  { n: 2, bold: 'Agree on Terms', text: 'Choose outright sale or consignment auction. No sale, no fee on consignment.' },
                  { n: 3, bold: 'Car Listed & Sold', text: 'We handle all photography, listing and bidder queries. You collect your payment.' },
                ],
                cta: { label: 'Sell Your Car →', to: '/sell-with-us', outline: true },
              },
            ].map((card, ci) => (
              <AnimatedSection key={ci} delay={ci * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden h-full">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-transparent" />
                  <h3 className="font-serif text-xl font-semibold text-gold mb-6">{card.title}</h3>
                  <div className="space-y-5 mb-8">
                    {card.steps.map(step => (
                      <div key={step.n} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold flex-shrink-0">
                          {step.n}
                        </div>
                        <p className="text-muted text-sm leading-relaxed pt-1">
                          <strong className="text-cream">{step.bold}</strong> — {step.text}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={card.cta.to}
                    className={card.cta.outline ? 'btn-outline-gold text-[11px]' : 'btn-gold text-[11px]'}
                  >
                    {card.cta.label}
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 px-6 bg-dark">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <SectionHeader eyebrow="Customer Stories" title="What Our <em>Clients Say</em>" centered />
          </AnimatedSection>
          <div className="flex justify-center items-center gap-2 mb-10">
            <span className="text-green-500 font-bold text-sm tracking-wider">★ Trustpilot</span>
            <span className="text-muted text-sm">Rated Excellent</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stars: 5, text: '"Bought my first classic at David Golding\'s auction — a pristine 1974 BMW 2002. The whole process was transparent, exciting, and fair. David personally answered every question I had."', author: 'Conor M., Dublin' },
              { stars: 5, text: '"Sold my late father\'s Jaguar E-Type through consignment and couldn\'t be happier. It achieved far more than expected and David kept us informed at every step. Absolute professionals."', author: 'Sarah O\'B., Cork' },
              { stars: 5, text: '"The live bidding platform is slick and genuinely exciting. I\'ve won two cars now and both were exactly as described. This is how car auctions should be done — honest and transparent."', author: 'Brendan K., Galway' },
            ].map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="text-gold text-sm mb-3">{'★'.repeat(t.stars)}</div>
                  <p className="font-serif italic text-sm leading-relaxed mb-4 text-cream">{t.text}</p>
                  <div className="text-muted text-xs font-semibold">— {t.author}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <SectionHeader eyebrow="Browse By" title="Auction <em>Categories</em>" centered />
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { icon: '🏎️', name: 'Classic Cars',        count: '12 active lots' },
              { icon: '🚘', name: 'Modern Classics',     count: '8 active lots' },
              { icon: '🏍️', name: 'Motorbikes',          count: '5 active lots' },
              { icon: '🔧', name: 'Classic Parts',       count: '23 active lots' },
              { icon: '🚗', name: 'Trade Cars',          count: '6 active lots' },
              { icon: '🦄', name: 'Oddballs & Unicorns', count: '3 active lots' },
            ].map((cat, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <Link
                  to="/auction"
                  className="block bg-card border border-border rounded-2xl p-5 text-center hover:border-gold/40 hover:bg-gold/5 hover:-translate-y-1 transition-all duration-200"
                >
                  <span className="text-3xl block mb-3">{cat.icon}</span>
                  <div className="font-serif font-semibold mb-1">{cat.name}</div>
                  <div className="text-muted text-xs">{cat.count}</div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT TEASER ─── */}
      <section className="py-20 px-6 bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="bg-gold/5 border border-gold/15 rounded-2xl p-2">
                <div className="bg-card2 rounded-xl aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/about_david.png"
                    alt="David Golding"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="section-eyebrow">Est. 1988</div>
              <h2 className="section-title mb-5">
                Ireland's Most Trusted<br />
                <em>Classic Car</em> Specialist
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-4">
                David Golding has been Ireland's go-to specialist for classic and collector cars since 1988.
                With over three decades of expertise sourcing vehicles from UK main dealers and private collections,
                David brings unparalleled knowledge and a commitment to honest, transparent dealing.
              </p>
              <p className="text-muted text-sm leading-relaxed mb-8">
                As the founder of Ireland's only dedicated classic car auction platform, David has pioneered
                a new era of accessible, exciting car collecting for Irish enthusiasts at every level.
              </p>
              <Link to="/about" className="btn-gold text-[11px]">
                Read Our Story <ArrowRight size={14} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
