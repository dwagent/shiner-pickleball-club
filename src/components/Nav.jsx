import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/events', label: 'Events' },
  { to: '/membership', label: 'Membership' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  function close() { setOpen(false) }

  return (
    <header className="bg-gradient-to-r from-green-700 to-emerald-600 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" onClick={close} className="font-bold text-xl flex items-center gap-3">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center font-bold text-sm">SP</div>
          <span className="hidden sm:inline">Shiner Pickleball Club</span>
          <span className="sm:hidden">SPC</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`hover:underline underline-offset-2 ${pathname === to ? 'font-semibold' : ''}`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/membership"
            className="ml-2 bg-white text-green-700 font-semibold px-4 py-1.5 rounded shadow-sm hover:bg-green-50 transition-colors"
          >
            Join Now
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 -mr-2"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-green-600 bg-green-700">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={close}
                className={`py-2.5 text-sm border-b border-green-600 hover:pl-2 transition-all ${pathname === to ? 'font-semibold' : ''}`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/membership"
              onClick={close}
              className="mt-3 text-center bg-white text-green-700 font-semibold px-4 py-2 rounded shadow-sm"
            >
              Join Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
