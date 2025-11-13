// src/mocks/browser.ts
// Mock Service Worker browser setup (MSW v2). This file creates and exports the `worker`.
// To enable mocks in development, set `VITE_USE_MOCKS=true` in a `.env` file
// at the project root and the worker will be started automatically from
// `src/main.tsx` before the app mounts.

import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

console.log('[MSW] Browser module loaded, handlers count:', handlers.length)

export const worker = setupWorker(...handlers)

// Note: in production builds you should not start the worker.
// To switch to a real API, unset `VITE_USE_MOCKS` or set it to `false`.
