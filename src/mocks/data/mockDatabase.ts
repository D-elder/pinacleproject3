// src/mocks/data/mockDatabase.ts
// Pre-generated comprehensive mock database with 10,000 customers
// This is a single static dataset that avoids regeneration on each request

import { PRODUCTS } from '@/mocks/data/products'

export interface MockCustomer {
  customerId: string
  fullName: string
  gender: 'Male' | 'Female' | 'Other'
  age: number
  city: string
  state: string
  occupation: string
  incomeBracket: string
  product: string
  aiConfidenceScore: number // 0-100
  matchReason: string
  lastUpdated: string
}

const NIGERIAN_CITIES = [
  { city: 'Lagos', state: 'Lagos' },
  { city: 'Ikeja', state: 'Lagos' },
  { city: 'Abuja', state: 'FCT' },
  { city: 'Kano', state: 'Kano' },
  { city: 'Port Harcourt', state: 'Rivers' },
  { city: 'Ibadan', state: 'Oyo' },
  { city: 'Enugu', state: 'Enugu' },
  { city: 'Awka', state: 'Anambra' },
  { city: 'Kaduna', state: 'Kaduna' },
  { city: 'Benin City', state: 'Edo' },
  { city: 'Abeokuta', state: 'Ogun' },
  { city: 'Maiduguri', state: 'Borno' },
  { city: 'Katsina', state: 'Katsina' },
  { city: 'Lokoja', state: 'Kogi' },
  { city: 'Lafia', state: 'Nasarawa' },
  { city: 'Makurdi', state: 'Benue' },
  { city: 'Oshogbo', state: 'Osun' },
  { city: 'Akure', state: 'Ondo' },
  { city: 'Asaba', state: 'Delta' },
  { city: 'Benin', state: 'Edo' },
]

const FIRST_NAMES = [
  'Ade', 'Chinelo', 'Emeka', 'Fatima', 'Ibrahim', 'Kemi', 'Nkechi', 'Suleiman', 'Tunde', 'Yemi',
  'Aisha', 'Chioma', 'Damilola', 'Funke', 'Gbolahan', 'Hauwa', 'Ikechukwu', 'Jumoke', 'Kamau', 'Lara',
  'Musa', 'Ngozi', 'Oladele', 'Patience', 'Qadir', 'Rashid', 'Sola', 'Titilayo', 'Usman', 'Vimla',
]

const LAST_NAMES = [
  'Okafor', 'Smith', 'Chukwu', 'Ibrahim', 'Adegoke', 'Nwankwo', 'Balogun', 'Ola', 'Eze', 'Ogunleye',
  'Abubakar', 'Banda', 'Chevon', 'Dike', 'Essien', 'Fajola', 'Gwadabe', 'Haruna', 'Ibeji', 'Jibowu',
  'Kadir', 'Lamidi', 'Mensah', 'Nwosu', 'Obi', 'Pam', 'Quadri', 'Raji', 'Sanni', 'Taiwo',
]

const OCCUPATIONS = [
  'Teacher', 'Trader', 'Engineer', 'Nurse', 'Driver', 'Accountant', 'Manager', 'Developer',
  'Doctor', 'Lawyer', 'Farmer', 'Mechanic', 'Chef', 'Carpenter', 'Electrician', 'Plumber',
  'Sales Manager', 'Consultant', 'Photographer', 'Musician', 'Artist', 'Barber', 'Tailor', 'Vendor',
]

const INCOME_BRACKETS = ['<50k', '50k-150k', '150k-500k', '>500k']

