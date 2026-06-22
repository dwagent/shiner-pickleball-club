const { getClient, ensureTable, listAll } = require('./db')

// In-memory fallback
const memReservations = []
let memNextId = 1

module.exports = async function (context, req) {
  context.log('Reservations API:', req.method)

  const client = getClient('reservations')

  if (client) {
    await ensureTable(client)

    if (req.method === 'GET') {
      try {
        const entities = await listAll(client, 'reservation')
        const reservations = entities.map(e => ({
          id: e.rowKey,
          court: Number(e.court),
          start: e.start,
          end: e.end,
        }))
        context.res = { status: 200, body: reservations }
      } catch (err) {
        context.log.error('GET reservations failed:', err.message)
        context.res = { status: 500, body: { error: 'Failed to load reservations.' } }
      }
      return
    }

    if (req.method === 'POST') {
      const body = req.body || {}
      if (!body.start || !body.end) {
        context.res = { status: 400, body: { error: 'start and end are required.' } }
        return
      }
      const id = Date.now().toString()
      const entity = {
        partitionKey: 'reservation',
        rowKey: id,
        court: String(body.court || 1),
        start: body.start,
        end: body.end,
      }
      try {
        await client.createEntity(entity)
        context.res = {
          status: 201,
          body: { id, court: Number(entity.court), start: entity.start, end: entity.end },
        }
      } catch (err) {
        context.log.error('POST reservation failed:', err.message)
        context.res = { status: 500, body: { error: 'Failed to create reservation.' } }
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
        await client.deleteEntity('reservation', String(id))
        context.res = { status: 200, body: { success: true } }
      } catch (err) {
        if (err.statusCode === 404) {
          context.res = { status: 404, body: { error: 'Reservation not found.' } }
        } else {
          context.log.error('DELETE reservation failed:', err.message)
          context.res = { status: 500, body: { error: 'Failed to delete reservation.' } }
        }
      }
      return
    }
  } else {
    // In-memory fallback
    if (req.method === 'GET') {
      context.res = { status: 200, body: memReservations }
      return
    }
    if (req.method === 'POST') {
      const body = req.body || {}
      if (!body.start || !body.end) {
        context.res = { status: 400, body: { error: 'start and end are required.' } }
        return
      }
      const r = { id: String(memNextId++), court: Number(body.court) || 1, start: body.start, end: body.end }
      memReservations.push(r)
      context.res = { status: 201, body: r }
      return
    }
    if (req.method === 'DELETE') {
      const id = (req.query && req.query.id) || (req.body && req.body.id)
      const idx = memReservations.findIndex(x => x.id === String(id))
      if (idx >= 0) {
        memReservations.splice(idx, 1)
        context.res = { status: 200, body: { success: true } }
      } else {
        context.res = { status: 404, body: { error: 'Reservation not found.' } }
      }
      return
    }
  }

  context.res = { status: 405, body: { error: 'Method not allowed.' } }
}
