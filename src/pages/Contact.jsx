import React, { useState } from 'react'
import { sendContact } from '../api'
import { useToast } from '../context/ToastContext'
import { CLUB } from '../config'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const toast = useToast()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      return toast('Please fill in all fields.', 'error')
    }
    setLoading(true)
    try {
      await sendContact({ name: name.trim(), email: email.trim(), message: message.trim() })
      setSent(true)
      toast('Message sent! We\'ll get back to you soon.', 'success')
    } catch (err) {
      toast(err.message || 'Failed to send message — please try again or call us.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-8">Questions about memberships, events, or court availability? Reach out.</p>

      <div className="grid sm:grid-cols-2 gap-8 mb-10">
        <div className="space-y-4">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Address</div>
            <div className="text-gray-800">{CLUB.address}</div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Phone</div>
            <a href={`tel:${CLUB.phone}`} className="text-green-700 hover:underline">{CLUB.phone}</a>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email</div>
            <a href={`mailto:${CLUB.email}`} className="text-green-700 hover:underline">{CLUB.email}</a>
          </div>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your name</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jane Smith"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
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
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={4}
                placeholder="How can we help?"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                required
              />
            </div>
            <button
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              {loading ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 bg-green-50 border border-green-200 rounded-xl">
            <div className="text-4xl mb-3">✅</div>
            <div className="font-bold text-gray-900">Message sent!</div>
            <div className="text-sm text-gray-600 mt-1">We'll get back to you as soon as possible.</div>
            <button
              onClick={() => { setSent(false); setName(''); setEmail(''); setMessage('') }}
              className="mt-4 text-sm text-green-700 underline hover:no-underline"
            >
              Send another message
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
