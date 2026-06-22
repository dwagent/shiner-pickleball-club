import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Page from '../components/Page'
import SkeletonCard from '../components/SkeletonCard'
import { fetchEvents } from '../api'

function formatEventDate(date, time) {
  if (!date) return ''
  const d = new Date(`${date}T${time || '00:00'}:00`)
  const dateStr = d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  if (!time) return dateStr
  const timeStr = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  return `${dateStr} at ${timeStr}`
}

function downloadICS(event) {
  function escICS(str) {
    return String(str || '').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n')
  }
  const dt = event.time
    ? `${event.date.replace(/-/g, '')}T${event.time.replace(':', '')}00`
    : event.date.replace(/-/g, '')

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Shiner Pickleball Club//EN',
    'BEGIN:VEVENT',
    `UID:spc-${event.id}@shinerpickleball.com`,
    event.time ? `DTSTART;TZID=America/Chicago:${dt}` : `DTSTART;VALUE=DATE:${dt}`,
    `SUMMARY:${escICS(event.title)}`,
    event.desc ? `DESCRIPTION:${escICS(event.desc)}` : '',
    'LOCATION:Shiner Pickleball Club\\, 123 Main St\\, Shiner TX 77984',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\r\n')

  const blob = new Blob([lines], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${event.title.replace(/\s+/g, '-')}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents().then(setEvents).catch(() => setEvents([])).finally(() => setLoading(false))
  }, [])

  return (
    <Page>
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">Events</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Upcoming mixers, leagues, and clinics at Shiner Pickleball Club.</p>

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <SkeletonCard key={i} lines={2} />)}
        </div>
      )}

      {!loading && events.length === 0 && (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          <div className="text-5xl mb-3">📅</div>
          <div className="font-medium text-gray-600 dark:text-gray-400">No upcoming events</div>
          <div className="text-sm mt-1">Check back soon — new events are added regularly.</div>
        </div>
      )}

      <ul className="space-y-4">
        {events.map((e, i) => (
          <motion.li
            key={e.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="p-5 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">{e.title}</h3>
                {e.desc && <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{e.desc}</p>}
              </div>
              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 px-3 py-1.5 rounded-lg whitespace-nowrap">
                  {formatEventDate(e.date, e.time)}
                </div>
                <button
                  onClick={() => downloadICS(e)}
                  className="text-xs text-green-700 dark:text-green-400 hover:underline flex items-center gap-1"
                  title="Add to calendar"
                >
                  <span>📅</span> Add to Calendar
                </button>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </Page>
  )
}
