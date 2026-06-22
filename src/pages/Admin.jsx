import React, { useEffect, useState } from 'react'
import { fetchMembers, fetchReservations, fetchEvents, deleteReservation, createEvent, deleteEvent } from '../api'

export default function Admin(){
  const [members, setMembers] = useState([])
  const [reservations, setReservations] = useState([])
  const [events, setEvents] = useState([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(()=>{
    fetchMembers().then(setMembers).catch(()=>setMembers([]))
    fetchReservations().then(setReservations).catch(()=>setReservations([]))
    fetchEvents().then(setEvents).catch(()=>setEvents([]))
  },[])

  async function handleDeleteReservation(id){
    await deleteReservation(id)
    setReservations(prev=>prev.filter(r=>r.id!==id))
  }

  async function handleCreateEvent(e){
    e.preventDefault()
    const newE = await createEvent({ title, date, desc })
    setEvents(prev=>[...prev, newE])
    setTitle(''); setDate(''); setDesc('')
  }

  async function handleDeleteEvent(id){
    await deleteEvent(id)
    setEvents(prev=>prev.filter(x=>x.id!==id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Members (demo)</h2>
          <ul className="space-y-2">
            {members.map(m=> <li key={m.id} className="p-2 border rounded">{m.name} — {m.plan}</li>)}
          </ul>
        </section>

        <section className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Create Event (demo)</h2>
          <form onSubmit={handleCreateEvent} className="space-y-2">
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full border px-2 py-1 rounded" required />
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full border px-2 py-1 rounded" required />
            <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Short description" className="w-full border px-2 py-1 rounded" />
            <button className="bg-green-600 text-white px-4 py-2 rounded">Create Event</button>
          </form>
        </section>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <section className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Reservations (demo)</h2>
          <ul className="space-y-2">
            {reservations.map(r=> (
              <li key={r.id} className="p-2 border rounded flex justify-between items-center">
                <div>#{r.id} — Court {r.court} — {new Date(r.start).toLocaleString()}</div>
                <button onClick={()=>handleDeleteReservation(r.id)} className="text-sm text-red-600">Cancel</button>
              </li>
            ))}
          </ul>
        </section>

        <section className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Events (demo)</h2>
          <ul className="space-y-2">
            {events.map(e=> (
              <li key={e.id} className="p-2 border rounded flex justify-between items-center">
                <div>{e.title} — {e.date}</div>
                <div className="space-x-2">
                  <button onClick={()=>handleDeleteEvent(e.id)} className="text-sm text-red-600">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
