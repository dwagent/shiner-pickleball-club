import React from 'react'
import { Link } from 'react-router-dom'
import { CLUB } from '../config'

const QUICK_LINKS = [
  { to: '/events', label: 'Events' },
  { to: '/membership', label: 'Membership' },
  { to: '/reservations', label: 'Book a Court' },
  { to: '/league', label: 'League Standings' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mt-12 border-t dark:border-gray-700 dark-transition">
      <div className="container mx-auto px-4 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <div className="font-bold text-gray-900 dark:text-gray-100 mb-2">{CLUB.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {CLUB.address}
          </div>
          <div className="mt-3 space-y-1 text-sm">
            <div><a href={`tel:${CLUB.phone}`} className="hover:text-green-700 dark:hover:text-green-400">{CLUB.phone}</a></div>
            <div><a href={`mailto:${CLUB.email}`} className="hover:text-green-700 dark:hover:text-green-400">{CLUB.email}</a></div>
          </div>
        </div>

        <div>
          <div className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-3">Quick Links</div>
          <ul className="space-y-1.5">
            {QUICK_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 sm:text-right self-end">
          <div>© {new Date().getFullYear()} {CLUB.name}</div>
          <div className="mt-1 text-xs">All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
