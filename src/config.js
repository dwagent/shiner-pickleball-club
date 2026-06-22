// Club configuration — update these values to match your actual club details

export const CLUB = {
  name: 'Shiner Pickleball Club',
  tagline: 'Indoor courts, leagues, lessons, and community events in Shiner, Texas.',
  address: '123 Main St, Shiner, TX 77984',
  phone: '(979) 555-0123',
  email: 'info@shinerpickleball.com',
}

export const COURTS = {
  count: 4,
  numbers: [1, 2, 3, 4],
  description: '4 indoor courts with full lighting and ball machines.',
}

export const HOURS = {
  open: 8,
  close: 21,
  label: '8:00 AM – 9:00 PM',
}

export const DEFAULT_BOOKING_TIME = '08:00'
export const DEFAULT_BOOKING_DURATION = 60

export const PLANS = [
  {
    id: 'monthly',
    label: 'Monthly',
    price: 35,
    priceLabel: '$35 / month',
    description: 'Flexible month-to-month — cancel anytime.',
    features: [
      'Priority court booking',
      'Member rates on events',
      '4 guest passes per month',
    ],
  },
  {
    id: 'annual',
    label: 'Annual',
    price: 299,
    priceLabel: '$299 / year',
    badge: 'Best Value',
    description: 'Save over $120 compared to monthly.',
    features: [
      'Priority court booking',
      'Member rates on events',
      '8 guest passes per month',
      'Free equipment rental',
    ],
  },
]
