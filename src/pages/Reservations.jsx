import React, { useEffect, useState } from 'react'
import { fetchReservations, createReservation } from '../api'

function overlaps(aStart, aEnd, bStart, bEnd){
  return (aStart < bEnd) && (bStart < aEnd)
}

export default function Reservations(){
  const [reservations, setReservations] = useState([])
  const [court, setCourt] = useState(1)
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('18:00')
  const [duration, setDuration] = useState(60)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    fetchReservations().then(setReservations).catch(()=>setReservations([]))
  },[])

  async function handleReserve(e){
    e.preventDefault()
    if(!date) return alert('Select a date')
    const start = new Date(`${date}T${startTime}:00`)
    const end = new Date(start.getTime() + duration*60000)

    const conflict = reservations.some(r=> r.court === Number(court) && overlaps(new Date(r.start), new Date(r.end), start, end))
    if(conflict) return alert('Selected slot conflicts with existing reservation')

    setLoading(true)
    try{
      const r = await createReservation({ court: Number(court), start: start.toISOString(), end: end.toISOString() })
      setReservations(prev=>[...prev, r])
      alert('Reserved (demo)')
    }catch(err){
      console.error(err)
      alert('Reservation failed')
    }finally{ setLoading(false) }
  }

  // calendar week setup
  const startOfWeek = (d)=>{
    const date = new Date(d)
    const day = date.getDay() // 0 Sun .. 6 Sat
    const diff = date.getDate() - day + 1 // make week start Monday
    return new Date(date.setDate(diff))
  }

  const weekStart = startOfWeek(new Date())
  const days = Array.from({length:7}).map((_,i)=>{
    const dt = new Date(weekStart)
    dt.setDate(weekStart.getDate()+i)
    return dt
  })

  const times = []
  for(let h=8; h<=21; h++) times.push(h)

  function cellReservationFor(day, hour){
    const matching = reservations.find(r=>{
      const s = new Date(r.start)
      return s.getFullYear()===day.getFullYear() && s.getMonth()===day.getMonth() && s.getDate()===day.getDate() && s.getHours()===hour
    })
    return matching
  }

  function handleCellClick(day, hour){
    const d = day.toISOString().slice(0,10)
    const hh = String(hour).padStart(2,'0')+":00"
    setDate(d)
    setStartTime(hh)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Court Reservations</h1>
      <p className="mb-4">Select a court, date and time to reserve your spot. Click a slot to prefill the form above.</p>

      <div className="p-4 border rounded mb-6">
        <form onSubmit={handleReserve} className="grid md:grid-cols-4 gap-2">
          <select value={court} onChange={e=>setCourt(e.target.value)} className="border px-2 py-1 rounded">
            <option value={1}>Court 1</option>
            <option value={2}>Court 2</option>
            <option value={3}>Court 3</option>
            <option value={4}>Court 4</option>
          </select>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border px-2 py-1 rounded" />
          <input type="time" value={startTime} onChange={e=>setStartTime(e.target.value)} className="border px-2 py-1 rounded" />
          <div className="flex items-center">
            <input type="number" min={30} step={30} value={duration} onChange={e=>setDuration(Number(e.target.value))} className="w-24 border px-2 py-1 rounded mr-2" />
            <button disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">{loading? 'Reserving...' : 'Reserve (demo)'}</button>
          </div>
        </form>
      </div>

      <div className="overflow-auto">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr>
              <th className="w-20 p-2 border bg-gray-50">Time</th>
              {days.map((d,idx)=> (
                <th key={idx} className="p-2 border text-left">{d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map(hour=> (
              <tr key={hour} className="align-top">
                <td className="p-2 border text-sm">{String(hour).padStart(2,'0')}:00</td>
                {days.map((d,di)=>{
                  const r = cellReservationFor(d, hour)
                  return (
                    <td key={di} onClick={()=>!r && handleCellClick(d, hour)} className={`p-2 border h-16 align-top ${r? 'bg-red-50 cursor-default':'hover:bg-green-50 cursor-pointer'}`}>
                      {r ? (
                        <div className="text-sm">Court {r.court} — <span className="text-xs text-gray-600">Reserved</span></div>
                      ) : (
                        <div className="text-sm text-gray-400">Available</div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
