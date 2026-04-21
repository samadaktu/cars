import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Zap, TrendingUp, Send } from 'lucide-react'
import toast from 'react-hot-toast'

const METHODS = ['Outright Sale (Quick Cash)', 'Consignment Auction (Max Value)', 'Not Sure — Advise Me']

export default function SellWithUs() {
  const [form, setForm]     = useState({ name:'', email:'', phone:'', make:'', model:'', year:'', mileage:'', price:'', condition:'', method: METHODS[0] })
  const [errors, setErrors] = useState({})
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name  = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    if (!form.make.trim())  e.make  = 'Required'
    if (!form.model.trim()) e.model = 'Required'
    if (!form.year.trim())  e.year  = 'Required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    await new Promise(r => setTimeout(r, 1300))
    setLoading(false)
    setSent(true)
    toast.success('Enquiry sent! David will be in touch within 24 hours.')
  }

  if (sent) return (
    <div className="min-h-screen flex items-center justify-center px-6 page-enter">
      <div className="text-center max-w-md">
        <CheckCircle2 size={64} className="text-green-400 mx-auto mb-6" />
        <h2 className="font-serif text-3xl font-bold mb-3">Enquiry Submitted!</h2>
        <p className="text-muted text-sm leading-relaxed mb-8">
          David will review your <strong className="text-cream">{form.year} {form.make} {form.model}</strong> and get back to you within 24 hours with a valuation.
        </p>
        <button onClick={() => { setSent(false); setForm({ name:'', email:'', phone:'', make:'', model:'', year:'', mileage:'', price:'', condition:'', method: METHODS[0] }) }}
          className="btn-outline-gold">Submit Another Vehicle</button>
      </div>
    </div>
  )

  return (
    <div className="page-enter min-h-screen">
      {/* Hero */}
      <div className="relative bg-gradient-to-b from-[#1a1208] to-black py-28 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-gold/30 rounded-full px-4 py-1.5 text-gold text-[11px] font-semibold tracking-widest uppercase mb-6 bg-gold/5">
            No Sale · No Fee
          </div>
          <h1 className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight mb-5">
            Turn Your Classic<br /><em>Into Cash</em>
          </h1>
          <p className="text-muted text-base leading-relaxed max-w-xl mx-auto">
            37 years of expertise, 5,000+ registered bidders, and Ireland's most trusted auction platform — all working for you.
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {[
            {
              Icon: Zap, badge: 'Fast & Simple',
              title: 'Option A: Sell Outright',
              desc: 'David buys your car directly for cash. Get a fair market valuation within 24 hours. No waiting, no hassle, no listing fees. Perfect if you want a fast, guaranteed sale.',
              perks: ['Instant cash payment', 'Free valuation within 24 hours', 'No advertising or listing fees', 'Collect from your door available'],
            },
            {
              Icon: TrendingUp, badge: 'Maximum Value',
              title: 'Option B: Consignment Auction',
              desc: 'We list and auction your car on Ireland\'s premier platform. You benefit from our full buyer network of 5,000+ registered bidders. No sale means absolutely no fee.',
              perks: ['Reach 5,000+ registered bidders', 'Professional photography included', 'No sale = no fee, ever', 'Full concierge service'],
            },
          ].map(({ Icon, badge, title, desc, perks }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-7 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-transparent" />
              <div className="inline-block bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold tracking-widest uppercase rounded-full px-3 py-1 mb-4">{badge}</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <Icon size={16} className="text-gold" />
                </div>
                <h3 className="font-serif text-xl font-semibold">{title}</h3>
              </div>
              <p className="text-muted text-sm leading-relaxed mb-5">{desc}</p>
              <ul className="space-y-2">
                {perks.map(p => (
                  <li key={p} className="flex items-center gap-2.5 text-muted text-sm">
                    <CheckCircle2 size={14} className="text-green-400 flex-shrink-0" />{p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-eyebrow justify-center">Get Started Today</div>
            <h2 className="section-title">Tell Us About <em>Your Car</em></h2>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8">
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {[
                  { label: 'Your Name', key: 'name', placeholder: 'John Murphy', required: true },
                  { label: 'Email Address', key: 'email', placeholder: 'john@example.ie', required: true, type: 'email' },
                  { label: 'Phone Number', key: 'phone', placeholder: '087 xxx xxxx', type: 'tel' },
                  { label: 'Vehicle Year', key: 'year', placeholder: '1972', required: true },
                  { label: 'Vehicle Make', key: 'make', placeholder: 'Jaguar', required: true },
                  { label: 'Vehicle Model', key: 'model', placeholder: 'E-Type Series 3', required: true },
                  { label: 'Mileage', key: 'mileage', placeholder: '62,000 miles' },
                  { label: 'Asking Price (€)', key: 'price', placeholder: 'Or blank for valuation' },
                ].map(({ label, key, placeholder, required, type = 'text' }) => (
                  <div key={key}>
                    <label className="label-gold">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
                    <input type={type} className={`input-dark ${errors[key] ? 'border-red-500' : ''}`}
                      placeholder={placeholder} value={form[key]} onChange={set(key)} />
                    {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="label-gold">Condition &amp; History</label>
                  <textarea rows={4} className="input-dark resize-none"
                    placeholder="Describe the vehicle condition, service history, known issues, modifications, documents available..."
                    value={form.condition} onChange={set('condition')} />
                </div>
                <div className="sm:col-span-2">
                  <label className="label-gold">Preferred Sale Method</label>
                  <select className="input-dark cursor-pointer" value={form.method} onChange={set('method')} style={{ background: '#222' }}>
                    {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="btn-gold w-full justify-center py-4 disabled:opacity-60">
                {loading
                  ? <span className="flex items-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" /></svg>Submitting…</span>
                  : <><Send size={15} /> Submit Enquiry</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
