import React, { useState } from 'react'
import Page from '../components/Page'
import { sendContact } from '../api'
import { useToast } from '../context/ToastContext'
import { CLUB } from '../config'

// Shiner, TX — OpenStreetMap embed (no API key required)
const MAP_URL = 'https://www.openstreetmap.org/export/embed.html?bbox=-97.29%2C29.41%2C-97.24%2C29.48&layer=mapnik&marker=29.4446%2C-97.2641'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const toast = useToast()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return toast('Please fill in all fields.', 'error')
    setLoading(true)
    try {
      await sendContact({ name: name.trim(), email: email.trim(), message: message.trim() })
      setSent(true)
      toast('Message sent! We\'ll get back to you soon.', 'success')
    } catch (err) {
      toast(err.message || 'Failed to send — try calling us instead.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">Contact Us</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Questions about memberships, courts, or events? We're happy to help.</p>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Info + form */}
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-1 gap-4">
            {[
              { label: 'Address', value: CLUB.address, href: null },
              { label: 'Phone', value: CLUB.phone, href: `tel:${CLUB.phone}` },
              { label: 'Email', value: CLUB.email, href: `mailto:${CLUB.email}` },
            ].map(({ label, value, href }) => (
              <div key={label} className="p-4 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">{label}</div>
                {href ? (
                  <a href={href} className="text-gray-800 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400">{value}</a>
                ) : (
                  <div className="text-gray-800 dark:text-gray-200">{value}</div>
                )}
              </div>
            ))}
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-3 p-5 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
              <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Send a Message</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@example.com"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} placeholder="How can we help?"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none resize-none" required />
              </div>
              <button disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors">
                {loading ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
              <div className="text-4xl mb-3">✅</div>
              <div className="font-bold text-gray-900 dark:text-gray-100">Message sent!</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">We'll get back to you as soon as possible.</div>
              <button onClick={() => { setSent(false); setName(''); setEmail(''); setMessage('') }}
                className="mt-4 text-sm text-green-700 dark:text-green-400 underline hover:no-underline">
                Send another message
              </button>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="rounded-xl overflow-hidden border dark:border-gray-700 shadow-sm h-[480px] md:h-auto">
          <iframe
            title="Shiner Pickleball Club location"
            src={MAP_URL}
            className="w-full h-full min-h-[300px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Page>
  )
}
