const API_BASE = '/api'

export async function fetchMembers(){
  const res = await fetch(`${API_BASE}/members`, { headers: { 'Accept': 'application/json' } })
  return res.json()
}

export async function createMember(member){
  const res = await fetch(`${API_BASE}/members`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(member)
  })
  return res.json()
}

export async function fetchReservations(){
  const res = await fetch(`${API_BASE}/reservations`, { headers: { 'Accept': 'application/json' } })
  return res.json()
}

export async function createReservation(reservation){
  const res = await fetch(`${API_BASE}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reservation)
  })
  return res.json()
}

export async function deleteReservation(id){
  const res = await fetch(`${API_BASE}/reservations?id=${id}`, { method: 'DELETE' })
  return res.json()
}

export async function fetchEvents(){
  const res = await fetch(`${API_BASE}/events`, { headers: { 'Accept': 'application/json' } })
  return res.json()
}

export async function createEvent(evt){
  const res = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(evt)
  })
  return res.json()
}

export async function deleteEvent(id){
  const res = await fetch(`${API_BASE}/events?id=${id}`, { method: 'DELETE' })
  return res.json()
}

export default { fetchMembers, createMember, fetchReservations, createReservation }
