import React from 'react'
import { Link } from 'react-router-dom'
import { CLUB, COURTS, HOURS, PLANS } from '../config'

function PickleballIllustration() {
  return (
    <svg viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Court surface */}
      <rect width="320" height="210" rx="14" fill="#dcfce7" />
      <rect x="18" y="18" width="284" height="174" rx="8" fill="#4ade80" opacity="0.55" />

      {/* Court boundary */}
      <rect x="18" y="18" width="284" height="174" rx="6" fill="none" stroke="white" strokeWidth="2.5" />

      {/* Center line (vertical) */}
      <line x1="160" y1="18" x2="160" y2="192" stroke="white" strokeWidth="1.5" />

      {/* Net */}
      <rect x="18" y="99" width="284" height="11" rx="2" fill="white" opacity="0.85" />
      <line x1="160" y1="99" x2="160" y2="110" stroke="#d1fae5" strokeWidth="1.5" />

      {/* Kitchen (non-volley zone) lines */}
      <line x1="18" y1="63" x2="302" y2="63" stroke="white" strokeWidth="1.5" />
      <line x1="18" y1="147" x2="302" y2="147" stroke="white" strokeWidth="1.5" />

      {/* Kitchen shade */}
      <rect x="18" y="63" width="284" height="36" fill="white" opacity="0.08" />
      <rect x="18" y="111" width="284" height="36" fill="white" opacity="0.08" />

      {/* Paddle */}
      <g transform="translate(248, 95) rotate(22)">
        {/* Handle */}
        <rect x="-9" y="40" width="18" height="52" rx="6" fill="#166534" />
        {/* Grip wrap lines */}
        <line x1="-9" y1="50" x2="9" y2="50" stroke="#14532d" strokeWidth="2" />
        <line x1="-9" y1="60" x2="9" y2="60" stroke="#14532d" strokeWidth="2" />
        <line x1="-9" y1="70" x2="9" y2="70" stroke="#14532d" strokeWidth="2" />
        <line x1="-9" y1="80" x2="9" y2="80" stroke="#14532d" strokeWidth="2" />
        {/* Paddle head */}
        <rect x="-27" y="-50" width="54" height="92" rx="26" fill="#16a34a" />
        {/* Paddle face holes */}
        <circle cx="-14" cy="-32" r="3" fill="#15803d" opacity="0.8" />
        <circle cx="0" cy="-32" r="3" fill="#15803d" opacity="0.8" />
        <circle cx="14" cy="-32" r="3" fill="#15803d" opacity="0.8" />
        <circle cx="-14" cy="-18" r="3" fill="#15803d" opacity="0.8" />
        <circle cx="0" cy="-18" r="3" fill="#15803d" opacity="0.8" />
        <circle cx="14" cy="-18" r="3" fill="#15803d" opacity="0.8" />
        <circle cx="-14" cy="-4" r="3" fill="#15803d" opacity="0.8" />
        <circle cx="0" cy="-4" r="3" fill="#15803d" opacity="0.8" />
        <circle cx="14" cy="-4" r="3" fill="#15803d" opacity="0.8" />
        <circle cx="-14" cy="10" r="3" fill="#15803d" opacity="0.8" />
        <circle cx="0" cy="10" r="3" fill="#15803d" opacity="0.8" />
        <circle cx="14" cy="10" r="3" fill="#15803d" opacity="0.8" />
        <circle cx="-14" cy="24" r="3" fill="#15803d" opacity="0.8" />
        <circle cx="0" cy="24" r="3" fill="#15803d" opacity="0.8" />
        <circle cx="14" cy="24" r="3" fill="#15803d" opacity="0.8" />
        {/* Edge guard */}
        <rect x="-27" y="-50" width="54" height="92" rx="26" fill="none" stroke="#14532d" strokeWidth="3" />
      </g>

      {/* Ball */}
      <circle cx="90" cy="75" r="22" fill="#fef08a" stroke="#facc15" strokeWidth="2" />
      {/* Ball holes (perforated pattern) */}
      <circle cx="82" cy="67" r="3" fill="#eab308" />
      <circle cx="90" cy="67" r="3" fill="#eab308" />
      <circle cx="98" cy="67" r="3" fill="#eab308" />
      <circle cx="82" cy="75" r="3" fill="#eab308" />
      <circle cx="90" cy="75" r="3" fill="#eab308" />
      <circle cx="98" cy="75" r="3" fill="#eab308" />
      <circle cx="82" cy="83" r="3" fill="#eab308" />
      <circle cx="90" cy="83" r="3" fill="#eab308" />
      <circle cx="98" cy="83" r="3" fill="#eab308" />
      {/* Ball shadow */}
      <ellipse cx="90" cy="98" rx="18" ry="4" fill="#16a34a" opacity="0.3" />

      {/* "SP" branding text on court */}
      <text x="160" y="192" textAnchor="middle" fontSize="9" fill="white" opacity="0.5" fontWeight="bold" dy="-6">
        PICKLEBALL
      </text>
    </svg>
  )
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-green-50 border border-green-100 p-6 md:p-10 rounded-2xl mb-8 shadow-sm">
        <div className="md:flex md:items-center md:justify-between gap-8">
          <div className="flex-1">
            <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Shiner, Texas
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
              {CLUB.name}
            </h1>
            <p className="text-gray-600 text-lg mb-6 max-w-md">
              {CLUB.tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/membership"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow transition-colors"
              >
                Join Now
              </Link>
              <Link
                to="/reservations"
                className="border-2 border-green-600 text-green-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-green-50 transition-colors"
              >
                Reserve a Court
              </Link>
            </div>
          </div>
          <div className="mt-8 md:mt-0 w-full md:w-80 shrink-0">
            <PickleballIllustration />
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl mb-2">🏟️</div>
          <h3 className="font-bold text-gray-900 mb-1">Courts</h3>
          <p className="text-sm text-gray-600">{COURTS.description}</p>
          <div className="text-xs text-gray-400 mt-2">Open {HOURS.label}</div>
        </div>
        <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl mb-2">🏅</div>
          <h3 className="font-bold text-gray-900 mb-1">Memberships</h3>
          <p className="text-sm text-gray-600">
            Monthly at ${PLANS[0].price}/mo or annual at ${PLANS[1].price}/yr — priority bookings and member rates.
          </p>
          <Link to="/membership" className="text-xs text-green-700 font-medium mt-2 inline-block hover:underline">
            View plans →
          </Link>
        </div>
        <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl mb-2">🎉</div>
          <h3 className="font-bold text-gray-900 mb-1">Events</h3>
          <p className="text-sm text-gray-600">Social mixers, competitive leagues, and junior clinics for all skill levels.</p>
          <Link to="/events" className="text-xs text-green-700 font-medium mt-2 inline-block hover:underline">
            See upcoming events →
          </Link>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-green-700 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-bold text-lg">Ready to play?</div>
          <div className="text-green-200 text-sm">Book a court online in under a minute.</div>
        </div>
        <Link
          to="/reservations"
          className="bg-white text-green-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-green-50 transition-colors shrink-0"
        >
          Book a Court
        </Link>
      </section>
    </div>
  )
}
