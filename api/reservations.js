const reservations = [ { id: 1, court: 1, start: '2026-07-01T18:00:00', end: '2026-07-01T19:00:00' } ]
let nextId = 2

module.exports = async function (context, req) {
  context.log('Reservations API called', req.method)
  if(req.method === 'POST'){
    const body = req.body || {}
    const r = { id: nextId++, court: body.court || 1, start: body.start, end: body.end }
    reservations.push(r)
    context.res = { status: 201, body: r }
    return
  }

  if(req.method === 'DELETE'){
    const id = Number(req.query && req.query.id) || (req.body && req.body.id)
    const idx = reservations.findIndex(x=>x.id===id)
    if(idx>=0){ reservations.splice(idx,1); context.res={ status:200, body: { success: true } }; return }
    context.res = { status:404, body: { error: 'not found' } }
    return
  }

  context.res = { status: 200, body: reservations }
}
