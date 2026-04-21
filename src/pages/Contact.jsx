import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

const SUBJECTS = ['General Enquiry', 'Buying a Car', 'Selling My Car', 'Auction Question', 'Other']

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' })
  const [errors, setErrors]   = useState({})
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
    toast.success('Message sent! David will respond within 24 hours.')
  }

  if (sent) return (
    <div className="min-h-screen flex items-center justify-center px-6 page-enter">
      <div className="text-center max-w-md">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
          <CheckCircle2 size={64} className="text-green-400 mx-auto mb-6" />
        </motion.div>
        <h2 className="font-serif text-3xl font-bold mb-3">Message Sent!</h2>
        <p className="text-muted text-sm leading-relaxed mb-8">
          Thanks, <strong className="text-cream">{form.name}</strong>. David will respond to your enquiry within 24 hours.
        </p>
        <button onClick={() => { setSent(false); setForm({ name:'', email:'', phone:'', subject: SUBJECTS[0], message:'' }) }}
          className="btn-outline-gold">
          Send Another Message
        </button>
      </div>
    </div>
  )

  return (
    <div className="page-enter min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-10">
        <div className="section-eyebrow">Get In Touch</div>
        <h1 className="section-title mb-3">Contact <em>David</em></h1>
        <p className="text-muted text-sm max-w-lg leading-relaxed">
          Whether you're buying, selling or have a question — David personally responds to every enquiry, usually within a few hours.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="font-serif text-xl font-semibold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="label-gold">Full Name *</label>
                    <input className={`input-dark ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="John Murphy" value={form.name} onChange={set('name')} />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="label-gold">Email Address *</label>
                    <input type="email" className={`input-dark ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="john@example.ie" value={form.email} onChange={set('email')} />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="label-gold">Phone Number</label>
                    <input type="tel" className="input-dark" placeholder="087 xxx xxxx" value={form.phone} onChange={set('phone')} />
                  </div>
                  <div>
                    <label className="label-gold">Subject</label>
                    <select className="input-dark cursor-pointer" value={form.subject} onChange={set('subject')}
                      style={{ background: '#222' }}>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="label-gold">Message *</label>
                  <textarea rows={5} className={`input-dark resize-none ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="How can David help you today?" value={form.message} onChange={set('message')} />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit" disabled={loading}
                  className="btn-gold w-full justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" />
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="space-y-6 mb-8">
              {[
                { Icon: MapPin,  title: 'Address',        text: 'Garville Lane, D06 E447\nRathgar, Dublin 6, Ireland' },
                { Icon: Phone,   title: 'Phone',          text: '087 785 3264', href: 'tel:0877853264' },
                { Icon: Mail,    title: 'Email',          text: 'sales@davidgoldingcars.ie', href: 'mailto:sales@davidgoldingcars.ie' },
                { Icon: Clock,   title: 'Opening Hours',  text: 'Mon–Fri: Evenings\nSunday: Open\nSaturday: Closed\nViewings by appointment only' },
              ].map(({ Icon, title, text, href }) => (
                <div key={title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-cream mb-0.5">{title}</div>
                    {href
                      ? <a href={href} className="text-gold text-sm hover:text-gold2 transition-colors whitespace-pre-line">{text}</a>
                      : <p className="text-muted text-sm whitespace-pre-line leading-relaxed">{text}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="aspect-[16/9] bg-card2 flex flex-col items-center justify-center gap-3 text-muted">
                <MapPin size={32} className="text-gold/40" />
                <p className="text-sm font-medium">Garville Lane, Rathgar, Dublin 6</p>
                <p className="text-xs text-muted/60">(53.3162°N, 6.2762°W)</p>
                <a href="https://maps.google.com/?q=53.3161651,-6.2762247" target="_blank" rel="noreferrer"
                  className="btn-outline-gold text-[10px] px-4 py-2">
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
