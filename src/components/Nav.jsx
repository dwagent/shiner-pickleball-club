import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav(){
  return (
    <header className="bg-gradient-to-r from-green-700 to-emerald-600 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl flex items-center gap-3">
          <div className="w-8 h-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center">SP</div>
          <span>Shiner Pickleball Club</span>
        </Link>
        <nav className="space-x-4 text-sm">
          <Link to="/events" className="hover:underline">Events</Link>
          <Link to="/membership" className="hover:underline">Membership</Link>
          <Link to="/reservations" className="hover:underline">Reservations</Link>
          <Link to="/admin" className="hover:underline">Admin</Link>
          <Link to="/membership" className="ml-4 inline-block bg-white text-green-700 px-3 py-1 rounded shadow-sm">Join</Link>
        </nav>
      </div>
    </header>
  )
}
