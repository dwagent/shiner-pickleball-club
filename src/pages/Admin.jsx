import React, { useEffect, useState } from 'react'
import { fetchMembers, fetchReservations, fetchEvents, deleteReservation, createEvent, deleteEvent, adminLogin } from '../api'
import { useToast } from '../context/ToastContext'

function LoginGate({ onAuthed }) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const toast = useToast()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const { token } = await adminLogin(password)
      sessionStorage.setItem('adminToken', token)
      onAuthed(token)
    } catch (err) {
      setError('Incorrect password.')
      toast('Login failed — check your password.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16">
      <div className="p-8 border rounded-xl bg-white shadow">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🔒</div>
          <h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">Access restricted to club administrators.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-gray-300 px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
            autoFocus
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {loading ? 'Checking…' : 'Log In'}
          </button>
        </form>
      </div>
      <p className="text-center text-xs text-gray-400 mt-4">
        Set the <code className="bg-gray-100 px-1 rounded">ADMIN_PASSWORD</code> environment variable in your Azure SWA settings.
      </p>
    </div>
  )
}

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem('adminToken'))
  const [members, setMembers] = useState([])
  const [reservations, setReservations] = useState([])
  const [events, setEvents] = useState([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [desc, setDesc] = useState('')
  const [eventLoading, setEventLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (!token) return
    fetchMembers().then(setMembers).catch(() => setMembers([]))
    fetchReservations().then(setReservations).catch(() => setReservations([]))
    fetchEvents().then(setEvents).catch(() => setEvents([]))
  }, [token])

  if (!token) return <LoginGate onAuthed={setToken} />

  async function handleDeleteReservation(id) {
    try {
      await deleteReservation(id)
      setReservations(prev => prev.filter(r => r.id !== id))
      toast('Reservation cancelled.', 'success')
    } catch (err) {
      toast(err.message || 'Failed to cancel reservation.', 'error')
    }
  }

  async function handleCreateEvent(e) {
    e.preventDefault()
    setEventLoading(true)
    try {
      const newE = await createEvent({ title, date, time, desc })
      setEvents(prev => [...prev, newE])
      setTitle(''); setDate(''); setTime(''); setDesc('')
      toast(`Event "${newE.title}" created.`, 'success')
    } catch (err) {
      toast(err.message || 'Failed to create event.', 'error')
    } finally {
      setEventLoading(false)
    }
  }

  async function handleDeleteEvent(id) {
    try {
      await deleteEvent(id)
      setEvents(prev => prev.filter(x => x.id !== id))
      toast('Event deleted.', 'success')
    } catch (err) {
      toast(err.message || 'Failed to delete event.', 'error')
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('adminToken')
    setToken(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
        <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-700 underline">
          Log out
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Members */}
        <section className="p-5 border rounded-xl bg-white shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">Members ({members.length})</h2>
          {members.length === 0 ? (
            <p className="text-sm text-gray-400">No members yet.</p>
          ) : (
            <ul className="space-y-2">
              {members.map(m => (
                <li key={m.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg text-sm">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-gray-500 capitalize">{m.plan}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Create event */}
        <section className="p-5 border rounded-xl bg-white shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">Create Event</h2>
          <form onSubmit={handleCreateEvent} className="space-y-2">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Event title"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm"
              required
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm"
                required
              />
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm"
              />
            </div>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Short description (optional)"
              rows={2}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm resize-none"
            />
            <button
              disabled={eventLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
            >
              {eventLoading ? 'Creating…' : 'Create Event'}
            </button>
          </form>
        </section>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Reservations */}
        <section className="p-5 border rounded-xl bg-white shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">Reservations ({reservations.length})</h2>
          {reservations.length === 0 ? (
            <p className="text-sm text-gray-400">No reservations.</p>
          ) : (
            <ul className="space-y-2">
              {reservations.map(r => (
                <li key={r.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg text-sm">
                  <div>
                    <span className="font-medium">Court {r.court}</span>
                    <span className="text-gray-500 ml-2">{new Date(r.start).toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteReservation(r.id)}
                    className="text-red-500 hover:text-red-700 text-xs font-medium ml-2"
                  >
                    Cancel
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Events */}
        <section className="p-5 border rounded-xl bg-white shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">Events ({events.length})</h2>
          {events.length === 0 ? (
            <p className="text-sm text-gray-400">No events yet.</p>
          ) : (
            <ul className="space-y-2">
              {events.map(e => (
                <li key={e.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg text-sm">
                  <div>
                    <span className="font-medium">{e.title}</span>
                    <span className="text-gray-500 ml-2">
                      {e.date}{e.time ? ` at ${e.time}` : ''}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(e.id)}
                    className="text-red-500 hover:text-red-700 text-xs font-medium ml-2"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
