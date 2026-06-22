const API_BASE = '/api'

async function request(url, options = {}) {
  let res
  try {
    res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    })
  } catch {
    throw new Error('Network error — check your connection and try again.')
  }

  if (!res.ok) {
    let msg = `Server error (${res.status})`
    try {
      const body = await res.json()
      if (body && body.error) msg = body.error
    } catch {}
    throw new Error(msg)
  }

  return res.json()
}

export const fetchMembers = () =>
  request(`${API_BASE}/members`)

export const createMember = member =>
  request(`${API_BASE}/members`, { method: 'POST', body: JSON.stringify(member) })

export const fetchReservations = () =>
  request(`${API_BASE}/reservations`)

export const createReservation = reservation =>
  request(`${API_BASE}/reservations`, { method: 'POST', body: JSON.stringify(reservation) })

export const deleteReservation = id =>
  request(`${API_BASE}/reservations?id=${id}`, { method: 'DELETE' })

export const fetchEvents = () =>
  request(`${API_BASE}/events`)

export const createEvent = evt =>
  request(`${API_BASE}/events`, { method: 'POST', body: JSON.stringify(evt) })

export const deleteEvent = id =>
  request(`${API_BASE}/events?id=${id}`, { method: 'DELETE' })

export const sendContact = data =>
  request(`${API_BASE}/contact`, { method: 'POST', body: JSON.stringify(data) })

export const adminLogin = password =>
  request(`${API_BASE}/admin-auth`, { method: 'POST', body: JSON.stringify({ password }) })

export async function createCheckoutSession({ name, email, plan, origin }) {
  const data = await request(`${API_BASE}/create-checkout`, {
    method: 'POST',
    body: JSON.stringify({ name, email, plan, origin }),
  })
  return data.url
}
