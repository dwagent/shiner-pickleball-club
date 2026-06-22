const { getClient, ensureTable } = require('./db')

module.exports = async function (context, req) {
  context.log('Contact API:', req.method)

  if (req.method !== 'POST') {
    context.res = { status: 405, body: { error: 'Method not allowed.' } }
    return
  }

  const body = req.body || {}
  const { name, email, message } = body

  if (!name || !email || !message) {
    context.res = { status: 400, body: { error: 'name, email, and message are required.' } }
    return
  }

  // Always log to function output so the club can find messages even without storage
  context.log(`CONTACT MESSAGE from ${name} <${email}>: ${message}`)

  const client = getClient('contacts')
  if (client) {
    try {
      await ensureTable(client)
      await client.createEntity({
        partitionKey: 'contact',
        rowKey: Date.now().toString(),
        name: String(name).trim(),
        email: String(email).trim(),
        message: String(message).trim(),
        receivedAt: new Date().toISOString(),
      })
    } catch (err) {
      context.log.error('Failed to store contact message:', err.message)
      // Still return success — the message was logged above
    }
  }

  context.res = { status: 200, body: { success: true } }
}
