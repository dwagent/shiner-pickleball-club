// Azure Table Storage helper — degrades gracefully to in-memory when not configured.
// Set AZURE_STORAGE_CONNECTION_STRING in your Azure SWA environment variables to enable persistence.

let TableClient = null
try { ({ TableClient } = require('@azure/data-tables')) } catch (_) { /* package not installed in dev */ }

const CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING

function getClient(tableName) {
  if (!CONNECTION_STRING || !TableClient) return null
  return TableClient.fromConnectionString(CONNECTION_STRING, tableName)
}

async function ensureTable(client) {
  try { await client.createTable() } catch (e) {
    if (!(e.statusCode === 409 || (e.message && e.message.includes('TableAlreadyExists')))) throw e
  }
}

async function listAll(client, partitionKey) {
  const items = []
  const iter = client.listEntities({ queryOptions: { filter: `PartitionKey eq '${partitionKey}'` } })
  for await (const entity of iter) items.push(entity)
  return items
}

module.exports = { getClient, ensureTable, listAll }
