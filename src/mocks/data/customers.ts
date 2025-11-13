// src/mocks/data/customers.ts
// Generate a realistic set of mock customers for the MSW handlers.

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
]

const FIRST_NAMES = [
  'Ade',
  'Chinelo',
  'Emeka',
  'Fatima',
  'Ibrahim',
  'Kemi',
  'Nkechi',
  'Suleiman',
  'Tunde',
  'Yemi',
]
const LAST_NAMES = [
  'Okafor',
  'Smith',
  'Chukwu',
  'Ibrahim',
  'Adegoke',
  'Nwankwo',
  'Balogun',
  'Ola',
  'Eze',
  'Ogunleye',
]

const OCCUPATIONS = ['Teacher', 'Trader', 'Engineer', 'Nurse', 'Driver', 'Accountant', 'Manager', 'Developer']
const INCOME_BRACKETS = ['<50k', '50k-150k', '150k-500k', '>500k']
const REASONS = [
  'High product usage similarity',
  'Recent deposits indicate saving capability',
  'Account activity suggests eligibility',
  'Low debt-to-income ratio',
  'Matched by spending pattern',
  'High digital engagement',
]

function fmtDateDaysAgo(days: number) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

// Generate customers synchronously and explicitly
function generateCustomers(): MockCustomer[] {
  const result: MockCustomer[] = []
  for (let i = 0; i < 10000; i++) {
    const cityObj = NIGERIAN_CITIES[i % NIGERIAN_CITIES.length]
    const first = FIRST_NAMES[i % FIRST_NAMES.length]
    const last = LAST_NAMES[(i * 3) % LAST_NAMES.length]
    const age = 18 + Math.floor(Math.random() * 52) // 18-70
    const confidence = 40 + Math.floor(Math.random() * 59) // 40-98
    // Use random selection for products and reasons to ensure unique values
    const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)]
    const reason = REASONS[Math.floor(Math.random() * REASONS.length)]

    result.push({
      customerId: `CUST-${100000 + i}`,
      fullName: `${first} ${last}`,
      gender: i % 2 === 0 ? 'Male' : 'Female',
      age,
      city: cityObj.city,
      state: cityObj.state,
      occupation: OCCUPATIONS[i % OCCUPATIONS.length],
      incomeBracket: INCOME_BRACKETS[i % INCOME_BRACKETS.length],
      product,
      aiConfidenceScore: confidence,
      matchReason: reason,
      lastUpdated: fmtDateDaysAgo((i * 3) % 30),
    })
  }
  return result
}

export const CUSTOMERS = generateCustomers()

export function getCustomerById(id: string) {
  return CUSTOMERS.find((c) => c.customerId === id)
}
