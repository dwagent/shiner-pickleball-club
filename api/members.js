const { getClient, ensureTable, listAll } = require('./db')

// In-memory fallback (used when AZURE_STORAGE_CONNECTION_STRING is not set)
const memMembers = []
let memNextId = 1

module.exports = async function (context, req) {
  context.log('Members API:', req.method)

  const client = getClient('members')

  if (client) {
    await ensureTable(client)

    if (req.method === 'GET') {
      try {
        const entities = await listAll(client, 'member')
        const members = entities.map(e => ({ id: e.rowKey, name: e.name, plan: e.plan }))
        context.res = { status: 200, body: members }
      } catch (err) {
        context.log.error('GET members failed:', err.message)
        context.res = { status: 500, body: { error: 'Failed to load members.' } }
      }
      return
    }

    if (req.method === 'POST') {
      const body = req.body || {}
      if (!body.name || !body.name.trim()) {
        context.res = { status: 400, body: { error: 'Name is required.' } }
        return
      }
      const id = Date.now().toString()
      const entity = {
        partitionKey: 'member',
        rowKey: id,
        name: body.name.trim(),
        plan: body.plan || 'monthly',
        createdAt: new Date().toISOString(),
      }
      try {
        await client.createEntity(entity)
        context.res = { status: 201, body: { id, name: entity.name, plan: entity.plan } }
      } catch (err) {
        context.log.error('POST member failed:', err.message)
        context.res = { status: 500, body: { error: 'Failed to create member.' } }
      }
      return
    }
  } else {
    // In-memory fallback
    if (req.method === 'GET') {
      context.res = { status: 200, body: memMembers }
      return
    }
    if (req.method === 'POST') {
      const body = req.body || {}
      if (!body.name || !body.name.trim()) {
        context.res = { status: 400, body: { error: 'Name is required.' } }
        return
      }
      const m = { id: String(memNextId++), name: body.name.trim(), plan: body.plan || 'monthly' }
      memMembers.push(m)
      context.res = { status: 201, body: m }
      return
    }
  }

  context.res = { status: 405, body: { error: 'Method not allowed.' } }
}
