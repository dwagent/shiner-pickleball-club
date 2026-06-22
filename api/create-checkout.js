// Stripe Checkout session creator.
// Required environment variables in Azure SWA:
//   STRIPE_SECRET_KEY       — from Stripe Dashboard > Developers > API keys
//   STRIPE_MONTHLY_PRICE_ID — Price ID for the Monthly plan (e.g. price_xxx)
//   STRIPE_ANNUAL_PRICE_ID  — Price ID for the Annual plan

module.exports = async function (context, req) {
  if (req.method !== 'POST') {
    context.res = { status: 405, body: { error: 'Method not allowed.' } }
    return
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) {
    context.res = { status: 503, body: { error: 'Payment processing is not configured.' } }
    return
  }

  let stripe
  try {
    stripe = require('stripe')(stripeKey)
  } catch {
    context.res = { status: 500, body: { error: 'Stripe package not available.' } }
    return
  }

  const { name, email, plan, origin } = req.body || {}

  if (!plan || !origin) {
    context.res = { status: 400, body: { error: 'plan and origin are required.' } }
    return
  }

  const isAnnual = plan === 'annual'
  const priceId = isAnnual
    ? process.env.STRIPE_ANNUAL_PRICE_ID
    : process.env.STRIPE_MONTHLY_PRICE_ID

  if (!priceId) {
    context.res = { status: 503, body: { error: `Price ID for plan "${plan}" is not configured.` } }
    return
  }

  try {
    const sessionParams = {
      payment_method_types: ['card'],
      mode: isAnnual ? 'payment' : 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { memberName: name || '', plan },
      success_url: `${origin}/membership?success=1`,
      cancel_url: `${origin}/membership?cancelled=1`,
    }
    if (email) sessionParams.customer_email = email

    const session = await stripe.checkout.sessions.create(sessionParams)
    context.res = { status: 200, body: { url: session.url } }
  } catch (err) {
    context.log.error('Stripe error:', err.message)
    context.res = { status: 500, body: { error: err.message || 'Payment session could not be created.' } }
  }
}
