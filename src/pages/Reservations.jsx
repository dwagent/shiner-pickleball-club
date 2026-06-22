import React, { useEffect, useState } from 'react'
import Page from '../components/Page'
import { fetchReservations, createReservation } from '../api'
import { useToast } from '../context/ToastContext'
import { COURTS, HOURS, DEFAULT_BOOKING_TIME, DEFAULT_BOOKING_DURATION } from '../config'

function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd
}

function toLocalISO(date) {
  const pad = n => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

function startOfWeek(d) {
  const date = new Date(d)
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)
  return new Date(date.setDate(diff))
}

export default function Reservations() {
  const [reservations, setReservations] = useState([])
  const [court, setCourt] = useState(COURTS.numbers[0])
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState(DEFAULT_BOOKING_TIME)
  const [duration, setDuration] = useState(DEFAULT_BOOKING_DURATION)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    fetchReservations().then(setReservations).catch(() => setReservations([]))
  }, [])

  async function handleReserve(e) {
    e.preventDefault()
    if (!date) return toast('Please select a date.', 'error')

    const [h] = startTime.split(':').map(Number)
    if (h < HOURS.open || h >= HOURS.close) {
      return toast(`Reservations are only available between ${HOURS.label}.`, 'error')
    }

    const start = new Date(`${date}T${startTime}:00`)
    const end = new Date(start.getTime() + duration * 60000)

    const conflict = reservations.some(
      r => r.court === Number(court) && overlaps(new Date(r.start), new Date(r.end), start, end)
    )
    if (conflict) return toast('That slot conflicts with an existing reservation — pick another time.', 'error')

    setLoading(true)
    try {
      const r = await createReservation({ court: Number(court), start: toLocalISO(start), end: toLocalISO(end) })
      setReservations(prev => [...prev, r])
      toast(`Court ${court} reserved on ${start.toLocaleDateString()} at ${startTime}.`, 'success')
    } catch (err) {
      toast(err.message || 'Reservation failed — please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const weekStart = startOfWeek(new Date())
  const days = Array.from({ length: 7 }, (_, i) => {
    const dt = new Date(weekStart)
    dt.setDate(weekStart.getDate() + i)
    return dt
  })
  const times = []
  for (let h = HOURS.open; h < HOURS.close; h++) times.push(h)

  function cellReservationFor(day, hour) {
    return reservations.find(r => {
      const s = new Date(r.start)
      return s.getFullYear() === day.getFullYear() && s.getMonth() === day.getMonth() &&
        s.getDate() === day.getDate() && s.getHours() === hour
    })
  }

  function handleCellClick(day, hour) {
    setDate(day.toISOString().slice(0, 10))
    setStartTime(String(hour).padStart(2, '0') + ':00')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Page>
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">Court Reservations</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Book a court during open hours ({HOURS.label}). Click a calendar slot to pre-fill the form.
      </p>

      <div className="p-5 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm mb-8">
        <form onSubmit={handleReserve} className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Court</label>
            <select value={court} onChange={e => setCourt(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none">
              {COURTS.numbers.map(n => <option key={n} value={n}>Court {n}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Start time</label>
            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)}
              min={`${String(HOURS.open).padStart(2,'0')}:00`}
              max={`${String(HOURS.close - 1).padStart(2,'0')}:30`}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Duration (min)</label>
            <div className="flex gap-2">
              <input type="number" min={30} max={120} step={30} value={duration} onChange={e => setDuration(Number(e.target.value))}
                className="w-24 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
              <button disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                {loading ? 'Booking…' : 'Reserve'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="overflow-x-auto rounded-xl border dark:border-gray-700 shadow-sm">
        <table className="w-full min-w-[640px] table-fixed border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="w-16 p-2 border-b dark:border-gray-700 border-r dark:border-r-gray-700 text-gray-500 dark:text-gray-400 font-medium text-xs">Time</th>
              {days.map((d, i) => (
                <th key={i} className="p-2 border-b dark:border-gray-700 text-left font-medium text-gray-700 dark:text-gray-300 text-xs">
                  {d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map(hour => (
              <tr key={hour} className="align-top">
                <td className="p-2 border-b dark:border-gray-700 border-r dark:border-r-gray-700 text-xs text-gray-400 dark:text-gray-500 font-mono bg-gray-50 dark:bg-gray-800">
                  {String(hour).padStart(2, '0')}:00
                </td>
                {days.map((d, di) => {
                  const r = cellReservationFor(d, hour)
                  return (
                    <td key={di} onClick={() => !r && handleCellClick(d, hour)}
                      className={`p-2 border-b dark:border-gray-700 h-14 align-top text-xs transition-colors ${
                        r ? 'bg-red-50 dark:bg-red-900/20 cursor-default' : 'bg-white dark:bg-gray-900 hover:bg-green-50 dark:hover:bg-green-900/20 cursor-pointer'
                      }`}>
                      {r ? (
                        <span className="text-red-600 dark:text-red-400 font-medium">Ct {r.court} — Reserved</span>
                      ) : (
                        <span className="text-gray-200 dark:text-gray-700">Available</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  )
}
