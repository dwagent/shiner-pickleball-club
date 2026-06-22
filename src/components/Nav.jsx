import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDarkMode } from '../context/DarkModeContext'

const NAV_LINKS = [
  { to: '/events', label: 'Events' },
  { to: '/membership', label: 'Membership' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/league', label: 'League' },
  { to: '/contact', label: 'Contact' },
]

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { dark, toggle } = useDarkMode()

  function close() { setOpen(false) }

  return (
    <header className="bg-gradient-to-r from-green-700 to-emerald-600 text-white shadow sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3.5 flex items-center justify-between">
        <Link to="/" onClick={close} className="font-bold text-xl flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center font-bold text-sm">SP</div>
          <span className="hidden sm:inline">Shiner Pickleball Club</span>
          <span className="sm:hidden font-bold">SPC</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-4 text-sm">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`hover:underline underline-offset-2 transition-opacity ${pathname === to ? 'font-semibold' : 'opacity-90 hover:opacity-100'}`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={toggle}
            className="ml-1 p-1.5 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <Link
            to="/membership"
            className="ml-1 bg-white text-green-700 font-semibold px-4 py-1.5 rounded-lg shadow-sm hover:bg-green-50 transition-colors"
          >
            Join Now
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            className="p-1.5 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
            aria-label={dark ? 'Light mode' : 'Dark mode'}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className="flex flex-col justify-center gap-1.5 p-2 -mr-2"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
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
              className="mt-3 text-center bg-white text-green-700 font-semibold px-4 py-2 rounded-lg shadow-sm"
            >
              Join Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