// Generate unique AI-like financial habit summaries
function generateFinancialHabitSummary(
  occupation: string,
  incomeBracket: string,
  seed: number,
): string {
  const habits = {
    '<50k': [
      'Frequent micro-transactions and consistent savings from small income',
      'Regular bill payments with occasional discretionary spending habits',
      'Limited investment activity but strong payment discipline shown',
      'Modest savings pattern with focus on essential expenses only',
      'Daily transaction activity shows careful budget management approach',
      'Regular ATM withdrawals and conservative spending behavior noted',
      'Consistent deposit patterns indicating reliable income sources',
      'Low credit utilization with preference for cash transactions',
    ],
    '50k-150k': [
      'Strong monthly savings rate with strategic investment planning in progress',
      'Multiple income streams detected with diversified spending patterns',
      'Regular business-related transactions indicating entrepreneurial activities',
      'Balanced savings and spending with occasional premium purchases',
      'Active account usage with strategic financial planning indicators',
      'Consistent income deposits with calculated discretionary spending',
      'Growing savings accumulation suggesting improved financial stability',
      'Regular subscription and service payments showing stable lifestyle',
    ],
    '150k-500k': [
      'High-frequency transactions with significant asset accumulation patterns',
      'Multiple investment vehicles and portfolio diversification evident',
      'Substantial monthly savings with strategic wealth-building approach',
      'Premium service subscriptions indicating elevated lifestyle standards',
      'Consistent large transactions showing business or professional success',
      'Regular international transactions and travel expense patterns',
      'Significant savings rate with sophisticated financial planning evident',
      'Active trading and investment account activity demonstrated consistently',
    ],
    '>500k': [
      'Elite transaction patterns with substantial wealth accumulation strategy',
      'Multiple high-value investments and sophisticated portfolio management',
      'Significant monthly contributions to premium banking products',
      'International transactions and cross-border financial activities',
      'Large-scale asset purchases and major investment commitments',
      'Premium service tier usage with exclusive banking relationship',
      'Substantial philanthropic and charitable giving patterns observed',
      'Complex financial structure suggesting professional wealth advisory engagement',
    ],
  }

  const occupationHints = {
    'Teacher': 'steady income pattern with regular monthly deposits',
    'Engineer': 'above-average savings rate with tech investments',
    'Doctor': 'high transaction volume with significant savings',
    'Lawyer': 'substantial income with investment diversification',
    'Manager': 'consistent income with professional spending habits',
    'Developer': 'tech-savvy financial management with digital payments',
    'Trader': 'high transaction frequency with market activity',
    'Farmer': 'seasonal income patterns with seasonal spending',
  }

  const bracket = habits[incomeBracket as keyof typeof habits] || habits['50k-150k']
  const selectedHabit = bracket[seed % bracket.length]

  const occupationHint = occupationHints[occupation as keyof typeof occupationHints]
  if (occupationHint) {
    return `${selectedHabit} combined with ${occupationHint}`
  }

  return selectedHabit
}

// Generate all 10,000 customers once at module load
function generateMockDatabase(): MockCustomer[] {
  const customers: MockCustomer[] = []
  let seed = 12345 // Fixed seed for reproducibility

  for (let i = 0; i < 10000; i++) {
    seed = (seed * 9301 + 49297) % 233280 // Linear congruential generator
    const random1 = seed / 233280
    seed = (seed * 9301 + 49297) % 233280
    const random2 = seed / 233280
    seed = (seed * 9301 + 49297) % 233280
    const random3 = seed / 233280
    seed = (seed * 9301 + 49297) % 233280
    const random4 = seed / 233280

    const cityObj = NIGERIAN_CITIES[i % NIGERIAN_CITIES.length]
    const first = FIRST_NAMES[Math.floor(random1 * FIRST_NAMES.length)]
    const last = LAST_NAMES[Math.floor(random2 * LAST_NAMES.length)]
    const age = 18 + Math.floor(random3 * 52)
    const confidence = 40 + Math.floor(Math.random() * 59)
    const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)]
    const occupation = OCCUPATIONS[i % OCCUPATIONS.length]
    const incomeBracket = INCOME_BRACKETS[Math.floor(random4 * INCOME_BRACKETS.length)]
    
    // Generate unique financial habit summary for each customer
    const reason = generateFinancialHabitSummary(
      occupation,
      incomeBracket,
      i,
    )

    const daysAgo = Math.floor(Math.random() * 30)
    const lastUpdated = new Date()
    lastUpdated.setDate(lastUpdated.getDate() - daysAgo)

    customers.push({
      customerId: `CUST-${100000 + i}`,
      fullName: `${first} ${last}`,
      gender: i % 2 === 0 ? 'Male' : 'Female',
      age,
      city: cityObj.city,
      state: cityObj.state,
      occupation,
      incomeBracket,
      product,
      aiConfidenceScore: confidence,
      matchReason: reason,
      lastUpdated: lastUpdated.toISOString(),
    })
  }

  return customers
}

// Export the single, pre-generated database
export const MOCK_CUSTOMERS = generateMockDatabase()

export function getCustomerById(id: string) {
  return MOCK_CUSTOMERS.find((c) => c.customerId === id)
}
