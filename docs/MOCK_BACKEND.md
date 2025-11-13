# Mock Backend Setup Guide

## Overview
This project uses **Mock Service Worker (MSW)** v2 to simulate a backend API during development. The mock endpoints are automatically started when `VITE_USE_MOCKS=true` is set in `.env`.

## Key Features
- ✅ Intercepts all `/api/*` requests without modifying component code
- ✅ Returns realistic mock data (120 customers, Zenith products, Nigerian cities)
- ✅ Supports filtering, pagination, and search
- ✅ Easily switch between mock and real API with env variables
- ✅ Error state simulation with query params

## File Structure
```
src/mocks/
├── browser.ts              # MSW worker setup
├── handlers.ts             # HTTP request handlers
└── data/
    ├── customers.ts        # 120 mock customers
    ├── products.ts         # Zenith product list
    └── filters.ts          # Filter options (states, account types, etc.)
```

## Configuration

### Enable Mock Mode (Default in Dev)
Create/update `.env` in the project root:
```env
VITE_USE_MOCKS=true
```

### Switch to Real Backend
```env
VITE_USE_MOCKS=false
VITE_API_BASE_URL=http://localhost:8000
```

Then restart `npm run dev`.

## Available Endpoints

### 1. GET `/api/recommendations_table`
Returns paginated customer recommendations (shaped for existing frontend).

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `search` – filters by name, ID, or city
- `min_age`, `max_age` – age range
- `min_confidence` – confidence score threshold (0-1)
- `products` – comma-separated product names to filter
- `mockError=true` – simulates server error (500)
- `empty=true` – returns empty result set

**Example:**
```bash
curl "http://localhost:5175/api/recommendations_table?page=1&limit=10"
curl "http://localhost:5175/api/recommendations_table?search=Lagos&min_age=30&max_age=50"
curl "http://localhost:5175/api/recommendations_table?mockError=true"  # Returns 500
curl "http://localhost:5175/api/recommendations_table?empty=true"      # No results
```

### 2. GET `/api/customers/matched`
Alternative friendly endpoint for customers.

**Query Parameters:**
- `page`, `limit` (standard pagination)

**Example:**
```bash
curl "http://localhost:5175/api/customers/matched?page=1&limit=20"
```

### 3. GET `/api/products`
Returns the list of all Zenith banking products.

**Example:**
```bash
curl "http://localhost:5175/api/products"
```

### 4. GET `/api/filters`
Returns available filter options (age ranges, states, account types, statuses).

**Example:**
```bash
curl "http://localhost:5175/api/filters"
```

### 5. GET `/api/customer/:id`
Returns a single customer's full profile.

**Example:**
```bash
curl "http://localhost:5175/api/customer/CUST-100001"
curl "http://localhost:5175/api/customer/invalid"  # Returns 404
```

## Response Shapes

### `/api/recommendations_table` Response
```json
{
  "data": [
    {
      "customer_id": "CUST-100001",
      "customer_name": "Ade Okafor",
      "gender": "Male",
      "age": 35,
      "city": "Lagos",
      "state": "Lagos",
      "occupation": "Teacher",
      "income_bracket": "50k-150k",
      "recommended_product": "Personal Loan",
      "confidence_score": 0.75,
      "reason": "High product usage similarity"
    }
    // ... more customers
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 12,
    "total_records": 120,
    "page_size": 10,
    "has_next": true,
    "has_previous": false
  }
}
```

### `/api/products` Response
```json
{
  "data": [
    "Zenith Children's Account (ZECA)",
    "Aspire Account",
    "Personal Loan",
    // ... more products (42 total)
  ]
}
```

### `/api/filters` Response
```json
{
  "ageRange": [18, 70],
  "states": ["Lagos", "Abuja", "Kano", "Rivers", "Oyo", "Anambra", "Enugu", "Kaduna"],
  "accountTypes": ["Savings", "Current", "Premium"],
  "statuses": ["Active", "Dormant"]
}
```

