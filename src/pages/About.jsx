import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Award, Users, TrendingUp, Star } from 'lucide-react'

export default function About() {
  return (
    <div className="page-enter min-h-screen">
      {/* Hero */}
      <div className="relative bg-gradient-to-b from-[#1a1208] to-black py-28 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="section-eyebrow justify-center mb-4">Est. 1988 — Dublin 6</div>
          <h1 className="font-serif text-[clamp(2rem,5vw,4rem)] font-bold leading-tight mb-5">
            The Story Behind<br /><em>David Golding Cars</em>
          </h1>
          <p className="text-muted text-base leading-relaxed">
            37 years of passion, expertise, and honest dealing in the heart of Dublin.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20">
        {/* Profile card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-7 mb-12 flex items-center gap-6 flex-wrap">
          <div className="w-28 h-28 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center text-5xl flex-shrink-0">👤</div>
          <div>
            <div className="font-serif text-2xl font-bold mb-1">David Golding</div>
            <div className="text-gold text-xs font-bold tracking-widest uppercase mb-2">Founder &amp; Principal</div>
            <div className="flex gap-4 flex-wrap">
              {[{ n: '37+', l: 'Years Experience' }, { n: '125+', l: 'Trustpilot Reviews' }, { n: '4.9', l: 'Star Rating' }].map(s => (
                <div key={s.l} className="text-center">
                  <div className="font-serif text-xl font-bold text-gold">{s.n}</div>
                  <div className="text-muted text-[10px] tracking-wider uppercase">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Story */}
        <div className="space-y-6 text-muted text-sm leading-relaxed mb-12">
          <p>David Golding has been Ireland's go-to specialist for classic and collector cars since 1988. What began as a deep personal passion for automotive history evolved into the country's most respected boutique dealership — and eventually, Ireland's only dedicated classic car online auction platform.</p>
          <p>Based in Rathgar, Dublin 6, David has built his reputation on three simple principles: <strong className="text-cream">honest description, expert knowledge, and genuine passion</strong>. Every vehicle that passes through his hands is personally inspected, researched and — most importantly — loved.</p>
          <p>Over nearly four decades, David has sourced exceptional examples from UK main dealers, private collectors and estates across Europe. His eye for quality, combined with a deep understanding of what Irish collectors want, has made him the first call for serious buyers and sellers alike.</p>
          <p>In 2019, David launched Ireland's first dedicated classic car online auction platform — bringing the excitement of live auction bidding directly to collectors' screens, anywhere in the country. Today, thousands of registered bidders participate in auctions that showcase everything from pre-war rarities to nineties JDM icons.</p>
        </div>

        {/* Quote */}
        <blockquote className="bg-gold/5 border border-gold/15 rounded-2xl p-8 mb-14 relative">
          <div className="text-6xl text-gold/20 font-serif absolute top-3 left-5 leading-none">"</div>
          <p className="font-serif italic text-xl text-cream leading-relaxed mb-4 pt-6">
            Every car has a story. My job is to match the right story with the right person — honestly, fairly, and with genuine enthusiasm for what these machines represent.
          </p>
          <footer className="text-muted text-sm font-semibold">— David Golding</footer>
        </blockquote>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {[
            { Icon: Award,     title: 'Expert Provenance',   desc: 'Every vehicle personally inspected. All history verified. No surprises, ever.' },
            { Icon: Users,     title: 'Ireland\'s Only Platform', desc: 'The country\'s first and only dedicated classic car online auction — since 2019.' },
            { Icon: TrendingUp, title: 'Maximum Value',      desc: 'Whether buying or selling, our deep market knowledge ensures fair, optimal outcomes.' },
            { Icon: Star,      title: 'Trusted Since 1988',  desc: '125+ five-star Trustpilot reviews built over 37 years of honest, transparent dealing.' },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-gold" />
              </div>
              <div>
                <div className="font-semibold text-sm text-cream mb-1">{title}</div>
                <p className="text-muted text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/auction" className="btn-gold px-8 py-4">Browse Live Auctions →</Link>
          <Link to="/contact" className="btn-outline-gold px-8 py-4">Get in Touch</Link>
        </div>
      </div>
    </div>
  )
}
