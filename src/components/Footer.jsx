import React from 'react'
import { Link } from 'react-router-dom'
import { CLUB } from '../config'

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 mt-12 border-t">
      <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-bold text-gray-900 mb-1">{CLUB.name}</div>
          <div className="text-sm text-gray-600">{CLUB.address}</div>
        </div>

        <div>
          <div className="font-semibold text-sm text-gray-800 mb-2">Contact</div>
          <div className="text-sm space-y-1">
            <div>
              <a href={`tel:${CLUB.phone}`} className="hover:text-green-700">{CLUB.phone}</a>
            </div>
            <div>
              <a href={`mailto:${CLUB.email}`} className="hover:text-green-700">{CLUB.email}</a>
            </div>
            <div>
              <Link to="/contact" className="hover:text-green-700 underline underline-offset-2">Send a message</Link>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500 md:text-right self-end">
          © {new Date().getFullYear()} {CLUB.name}
        </div>
      </div>
    </footer>
  )
}
