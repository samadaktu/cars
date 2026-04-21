import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuctionStore from '../hooks/useAuctionStore'

export default function Register() {
  const navigate   = useNavigate()
  const register   = useAuctionStore(s => s.register)
  const isLoggedIn = useAuctionStore(s => s.isLoggedIn)

  const [form, setForm]     = useState({ name: '', email: '', phone: '', password: '', confirm: '', terms: false })
  const [errors, setErrors] = useState({})
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  if (isLoggedIn) { navigate('/dashboard'); return null }

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())                               e.name    = 'Full name is required'
    if (!form.email.trim())                              e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email))          e.email   = 'Valid email required'
    if (form.password.length < 6)                        e.password = 'Minimum 6 characters'
    if (form.password !== form.confirm)                  e.confirm  = 'Passwords do not match'
    if (!form.terms)                                     e.terms    = 'You must agree to the terms'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const result = register({ name: form.name, email: form.email, password: form.password })
    setLoading(false)
    if (result.success) {
      toast.success('Welcome to David Golding Auctions! 🎉')
      navigate('/dashboard')
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-[#0d0d0d] to-black page-enter">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="w-10 h-1 bg-gold rounded-full mb-7" />
          <h1 className="font-serif text-3xl font-bold mb-1">Create Account</h1>
          <p className="text-muted text-sm mb-8">Register to start bidding on Ireland's premier classic car auction platform.</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {[
              { label: 'Full Name', key: 'name', placeholder: 'John Murphy', type: 'text' },
              { label: 'Email Address', key: 'email', placeholder: 'john@example.ie', type: 'email' },
              { label: 'Phone Number', key: 'phone', placeholder: '087 xxx xxxx', type: 'tel' },
            ].map(({ label, key, placeholder, type }) => (
              <div key={key}>
                <label className="label-gold">{label}{key !== 'phone' && <span className="text-red-400 ml-0.5">*</span>}</label>
                <input type={type} className={`input-dark ${errors[key] ? 'border-red-500' : ''}`}
                  placeholder={placeholder} value={form[key]} onChange={set(key)} />
                {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
              </div>
            ))}

            {[
              { label: 'Password', key: 'password' },
              { label: 'Confirm Password', key: 'confirm' },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="label-gold">{label} <span className="text-red-400">*</span></label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'}
                    className={`input-dark pr-10 ${errors[key] ? 'border-red-500' : ''}`}
                    placeholder="••••••••" value={form[key]} onChange={set(key)} />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-gold transition-colors">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
              </div>
            ))}

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.terms} onChange={set('terms')} className="mt-0.5 accent-gold" />
                <span className="text-muted text-xs leading-relaxed">
                  I agree to the{' '}
                  <Link to="#" className="text-gold hover:underline">Terms &amp; Conditions</Link>
                  {' '}and{' '}
                  <Link to="#" className="text-gold hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.terms && <p className="text-red-400 text-xs mt-1">{errors.terms}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="btn-gold w-full justify-center py-4 mt-2 disabled:opacity-60 disabled:cursor-not-allowed text-sm">
              {loading
                ? <span className="flex items-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" /></svg>Creating account…</span>
                : 'Create Account →'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5 text-muted text-xs">
            <div className="h-px flex-1 bg-border" />or continue with<div className="h-px flex-1 bg-border" />
          </div>

          <button onClick={() => toast('Google OAuth integration coming soon', { icon: '🔵' })}
            className="w-full bg-card2 border border-border rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:border-gold/30 transition-colors">
            <span className="text-lg">🔵</span> Continue with Google
          </button>

          <p className="text-center text-muted text-xs mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-gold hover:underline font-semibold">Sign in →</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
