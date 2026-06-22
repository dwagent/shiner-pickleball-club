import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchMembers, createMember, createCheckoutSession } from '../api'
import { useToast } from '../context/ToastContext'
import { PLANS } from '../config'

export default function Membership() {
  const [members, setMembers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('monthly')
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const toast = useToast()

  useEffect(() => {
    fetchMembers().then(setMembers).catch(() => setMembers([]))
  }, [])

  useEffect(() => {
    if (searchParams.get('success')) {
      toast('Welcome to the club! Your membership is confirmed.', 'success')
    }
    if (searchParams.get('cancelled')) {
      toast('Checkout cancelled — no charge was made.', 'warning')
    }
  }, [searchParams, toast])

  async function handleSignup(e) {
    e.preventDefault()
    if (!name.trim()) return toast('Please enter your full name.', 'error')

    setLoading(true)
    try {
      const url = await createCheckoutSession({
        name: name.trim(),
        email: email.trim(),
        plan: selectedPlan,
        origin: window.location.origin,
      })
      window.location.href = url
    } catch (stripeErr) {
      // Stripe not configured — fall back to direct signup (dev/staging)
      try {
        const m = await createMember({ name: name.trim(), plan: selectedPlan })
        setMembers(prev => [...prev, m])
        setName('')
        setEmail('')
        toast('You\'re signed up! Payment processing will be set up soon.', 'success')
      } catch (err) {
        toast(err.message || 'Sign-up failed — please try again.', 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  const plan = PLANS.find(p => p.id === selectedPlan) || PLANS[0]

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Membership</h1>
      <p className="text-gray-600 mb-8">Join Shiner Pickleball Club for priority bookings and member-only rates.</p>

      {/* Pricing cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {PLANS.map(p => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedPlan(p.id)}
            className={`relative text-left p-6 border-2 rounded-xl transition-all ${
              selectedPlan === p.id
                ? 'border-green-600 bg-green-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-green-300'
            }`}
          >
            {p.badge && (
              <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {p.badge}
              </span>
            )}
            <div className="font-bold text-gray-900 text-lg mb-0.5">{p.label}</div>
            <div className="text-2xl font-extrabold text-green-700 mb-1">{p.priceLabel}</div>
            <div className="text-sm text-gray-500 mb-4">{p.description}</div>
            <ul className="space-y-1">
              {p.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-green-600 font-bold">✓</span> {f}
                </li>
              ))}
            </ul>
            <div className={`mt-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selectedPlan === p.id ? 'border-green-600 bg-green-600' : 'border-gray-300'
            }`}>
              {selectedPlan === p.id && <span className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </button>
        ))}
      </div>

      {/* Sign-up form */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Join — {plan.label} ({plan.priceLabel})</h2>
          <form onSubmit={handleSignup} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jane Smith"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
              <select
                value={selectedPlan}
                onChange={e => setSelectedPlan(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {PLANS.map(p => (
                  <option key={p.id} value={p.id}>{p.label} — {p.priceLabel}</option>
                ))}
              </select>
            </div>
            <button
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              {loading ? 'Processing…' : 'Continue to Payment'}
            </button>
          </form>
        </div>

        {/* Member list */}
        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Current Members</h2>
          {members.length === 0 ? (
            <p className="text-sm text-gray-500">No members yet — be the first!</p>
          ) : (
            <ul className="space-y-2">
              {members.map(m => (
                <li key={m.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                  <span className="font-medium text-gray-900">{m.name}</span>
                  <span className="text-xs text-gray-500 bg-white border px-2 py-0.5 rounded-full capitalize">{m.plan}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
