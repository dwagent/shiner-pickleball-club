// Simple session-based admin auth.
// Set ADMIN_PASSWORD in Azure SWA environment variables.
// Sessions reset on function cold start — users will need to log in again after ~20 min of inactivity.

const sessions = new Set()

function generateToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let t = ''
  for (let i = 0; i < 40; i++) t += chars.charAt(Math.floor(Math.random() * chars.length))
  return t
}

module.exports = async function (context, req) {
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    context.res = { status: 503, body: { error: 'Admin auth is not configured. Set ADMIN_PASSWORD in environment variables.' } }
    return
  }

  if (req.method === 'POST') {
    const { password } = req.body || {}
    if (password !== adminPassword) {
      context.res = { status: 401, body: { error: 'Incorrect password.' } }
      return
    }
    const token = generateToken()
    sessions.add(token)
    // Auto-expire after 8 hours
    setTimeout(() => sessions.delete(token), 8 * 60 * 60 * 1000)
    context.res = { status: 200, body: { token } }
    return
  }

  if (req.method === 'GET') {
    const auth = (req.headers && req.headers.authorization) || ''
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
    if (token && sessions.has(token)) {
      context.res = { status: 200, body: { ok: true } }
    } else {
      context.res = { status: 401, body: { ok: false } }
    }
    return
  }

  context.res = { status: 405, body: { error: 'Method not allowed.' } }
}
