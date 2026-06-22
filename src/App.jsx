import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Membership from './pages/Membership'
import Reservations from './pages/Reservations'
import Events from './pages/Events'
import Admin from './pages/Admin'

export default function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/membership" element={<Membership/>} />
            <Route path="/reservations" element={<Reservations/>} />
            <Route path="/events" element={<Events/>} />
            <Route path="/admin" element={<Admin/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
