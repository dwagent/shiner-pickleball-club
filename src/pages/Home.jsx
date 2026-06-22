import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Page from '../components/Page'
import { useCountUp } from '../hooks/useCountUp'
import { CLUB, COURTS, HOURS, PLANS } from '../config'

const STATS = [
  { value: 4,   suffix: '',  label: 'Indoor Courts' },
  { value: 150, suffix: '+', label: 'Active Members' },
  { value: 7,   suffix: '',  label: 'Days a Week' },
  { value: 12,  suffix: '+', label: 'Events per Year' },
]

const TESTIMONIALS = [
  {
    name: 'Sandra M.',
    plan: 'Annual Member',
    quote: 'Best decision I made this year. The courts are immaculate and the community is incredibly welcoming — even as a complete beginner.',
  },
  {
    name: 'Carlos T.',
    plan: 'Monthly Member',
    quote: 'I went from never holding a paddle to playing three times a week. The beginner mixers made it easy to find my footing and make friends.',
  },
  {
    name: 'Beth W.',
    plan: 'Annual Member',
    quote: 'The online booking is a dream — 30 seconds to reserve a court. Leagues are competitive and well-organized. Couldn\'t ask for more.',
  },
]

function StatCounter({ value, suffix, label }) {
  const { count, ref } = useCountUp(value)
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-extrabold text-green-600 dark:text-green-400 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</div>
    </div>
  )
}

function PickleballIllustration() {
  return (
    <svg viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="210" rx="14" fill="#dcfce7" className="dark:fill-green-950" />
      <rect x="18" y="18" width="284" height="174" rx="8" fill="#4ade80" opacity="0.55" />
      <rect x="18" y="18" width="284" height="174" rx="6" fill="none" stroke="white" strokeWidth="2.5" />
      <line x1="160" y1="18" x2="160" y2="192" stroke="white" strokeWidth="1.5" />
      <rect x="18" y="99" width="284" height="11" rx="2" fill="white" opacity="0.85" />
      <line x1="18" y1="63" x2="302" y2="63" stroke="white" strokeWidth="1.5" />
      <line x1="18" y1="147" x2="302" y2="147" stroke="white" strokeWidth="1.5" />
      <rect x="18" y="63" width="284" height="36" fill="white" opacity="0.08" />
      <rect x="18" y="111" width="284" height="36" fill="white" opacity="0.08" />
      <g transform="translate(248, 95) rotate(22)">
        <rect x="-9" y="40" width="18" height="52" rx="6" fill="#166534" />
        <line x1="-9" y1="50" x2="9" y2="50" stroke="#14532d" strokeWidth="2" />
        <line x1="-9" y1="60" x2="9" y2="60" stroke="#14532d" strokeWidth="2" />
        <line x1="-9" y1="70" x2="9" y2="70" stroke="#14532d" strokeWidth="2" />
        <line x1="-9" y1="80" x2="9" y2="80" stroke="#14532d" strokeWidth="2" />
        <rect x="-27" y="-50" width="54" height="92" rx="26" fill="#16a34a" />
        {[[-14,-32],[0,-32],[14,-32],[-14,-18],[0,-18],[14,-18],[-14,-4],[0,-4],[14,-4],[-14,10],[0,10],[14,10],[-14,24],[0,24],[14,24]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#15803d" opacity="0.8" />
        ))}
        <rect x="-27" y="-50" width="54" height="92" rx="26" fill="none" stroke="#14532d" strokeWidth="3" />
      </g>
      <circle cx="90" cy="75" r="22" fill="#fef08a" stroke="#facc15" strokeWidth="2" />
      {[[-8,-8],[0,-8],[8,-8],[-8,0],[0,0],[8,0],[-8,8],[0,8],[8,8]].map(([dx,dy],i) => (
        <circle key={i} cx={90+dx} cy={75+dy} r="3" fill="#eab308" />
      ))}
      <ellipse cx="90" cy="98" rx="18" ry="4" fill="#16a34a" opacity="0.3" />
    </svg>
  )
}

export default function Home() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.45, delay, ease: 'easeOut' },
  })

  return (
    <Page>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-green-100 dark:border-gray-700 p-6 md:p-10 rounded-2xl mb-10 shadow-sm">
        <div className="md:flex md:items-center md:justify-between gap-8">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Shiner, Texas
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
              {CLUB.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 max-w-md">{CLUB.tagline}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/membership" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow transition-colors">
                Join Now
              </Link>
              <Link to="/reservations" className="border-2 border-green-600 text-green-700 dark:text-green-400 dark:border-green-500 font-semibold px-5 py-2.5 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors">
                Reserve a Court
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="mt-8 md:mt-0 w-full md:w-80 shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <PickleballIllustration />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <motion.section {...fadeUp()} className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl p-6 mb-10 shadow-sm">
        {STATS.map(s => <StatCounter key={s.label} {...s} />)}
      </motion.section>

      {/* Feature cards */}
      <section className="grid sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: '🏟️', title: 'Courts', body: COURTS.description, sub: `Open ${HOURS.label}`, link: null },
          { icon: '🏅', title: 'Memberships', body: `Monthly at $${PLANS[0].price}/mo or annual at $${PLANS[1].price}/yr — priority bookings and member rates.`, sub: 'View plans →', link: '/membership' },
          { icon: '🎉', title: 'Events', body: 'Social mixers, competitive leagues, and junior clinics for all skill levels.', sub: 'See upcoming events →', link: '/events' },
        ].map((card, i) => (
          <motion.div key={card.title} {...fadeUp(i * 0.08)} className="p-5 border dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md dark:bg-gray-800 transition-shadow">
            <div className="text-2xl mb-2">{card.icon}</div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{card.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{card.body}</p>
            {card.link && (
              <Link to={card.link} className="text-xs text-green-700 dark:text-green-400 font-medium mt-2 inline-block hover:underline">
                {card.sub}
              </Link>
            )}
            {!card.link && <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">{card.sub}</div>}
          </motion.div>
        ))}
      </section>

      {/* Testimonials */}
      <motion.section {...fadeUp()} className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">What members say</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              {...fadeUp(i * 0.1)}
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 border border-green-100 dark:border-gray-600 rounded-xl p-5 shadow-sm"
            >
              <div className="flex text-yellow-400 mb-3 text-sm">{'★★★★★'}</div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">"{t.quote}"</p>
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{t.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t.plan}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA strip */}
      <motion.section {...fadeUp()} className="bg-green-700 dark:bg-green-800 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-bold text-lg">Ready to play?</div>
          <div className="text-green-200 text-sm">Book a court online in under a minute.</div>
        </div>
        <Link to="/reservations" className="bg-white text-green-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-green-50 transition-colors shrink-0">
          Book a Court
        </Link>
      </motion.section>
    </Page>
  )
}
