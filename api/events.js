const { getClient, ensureTable, listAll } = require('./db')

// In-memory fallback
const memEvents = []
let memNextId = 1

module.exports = async function (context, req) {
  context.log('Events API:', req.method)

  const client = getClient('events')

  if (client) {
    await ensureTable(client)

    if (req.method === 'GET') {
      try {
        const entities = await listAll(client, 'event')
        const events = entities
          .map(e => ({ id: e.rowKey, title: e.title, date: e.date, time: e.time || '', desc: e.desc || '' }))
          .sort((a, b) => (a.date > b.date ? 1 : -1))
        context.res = { status: 200, body: events }
      } catch (err) {
        context.log.error('GET events failed:', err.message)
        context.res = { status: 500, body: { error: 'Failed to load events.' } }
      }
      return
    }

    if (req.method === 'POST') {
      const body = req.body || {}
      if (!body.title || !body.date) {
        context.res = { status: 400, body: { error: 'title and date are required.' } }
        return
      }
      const id = Date.now().toString()
      const entity = {
        partitionKey: 'event',
        rowKey: id,
        title: body.title.trim(),
        date: body.date,
        time: body.time || '',
        desc: (body.desc || '').trim(),
      }
      try {
        await client.createEntity(entity)
        context.res = { status: 201, body: { id, title: entity.title, date: entity.date, time: entity.time, desc: entity.desc } }
      } catch (err) {
        context.log.error('POST event failed:', err.message)
        context.res = { status: 500, body: { error: 'Failed to create event.' } }
      }
      return
    }

    if (req.method === 'DELETE') {
      const id = (req.query && req.query.id) || (req.body && req.body.id)
      if (!id) {
        context.res = { status: 400, body: { error: 'id query parameter required.' } }
        return
      }
      try {
        await client.deleteEntity('event', String(id))
        context.res = { status: 200, body: { success: true } }
      } catch (err) {
        if (err.statusCode === 404) {
          context.res = { status: 404, body: { error: 'Event not found.' } }
        } else {
          context.log.error('DELETE event failed:', err.message)
          context.res = { status: 500, body: { error: 'Failed to delete event.' } }
        }
      }
      return
    }
  } else {
    // In-memory fallback
    if (req.method === 'GET') {
      context.res = { status: 200, body: [...memEvents].sort((a, b) => (a.date > b.date ? 1 : -1)) }
      return
    }
    if (req.method === 'POST') {
      const body = req.body || {}
      if (!body.title || !body.date) {
        context.res = { status: 400, body: { error: 'title and date are required.' } }
        return
      }
      const e = { id: String(memNextId++), title: body.title.trim(), date: body.date, time: body.time || '', desc: (body.desc || '').trim() }
      memEvents.push(e)
      context.res = { status: 201, body: e }
      return
    }
    if (req.method === 'DELETE') {
      const id = (req.query && req.query.id) || (req.body && req.body.id)
      const idx = memEvents.findIndex(x => x.id === String(id))
      if (idx >= 0) {
        memEvents.splice(idx, 1)
        context.res = { status: 200, body: { success: true } }
      } else {
        context.res = { status: 404, body: { error: 'Event not found.' } }
      }
      return
    }
  }

  context.res = { status: 405, body: { error: 'Method not allowed.' } }
}
