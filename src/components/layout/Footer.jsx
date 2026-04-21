import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Buy a Car', to: '/cars' },
  { label: 'Live Auctions', to: '/auction' },
  { label: 'Sell With Us', to: '/sell-with-us' },
  { label: 'How to Bid', to: '/how-to-bid' },
  { label: 'Sold Archive', to: '/sold' },
]
const CATEGORIES = [
  { label: 'Classic Cars', to: '/auction' },
  { label: 'Modern Classics', to: '/auction' },
  { label: 'Motorbikes', to: '/auction' },
  { label: 'Classic Parts', to: '/auction' },
  { label: 'Oddballs', to: '/auction' },
]

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-border">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="font-serif text-gold text-xl mb-2">David Golding</div>
            <div className="text-muted text-xs leading-relaxed mb-5">
              Ireland's Classic Car Specialists — Est. 1988.<br />
              Dublin's most trusted name in classic, vintage &amp; modern collector cars.
            </div>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Instagram, href: '#' },
                { Icon: Youtube, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:border-gold hover:text-gold transition-colors duration-200"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold mb-4">Quick Links</div>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted text-sm hover:text-cream transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold mb-4">Categories</div>
            <ul className="space-y-2.5">
              {CATEGORIES.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-muted text-sm hover:text-cream transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold mb-4">Contact</div>
            <div className="space-y-3.5">
              {[
                { Icon: MapPin,  text: 'Garville Lane, D06 E447\nRathgar, Dublin 6, Ireland' },
                { Icon: Phone,   text: '087 785 3264' },
                { Icon: Mail,    text: 'sales@davidgoldingcars.ie' },
                { Icon: Clock,   text: 'Mon–Fri Evenings · Sunday\nViewings by appointment only' },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={12} className="text-gold" />
                  </div>
                  <p className="text-muted text-xs leading-relaxed whitespace-pre-line">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} David Golding Cars &amp; Classic Auctions. All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(t => (
              <a key={t} href="#" className="text-muted text-xs hover:text-cream transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
