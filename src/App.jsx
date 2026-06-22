import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Membership from './pages/Membership'
import Reservations from './pages/Reservations'
import Events from './pages/Events'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import League from './pages/League'
import Admin from './pages/Admin'
import { ToastProvider } from './context/ToastContext'
import { DarkModeProvider } from './context/DarkModeContext'

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/league" element={<League />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <DarkModeProvider>
        <ToastProvider>
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 dark-transition">
            <Nav />
            <main className="flex-1 container mx-auto px-4 py-8">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </DarkModeProvider>
    </BrowserRouter>
  )
}
