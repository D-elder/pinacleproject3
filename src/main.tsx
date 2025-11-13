import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'

import App from './App.tsx'
import './index.css'
import './i18n/config'

import { queryClient } from '@/lib/queryClient'
import { LanguageProvider } from '@/providers/LanguageProvider'

// If you want to use the in-browser mock API, set VITE_USE_MOCKS=true
// in a `.env` file at the project root. The MSW worker will be started
// before the app mounts so all `fetch` calls to `/api/*` are intercepted.
async function init() {
  console.log('[App] Init starting. VITE_USE_MOCKS =', import.meta.env.VITE_USE_MOCKS)
  
  if (import.meta.env.VITE_USE_MOCKS === 'true') {
    try {
      console.log('[App] Starting MSW worker...')
      // dynamic import so MSW is only bundled in dev when used
      const { worker } = await import('./mocks/browser')
      console.log('[App] MSW worker imported, calling start()...')
      
      // Add timeout to prevent hanging
      const startPromise = worker.start({ onUnhandledRequest: 'bypass' })
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('MSW worker start timeout after 5s')), 5000)
      )
      
      await Promise.race([startPromise, timeoutPromise])
      console.log('[App] MSW worker started successfully')
    } catch (error) {
      console.error('[App] Failed to start MSW worker:', error)
      // Continue anyway - app will work without mocks
    }
  } else {
    console.log('[App] MSW disabled (VITE_USE_MOCKS is not true)')
  }

  console.log('[App] Mounting React app...')
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>,
  )
  console.log('[App] React app mounted')
}

void init()