## How It Works

1. **Startup**: When the app starts and `VITE_USE_MOCKS=true`, `src/main.tsx` dynamically imports the MSW worker from `src/mocks/browser.ts`.

2. **Worker Activation**: The worker calls `setupWorker(...handlers).start()` before the React app mounts, so all fetch requests are intercepted.

3. **Request Interception**: When the frontend makes a request to `/api/recommendations_table`, MSW intercepts it and matches it against the handlers defined in `src/mocks/handlers.ts`.

4. **Response Generation**: The handler filters the mock customer data based on query params and returns a JSON response.

5. **Network Bypass**: All requests appear to come from a real API. DevTools → Network tab shows requests with mock responses.

## Testing the Mocks

### In Browser Console
```javascript
// Fetch customers
fetch('/api/recommendations_table?page=1&limit=5')
  .then(r => r.json())
  .then(data => console.log(data))

// Fetch a single customer
fetch('/api/customer/CUST-100010')
  .then(r => r.json())
  .then(data => console.log(data))

// Test error state
fetch('/api/recommendations_table?mockError=true')
  .then(r => console.log('Status:', r.status))
```

### Via PowerShell/Curl
```powershell
# On Windows with PowerShell
Invoke-WebRequest -Uri "http://localhost:5175/api/recommendations_table?page=1&limit=10" -UseBasicParsing | Select-Object -ExpandProperty Content | ConvertFrom-Json

# With curl (if installed)
curl "http://localhost:5175/api/recommendations_table?page=1&limit=10"
```

## Extending the Mocks

### Add a New Endpoint
Edit `src/mocks/handlers.ts`:

```typescript
http.get('*/api/my-endpoint', ({ request }) => {
  const url = new URL(request.url)
  const param = url.searchParams.get('param')
  
  return HttpResponse.json({
    message: 'Hello from mock!',
    param,
  })
})
```

### Add More Mock Data
Edit `src/mocks/data/customers.ts` (or create a new data file) and export the data, then import it in `handlers.ts`.

### Simulate Delays
Use `await delay(milliseconds)` to simulate slow network (imported from `msw`):

```typescript
http.get('*/api/endpoint', async () => {
  await delay(2000)  // 2 second delay
  return HttpResponse.json({ data: 'response' })
})
```

## Switching to Real API

### Step 1: Update `.env`
```env
VITE_USE_MOCKS=false
VITE_API_BASE_URL=http://localhost:8000
```

### Step 2: Restart Dev Server
```bash
npm run dev
```

### Step 3: Verify Network Requests
Open DevTools → Network tab. Requests should now go to your real backend (check the URL in the request).

## Troubleshooting

### App Shows Blank Page
- Check browser console for errors
- Verify `.env` has `VITE_USE_MOCKS=true`
- Restart `npm run dev`

### No Data Appears in Table
- The mock API is loaded, but the Customers page may not receive results if filters are too restrictive
- Try clearing filters or navigate to a product category first
- Check Network tab to see the `/api/recommendations_table` response

### Requests Going to Real Backend When MSW Enabled
- MSW might not have started before the app mounted
- Check browser console for "[MSW] Mocking enabled" or error messages
- Restart the dev server: `npm run dev`

### Build Warnings About MSW
- MSW is in `devDependencies` and won't be bundled in production (by design)
- Warnings are expected and safe

## Notes

- **Production**: MSW is only loaded in dev when `VITE_USE_MOCKS=true`. In production, either remove the check or ensure `VITE_USE_MOCKS` is false.
- **API URLs**: MSW patterns use `*/api/...` to match any domain prefix, so it works with relative paths (e.g., `/api/...`) or full URLs.
- **Real API Fallback**: When `VITE_USE_MOCKS=false`, the frontend will use `VITE_API_BASE_URL` to construct API calls (see `src/services/recommendations.ts`).
