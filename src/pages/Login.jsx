import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuctionStore from '../hooks/useAuctionStore'

export default function Login() {
  const navigate   = useNavigate()
  const location   = useLocation()
  const login      = useAuctionStore(s => s.login)
  const isLoggedIn = useAuctionStore(s => s.isLoggedIn)
  const from       = location.state?.from || '/dashboard'

  const [form, setForm]     = useState({ email: '', password: '', remember: false })
  const [errors, setErrors] = useState({})
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  if (isLoggedIn) { navigate(from); return null }

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.email.trim())    e.email    = 'Email is required'
    if (!form.password.trim()) e.password = 'Password is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    const result = login(form.email, form.password)
    setLoading(false)
    if (result.success) {
      toast.success('Welcome back! 👋')
      navigate(from)
    } else {
      toast.error(result.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-[#0d0d0d] to-black page-enter">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="w-10 h-1 bg-gold rounded-full mb-7" />
          <h1 className="font-serif text-3xl font-bold mb-1">Welcome Back</h1>
          <p className="text-muted text-sm mb-8">Sign in to manage your bids, watchlist and profile.</p>

          {/* Demo hint */}
          <div className="bg-gold/5 border border-gold/15 rounded-xl p-3.5 mb-6 text-xs text-muted">
            <span className="text-gold font-semibold">Demo:</span> Enter any email and password to sign in.
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="label-gold">Email Address <span className="text-red-400">*</span></label>
              <input type="email" className={`input-dark ${errors.email ? 'border-red-500' : ''}`}
                placeholder="your@email.ie" value={form.email} onChange={set('email')} autoComplete="email" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="label-gold">Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'}
                  className={`input-dark pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="••••••••" value={form.password} onChange={set('password')} autoComplete="current-password" />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-gold transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-muted text-xs">
                <input type="checkbox" checked={form.remember} onChange={set('remember')} className="accent-gold" />
                Remember me
              </label>
              <button type="button" onClick={() => toast('Password reset email sent!', { icon: '📧' })}
                className="text-gold text-xs hover:underline font-semibold">
                Forgot password?
              </button>
            </div>

            <button type="submit" disabled={loading}
              className="btn-gold w-full justify-center py-4 mt-2 disabled:opacity-60 text-sm">
              {loading
                ? <span className="flex items-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" /></svg>Signing in…</span>
                : 'Sign In →'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5 text-muted text-xs">
            <div className="h-px flex-1 bg-border" />or<div className="h-px flex-1 bg-border" />
          </div>

          <button onClick={() => { login('demo@davidgolding.ie', 'demo'); toast.success('Signed in with Google!'); navigate(from) }}
            className="w-full bg-card2 border border-border rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:border-gold/30 transition-colors">
            <span className="text-lg">🔵</span> Continue with Google
          </button>

          <p className="text-center text-muted text-xs mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold hover:underline font-semibold">Register free →</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
