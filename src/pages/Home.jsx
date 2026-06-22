import React from 'react'

export default function Home(){
  return (
    <div>
      <section className="bg-gradient-to-r from-emerald-50 to-white p-6 rounded-lg mb-6">
        <div className="md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold mb-2">Shiner Pickleball Club</h1>
            <p className="text-gray-700 mb-4">Indoor courts, leagues, lessons, and community events in Shiner, Texas.</p>
            <div className="space-x-3">
              <a href="/membership" className="inline-block bg-green-600 text-white px-4 py-2 rounded shadow">Join Now</a>
              <a href="/reservations" className="inline-block border border-green-600 text-green-600 px-4 py-2 rounded">Reserve a Court</a>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <div className="w-64 h-40 bg-gray-200 rounded shadow flex items-center justify-center text-gray-500">Photo placeholder</div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow-sm">
          <h3 className="font-semibold">Courts</h3>
          <p>4 indoor courts with lighting and ball machines.</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h3 className="font-semibold">Memberships</h3>
          <p>Monthly and annual plans with booking priority and discounts.</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h3 className="font-semibold">Events</h3>
          <p>Social mixers, leagues, and junior clinics.</p>
        </div>
      </section>
    </div>
  )
}
