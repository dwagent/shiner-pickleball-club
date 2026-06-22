import React, { useEffect, useState } from 'react'
import { fetchMembers, createMember } from '../api'

export default function Membership(){
  const [members, setMembers] = useState([])
  const [name, setName] = useState('')
  const [plan, setPlan] = useState('Monthly')
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    fetchMembers().then(setMembers).catch(()=>setMembers([]))
  },[])

  async function handleSignup(e){
    e.preventDefault()
    setLoading(true)
    try{
      const m = await createMember({ name, plan })
      setMembers(prev=>[...prev, m])
      setName('')
    }catch(err){
      console.error(err)
      alert('Signup failed (demo).')
    }finally{ setLoading(false) }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Membership</h1>
      <p className="mb-4">Join Shiner Pickleball Club — get priority bookings and member rates.</p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Sign up (demo)</h3>
          <form onSubmit={handleSignup} className="space-y-2 mt-2">
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full border px-2 py-1 rounded" required />
            <select value={plan} onChange={e=>setPlan(e.target.value)} className="w-full border px-2 py-1 rounded">
              <option>Monthly</option>
              <option>Annual</option>
            </select>
            <button disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">{loading? 'Signing...' : 'Sign Up (demo)'}</button>
          </form>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Current Members (demo)</h3>
          <ul className="mt-2 space-y-2">
            {members.map(m=> (
              <li key={m.id} className="p-2 border rounded flex justify-between">
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-gray-600">{m.plan}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
