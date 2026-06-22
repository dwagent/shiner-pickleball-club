import React, { useEffect, useState } from 'react'
import { fetchEvents } from '../api'

export default function Events(){
  const [events, setEvents] = useState([])
  useEffect(()=>{ fetchEvents().then(setEvents).catch(()=>setEvents([])) },[])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <ul className="space-y-4">
        {events.map(e=> (
          <li key={e.id} className="p-4 border rounded">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{e.title}</h3>
                <p className="text-sm text-gray-600">{e.desc}</p>
              </div>
              <div className="text-sm text-gray-500">{e.date}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
