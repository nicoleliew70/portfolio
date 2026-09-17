import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { onRequestGet } from './functions/api/region.js'

const projectRoot = dirname(fileURLToPath(import.meta.url))

const DEV_REGION_RESPONSE_TIMEOUT_MS = 1000

const getRequestOrigin = (request) => {
  const forwardedProtocol = request.headers['x-forwarded-proto']?.split(',')[0]?.trim()
  const protocol = forwardedProtocol || 'http'
  const host = request.headers.host || 'localhost'
  return `${protocol}://${host}`
}

const getTestCountry = (request, apiUrl) => {
  let candidate
  if (apiUrl.searchParams.has('testCountry')) {
    candidate = apiUrl.searchParams.get('testCountry')
  } else {
    const referer = request.headers.referer
    if (typeof referer === 'string') {
      try {
        const refererUrl = new URL(referer, apiUrl)
        if (refererUrl.origin === apiUrl.origin && refererUrl.searchParams.has('testCountry')) {
          candidate = refererUrl.searchParams.get('testCountry')
        }
      } catch {
        // Ignore malformed Referer values and use the local default.
      }
    }
  }

  if (candidate === undefined) return 'MY'
  const country = candidate.trim().toUpperCase()
  return /^[A-Z]{2}$/.test(country) ? country : null
}

const readResponseText = async (response) => {
  let timer
  try {
    return await Promise.race([
      response.text(),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error('local region response timed out')), DEV_REGION_RESPONSE_TIMEOUT_MS)
      }),
    ])
  } finally {
    clearTimeout(timer)
  }
}

const localRegionMiddleware = () => ({
  name: 'local-region-simulation',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use(async (request, response, next) => {
      const apiUrl = new URL(request.url || '/', getRequestOrigin(request))
      if (request.method !== 'GET' || apiUrl.pathname !== '/api/region') {
        next()
        return
      }

      try {
        const simulatedCountry = getTestCountry(request, apiUrl)
        const regionResponse = await onRequestGet({
          request: {
            url: apiUrl.toString(),
            headers: new Headers(),
            cf: { country: simulatedCountry },
          },
        })
        const body = await readResponseText(regionResponse)
        response.statusCode = regionResponse.status
        regionResponse.headers.forEach((value, key) => response.setHeader(key, value))
        response.end(body)
      } catch (error) {
        response.statusCode = 500
        response.setHeader('content-type', 'application/json; charset=utf-8')
        response.end(JSON.stringify({ error: 'local region simulation failed' }))
        server.config.logger.error(`Local region simulation failed: ${error instanceof Error ? error.message : error}`)
      }
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    localRegionMiddleware(),
    react(),
    tailwindcss(),
  ],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectRoot, 'index.html'),
        chinese: resolve(projectRoot, 'chinese/index.html'),
        singapore: resolve(projectRoot, 'singapore/index.html'),
        australia: resolve(projectRoot, 'australia/index.html'),
      },
    },
  },
})
