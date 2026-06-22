import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Page from '../components/Page'

const FAQS = [
  {
    category: 'Getting Started',
    items: [
      {
        q: 'What skill level do I need to join?',
        a: 'All skill levels are welcome — from complete beginners to competitive 4.5+ players. We offer beginner mixers, open play, and leagues at every level.',
      },
      {
        q: 'Do you offer lessons for beginners?',
        a: 'Yes! We run beginner clinics monthly and can connect you with certified instructors for private lessons. Check the Events page for upcoming clinic dates.',
      },
      {
        q: 'What equipment do I need?',
        a: 'Just yourself and athletic shoes. Loaner paddles are available for your first visit. Members get free equipment rental included with their plan.',
      },
    ],
  },
  {
    category: 'Membership',
    items: [
      {
        q: "What's the difference between Monthly and Annual plans?",
        a: 'Both plans include priority court booking, member event rates, and guest passes. Annual members get twice as many guest passes and free equipment rental. Annual saves over $120 versus paying month-to-month.',
      },
      {
        q: 'Can I cancel my Monthly membership?',
        a: 'Yes — Monthly memberships can be cancelled at any time with no penalty. Annual memberships are non-refundable but can be paused for medical reasons.',
      },
      {
        q: 'Do you offer family or corporate memberships?',
        a: 'We do! Family plans and group corporate memberships are available at a discount. Contact us for pricing.',
      },
    ],
  },
  {
    category: 'Courts & Booking',
    items: [
      {
        q: 'How far in advance can I reserve a court?',
        a: 'Members can book up to 7 days in advance. Courts can be reserved in 30-minute increments up to 2 hours per session.',
      },
      {
        q: "What's the cancellation policy for court reservations?",
        a: 'Cancel at least 2 hours before your booking to free the slot for other members. Repeated no-shows may result in temporary booking restrictions.',
      },
      {
        q: 'Can I bring guests?',
        a: 'Monthly members get 4 guest passes per month; Annual members get 8. Guest day passes can be purchased at the front desk for $10.',
      },
      {
        q: 'What are the operating hours?',
        a: 'We are open daily from 8:00 AM to 9:00 PM. Holiday hours may vary — follow us on social media for updates.',
      },
    ],
  },
  {
    category: 'Events & Leagues',
    items: [
      {
        q: 'How do I join a league?',
        a: "League registration opens 2 weeks before each session. Check the Events page or contact us to get on the waitlist. Leagues run in 6-week sessions.",
      },
      {
        q: 'What rating system do you use?',
        a: 'We use the standard USAPA 2.0–5.0 skill rating system. New players are assessed during an orientation session before being placed in a league.',
      },
      {
        q: 'How often are social mixers held?',
        a: 'We host at least one mixer per month, plus special events for holidays and tournaments. Members get discounted entry to all events.',
      },
    ],
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left py-4 flex items-center justify-between gap-4 hover:text-green-700 dark:hover:text-green-400 transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-gray-100 text-sm md:text-base">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-green-600 text-xl font-light shrink-0"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  return (
    <Page>
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">Frequently Asked Questions</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-10">
        Can't find your answer?{' '}
        <Link to="/contact" className="text-green-700 dark:text-green-400 underline underline-offset-2">
          Contact us
        </Link>{' '}
        and we'll get back to you quickly.
      </p>

      <div className="space-y-8 max-w-2xl">
        {FAQS.map(section => (
          <div key={section.category}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-green-700 dark:text-green-400 mb-1 pb-2 border-b border-green-200 dark:border-green-900">
              {section.category}
            </h2>
            <div>
              {section.items.map(item => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Page>
  )
}
