import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Page from '../components/Page'

const LEAGUES = [
  {
    id: 'beginner',
    label: 'Beginner',
    ratingRange: '2.0 – 2.5',
    standings: [
      { rank: 1, name: 'Lisa K.',       wins: 8, losses: 1, rating: 2.5, trend: 'up' },
      { rank: 2, name: 'Tom R.',        wins: 7, losses: 2, rating: 2.5, trend: 'same' },
      { rank: 3, name: 'Maria S.',      wins: 6, losses: 3, rating: 2.0, trend: 'up' },
      { rank: 4, name: 'David M.',      wins: 5, losses: 4, rating: 2.0, trend: 'down' },
      { rank: 5, name: 'Carol B.',      wins: 3, losses: 6, rating: 2.0, trend: 'same' },
      { rank: 6, name: 'Henry J.',      wins: 1, losses: 8, rating: 2.0, trend: 'down' },
    ],
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    ratingRange: '3.0 – 3.5',
    standings: [
      { rank: 1, name: 'Sandra M.',     wins: 10, losses: 1, rating: 3.5, trend: 'up' },
      { rank: 2, name: 'Jim H.',        wins: 9,  losses: 2, rating: 3.5, trend: 'same' },
      { rank: 3, name: 'Beth W.',       wins: 8,  losses: 3, rating: 3.0, trend: 'up' },
      { rank: 4, name: 'Carlos T.',     wins: 6,  losses: 5, rating: 3.0, trend: 'same' },
      { rank: 5, name: 'Nicole F.',     wins: 5,  losses: 6, rating: 3.0, trend: 'down' },
      { rank: 6, name: 'Ray G.',        wins: 3,  losses: 8, rating: 3.0, trend: 'down' },
    ],
  },
  {
    id: 'advanced',
    label: 'Advanced',
    ratingRange: '4.0 – 5.0',
    standings: [
      { rank: 1, name: 'Mark P.',       wins: 11, losses: 0, rating: 4.5, trend: 'same' },
      { rank: 2, name: 'Diane L.',      wins: 9,  losses: 2, rating: 4.0, trend: 'up' },
      { rank: 3, name: 'Frank A.',      wins: 8,  losses: 3, rating: 4.0, trend: 'same' },
      { rank: 4, name: 'Angela C.',     wins: 6,  losses: 5, rating: 4.0, trend: 'down' },
      { rank: 5, name: 'Robert N.',     wins: 4,  losses: 7, rating: 4.0, trend: 'down' },
    ],
  },
]

function TrendIcon({ trend }) {
  if (trend === 'up') return <span className="text-green-500 font-bold text-sm">↑</span>
  if (trend === 'down') return <span className="text-red-500 font-bold text-sm">↓</span>
  return <span className="text-gray-400 text-sm">—</span>
}

function RatingBadge({ rating }) {
  const color = rating >= 4 ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    : rating >= 3 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${color}`}>{rating.toFixed(1)}</span>
  )
}

export default function League() {
  const [activeTab, setActiveTab] = useState('intermediate')
  const league = LEAGUES.find(l => l.id === activeTab)

  return (
    <Page>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">League Standings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Current season results. Updated after each match day.</p>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg px-3 py-2">
          Season 2026 · 6-week session
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-6 w-fit">
        {LEAGUES.map(l => (
          <button
            key={l.id}
            onClick={() => setActiveTab(l.id)}
            className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === l.id
                ? 'text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {activeTab === l.id && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 bg-green-600 rounded-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative">{l.label}</span>
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Rating range:</span>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{league.ratingRange}</span>
        </div>

        <div className="overflow-x-auto rounded-xl border dark:border-gray-700 shadow-sm">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                <th className="px-4 py-3 text-left w-12">#</th>
                <th className="px-4 py-3 text-left">Player</th>
                <th className="px-4 py-3 text-center">W</th>
                <th className="px-4 py-3 text-center">L</th>
                <th className="px-4 py-3 text-center">Win %</th>
                <th className="px-4 py-3 text-center">Rating</th>
                <th className="px-4 py-3 text-center">Trend</th>
              </tr>
            </thead>
            <tbody>
              {league.standings.map((p, i) => (
                <motion.tr
                  key={p.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`border-t dark:border-gray-700 ${
                    p.rank === 1
                      ? 'bg-yellow-50 dark:bg-yellow-900/10'
                      : 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'
                  } transition-colors`}
                >
                  <td className="px-4 py-3 font-bold text-gray-400 dark:text-gray-500">
                    {p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : p.rank}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">{p.name}</td>
                  <td className="px-4 py-3 text-center text-green-700 dark:text-green-400 font-medium">{p.wins}</td>
                  <td className="px-4 py-3 text-center text-red-600 dark:text-red-400 font-medium">{p.losses}</td>
                  <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                    {Math.round((p.wins / (p.wins + p.losses)) * 100)}%
                  </td>
                  <td className="px-4 py-3 text-center"><RatingBadge rating={p.rating} /></td>
                  <td className="px-4 py-3 text-center"><TrendIcon trend={p.trend} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-600 mt-3">
          Standings updated weekly. Contact admin to report match results.
        </p>
      </motion.div>

      {/* Rating legend */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">USAPA Rating Scale</h3>
        <div className="grid sm:grid-cols-3 gap-2 text-xs">
          {[
            { range: '2.0 – 2.5', label: 'Beginner', desc: 'Learning basic rules and strokes' },
            { range: '3.0 – 3.5', label: 'Intermediate', desc: 'Consistent rallies, basic strategy' },
            { range: '4.0 – 5.0', label: 'Advanced', desc: 'Strong third-shot drop, tournament play' },
          ].map(r => (
            <div key={r.range} className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-800 dark:text-gray-200">{r.range} — {r.label}:</span> {r.desc}
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}
