// Simple in-memory store for demo purposes (persists while function host runs)
const members = [ { id: 1, name: 'Demo Member', plan: 'Annual' } ]
let nextId = 2

module.exports = async function (context, req) {
  context.log('Members API called', req.method)
  if(req.method === 'POST'){
    const body = req.body || {}
    const m = { id: nextId++, name: body.name || 'Unknown', plan: body.plan || 'Monthly' }
    members.push(m)
    context.res = { status: 201, body: m }
    return
  }

  // default: GET
  context.res = { status: 200, body: members }
}
