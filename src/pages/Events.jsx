import React, { useEffect, useState } from 'react'
import { fetchEvents } from '../api'

function formatEventDate(date, time) {
  if (!date) return ''
  const d = new Date(`${date}T${time || '00:00'}:00`)
  const dateStr = d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  if (!time) return dateStr
  const timeStr = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  return `${dateStr} at ${timeStr}`
}

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Events</h1>
      <p className="text-gray-600 mb-8">Upcoming mixers, leagues, and clinics at Shiner Pickleball Club.</p>

      {loading && (
        <div className="text-gray-400 text-sm">Loading events…</div>
      )}

      {!loading && events.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">📅</div>
          <div className="font-medium">No upcoming events</div>
          <div className="text-sm mt-1">Check back soon — new events are added regularly.</div>
        </div>
      )}

      <ul className="space-y-4">
        {events.map(e => (
          <li key={e.id} className="p-5 border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{e.title}</h3>
                {e.desc && <p className="text-gray-600 text-sm mt-1">{e.desc}</p>}
              </div>
              <div className="shrink-0 text-sm text-gray-500 bg-gray-50 border px-3 py-1.5 rounded-lg whitespace-nowrap">
                {formatEventDate(e.date, e.time)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
