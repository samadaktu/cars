import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ChevronLeft, Phone, Mail, MessageCircle, Shield } from 'lucide-react'
import { CAR_LISTINGS } from '../data/listings'
import { CarCard } from '../components/ui'
import toast from 'react-hot-toast'

export default function CarDetail() {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const car       = CAR_LISTINGS.find(c => c.id === parseInt(id))
  const [activeThumb, setActiveThumb] = useState(0)

  if (!car) return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <div className="text-5xl mb-4">🚗</div>
        <h2 className="font-serif text-2xl mb-3">Car Not Found</h2>
        <Link to="/cars" className="btn-gold">Back to Cars</Link>
      </div>
    </div>
  )

  const related = CAR_LISTINGS.filter(c => c.id !== car.id).slice(0, 3)
  const thumbs  = car.gallery || [car.image]

  return (
    <div className="page-enter min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <button onClick={() => navigate('/cars')} className="flex items-center gap-2 text-muted text-xs font-semibold hover:text-gold transition-colors mb-6">
          <ChevronLeft size={16} /> Back to Cars
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Left */}
          <div>
            <div className="bg-card2 rounded-2xl aspect-video flex items-center justify-center mb-3 overflow-hidden">
              {thumbs[activeThumb] ? (
                <img
                  src={thumbs[activeThumb]}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[8rem]">{car.emoji}</span>
              )}
            </div>
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {thumbs.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`w-20 h-14 rounded-lg bg-card2 flex-shrink-0 overflow-hidden border-2 transition-colors ${
                    activeThumb === i ? 'border-gold' : 'border-transparent'
                  }`}
                >
                  <img src={t} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {[['Year', car.year], ['Mileage', car.mileage + ' miles'], ['Engine', car.engine], ['Gearbox', car.transmission], ['Fuel', car.fuel], ['Colour', car.color]].map(([l, v]) => (
                <div key={l} className="bg-card2 border border-border rounded-xl px-4 py-2.5 text-center">
                  <div className="font-semibold text-sm text-cream">{v}</div>
                  <div className="text-muted text-[10px] tracking-wider uppercase mt-0.5">{l}</div>
                </div>
              ))}
            </div>

            <h1 className="font-serif text-2xl font-bold mb-4">{car.title}</h1>

            <div className="mb-8">
              <h2 className="font-serif text-lg font-semibold border-b border-border pb-3 mb-4">About This Vehicle</h2>
              <p className="text-muted text-sm leading-relaxed">{car.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="font-serif text-lg font-semibold border-b border-border pb-3 mb-4">Specifications</h2>
              <table className="w-full">
                <tbody>
                  {car.specs.map(([k, v]) => (
                    <tr key={k} className="border-b border-border/50">
                      <td className="py-2.5 pr-4 text-muted text-sm w-2/5 font-medium">{k}</td>
                      <td className="py-2.5 text-cream text-sm font-semibold">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gold/5 border border-gold/15 rounded-xl p-5 mb-10">
              <div className="flex items-start gap-3">
                <Shield size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm text-cream mb-1">David's Personal Guarantee</div>
                  <p className="text-muted text-xs leading-relaxed">Every vehicle is personally inspected and described by David Golding. All known issues disclosed upfront. Viewings welcome by appointment at our Dublin 6 premises.</p>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-xl font-semibold mb-5">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map(c => <CarCard key={c.id} car={c} onClick={() => navigate(`/cars/${c.id}`)} />)}
            </div>
          </div>

          {/* Right: Contact panel */}
          <div>
            <div className="bg-card border border-border rounded-2xl p-5 sticky top-24 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold via-gold/50 to-transparent rounded-t-2xl" />

              <div className="mb-1 text-muted text-xs font-semibold tracking-widest uppercase">Fixed Price</div>
              <div className="font-serif text-4xl font-bold text-gold mb-1">€{car.price.toLocaleString()}</div>
              <div className="text-muted text-xs mb-6">No bidding — buy directly from David</div>

              <div className="space-y-3 mb-5">
                <a href="tel:0877853264" onClick={() => toast.success('Calling David Golding…')}
                  className="w-full flex items-center justify-center gap-2.5 bg-gold text-black font-bold text-xs tracking-widest uppercase py-4 rounded-xl hover:bg-gold2 transition-colors">
                  <Phone size={15} /> Call David — 087 785 3264
                </a>
                <button onClick={() => toast.success('Email enquiry opened!')}
                  className="w-full flex items-center justify-center gap-2.5 border border-gold/40 text-gold font-bold text-xs tracking-widest uppercase py-3.5 rounded-xl hover:bg-gold hover:text-black transition-all">
                  <Mail size={14} /> Enquire by Email
                </button>
                <button onClick={() => toast.success('Opening WhatsApp…')}
                  className="w-full flex items-center justify-center gap-2.5 bg-green-500/10 border border-green-500/30 text-green-400 font-bold text-xs tracking-widest uppercase py-3.5 rounded-xl hover:bg-green-500/20 transition-colors">
                  <MessageCircle size={14} /> WhatsApp Enquiry
                </button>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-xs text-muted leading-relaxed space-y-2">
                <div className="flex gap-2"><span className="text-gold">✓</span><span>Full vehicle history report included</span></div>
                <div className="flex gap-2"><span className="text-gold">✓</span><span>Viewings welcome by appointment</span></div>
                <div className="flex gap-2"><span className="text-gold">✓</span><span>Nationwide delivery available</span></div>
                <div className="flex gap-2"><span className="text-gold">✓</span><span>Part-exchange considered</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
