import '../css/app.css' // ★重要：v4はこれが無いと効かない

import React from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'

// Type-safe Page resolver
createInertiaApp({
  resolve: name => {
    // Use unknown to avoid TypeScript error on import.meta.glob
    const pages: Record<string, { default: React.ComponentType<unknown> }> = (
      import.meta as {
        glob: (
          pattern: string,
          options: { eager: boolean }
        ) => Record<string, { default: React.ComponentType<unknown> }>
      }
    ).glob('./Pages/**/*.tsx', { eager: true })
    const page = pages[`./Pages/${name}.tsx`]
    return page ? page.default : undefined
  },
  setup({ el, App, props }) {
    // Remove as PageProps to fix TS error (assume App expects these props directly)
    createRoot(el).render(<App {...props} />)
  },
})
