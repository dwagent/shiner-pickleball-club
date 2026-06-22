const events = [ { id: 1, title: 'Beginner Mixer', date: '2026-07-03', desc: 'Meet other players and learn the basics.' } ]
let nextId = 2

module.exports = async function (context, req) {
  context.log('Events API called', req.method)
  if(req.method === 'POST'){
    const body = req.body || {}
    const e = { id: nextId++, title: body.title || 'Untitled', date: body.date, desc: body.desc || '' }
    events.push(e)
    context.res = { status: 201, body: e }
    return
  }

  if(req.method === 'DELETE'){
    const id = Number(req.query && req.query.id) || (req.body && req.body.id)
    const idx = events.findIndex(x=>x.id===id)
    if(idx>=0){ events.splice(idx,1); context.res={ status:200, body: { success: true } }; return }
    context.res = { status:404, body: { error: 'not found' } }
    return
  }

  context.res = { status: 200, body: events }
}
