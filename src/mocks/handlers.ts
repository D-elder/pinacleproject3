// src/mocks/handlers.ts
// Central MSW handlers for the mock API endpoints required by the app.
// Uses MSW v2 http API instead of rest.

import { http, HttpResponse, delay } from 'msw'
import { MOCK_CUSTOMERS, getCustomerById, type MockCustomer } from '@/mocks/data/mockDatabase'
import { PRODUCTS } from '@/mocks/data/products'
import { FILTERS } from '@/mocks/data/filters'
import { RECOMMENDATIONS, getSampleRecommendations } from '@/mocks/data/recommendations'

const randomDelay = () => Math.round(Math.random() * 500) + 100

function paginate<T>(items: T[], page = 1, limit = 10) {
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const start = (currentPage - 1) * limit
  const end = start + limit
  const pageItems = items.slice(start, end)
  return {
    data: pageItems,
    pagination: {
      current_page: currentPage,
      total_pages: totalPages,
      total_records: total,
      page_size: limit,
      has_next: currentPage < totalPages,
      has_previous: currentPage > 1,
    },
  }
}

export const handlers = [
  // Matches the existing frontend call for recommendations_table
  http.get('/api/recommendations_table', async ({ request }) => {
    console.log('[MSW] Intercepted GET /api/recommendations_table', request.url)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? '1')
    const limit = Number(url.searchParams.get('limit') ?? '10')
    const search = url.searchParams.get('search') ?? ''
    const min_age = Number(url.searchParams.get('min_age') ?? '0')
    const max_age = Number(url.searchParams.get('max_age') ?? '120')
    const min_confidence = Number(url.searchParams.get('min_confidence') ?? '0')
    const products = url.searchParams.get('products')
      ? url.searchParams.get('products')!.split(',')
      : []

    // Simulate error state: ?mockError=true
    if (url.searchParams.get('mockError') === 'true') {
      console.log('[MSW] Simulating error')
      return HttpResponse.json({ message: 'Simulated server error' }, { status: 500 })
    }

    // Filter customers using params
    let filtered = MOCK_CUSTOMERS.filter(
      (c: MockCustomer) => c.age >= min_age && c.age <= max_age,
    )

    if (min_confidence > 0) {
      filtered = filtered.filter((c: MockCustomer) => c.aiConfidenceScore >= min_confidence)
    }

    if (products.length) {
      filtered = filtered.filter((c: MockCustomer) => products.includes(c.product))
    }

    if (search) {
      const s = search.toLowerCase()
      filtered = filtered.filter(
        (c: MockCustomer) =>
          c.fullName.toLowerCase().includes(s) ||
          c.city.toLowerCase().includes(s) ||
          c.customerId.toLowerCase().includes(s),
      )
    }

    // Edge case support: if ?empty=true -> return zero results
    if (url.searchParams.get('empty') === 'true') {
      filtered = []
    }

    const result = paginate(filtered, page, limit)

    // Keep shape similar to RecommendationResponse expected by frontend
    const payload = {
      data: result.data.map((c: MockCustomer) => ({
        customer_id: c.customerId,
        customer_name: c.fullName,
        gender: c.gender,
        age: c.age,
        city: c.city,
        state: c.state,
        occupation: c.occupation,
        income_bracket: c.incomeBracket,
        recommended_product: c.product,
        confidence_score: c.aiConfidenceScore / 100,
        reason: c.matchReason,
      })),
      pagination: result.pagination,
    }

    console.log('[MSW] Returning payload with', result.data.length, 'customers')
    await delay(randomDelay())
    return HttpResponse.json(payload)
  }),

  // New endpoint requested: /api/customers/matched (friendly payload)
  http.get('/api/customers/matched', async ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? '1')
    const limit = Number(url.searchParams.get('limit') ?? '10')
    const result = paginate(MOCK_CUSTOMERS, page, limit)

    const payload = {
      page,
      limit,
      total: result.pagination.total_records,
      data: result.data.map((c: MockCustomer) => ({
        customerId: c.customerId,
        fullName: c.fullName,
        city: c.city,
        age: c.age,
        product: c.product,
        aiConfidenceScore: c.aiConfidenceScore,
        matchReason: c.matchReason,
        lastUpdated: c.lastUpdated,
      })),
    }

    await delay(randomDelay())
    return HttpResponse.json(payload)
  }),

  // /api/products
  http.get('/api/products', () => {
    return HttpResponse.json({ data: PRODUCTS })
  }),

  // Demo sample endpoint that returns targeted recommendations for a product
  http.get('/api/recommendations_sample', async ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? '1')
    const limit = Number(url.searchParams.get('limit') ?? '10')
    const product = url.searchParams.get('product') ?? ''
    const min_confidence = Number(url.searchParams.get('min_confidence') ?? '0')
    const search = url.searchParams.get('search') ?? ''

    // Start from the curated list
    let items = getSampleRecommendations()

    if (product) {
      items = items.filter((r) => r.recommended_product === product)
    }

    if (min_confidence > 0) {
      // frontend uses 0-1 scale for confidence here
      items = items.filter((r) => r.confidence_score >= min_confidence)
    }

    if (search) {
      const s = search.toLowerCase()
      items = items.filter(
        (r) =>
          r.customer_name.toLowerCase().includes(s) ||
          r.city.toLowerCase().includes(s) ||
          r.customer_id.toLowerCase().includes(s),
      )
    }

    const result = paginate(items, page, limit)

    const payload = {
      data: result.data,
      pagination: result.pagination,
    }

    await delay(Math.round(Math.random() * 400) + 100)
    return HttpResponse.json(payload)
  }),

  // /api/filters
  http.get('/api/filters', () => {
    return HttpResponse.json(FILTERS)
  }),

  // /api/customer/:id
  http.get('/api/customer/:id', ({ params }) => {
    const { id } = params
    const customer = getCustomerById(id as string)
    if (!customer) return HttpResponse.json({ message: 'Customer not found' }, { status: 404 })

    return HttpResponse.json({ data: customer })
  }),
]
