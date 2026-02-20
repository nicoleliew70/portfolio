import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Use '/portfolio' for GitHub Pages, '/' for Netlify
  base: process.env.DEPLOY_TARGET === 'ghpages' ? '/portfolio' : '/'
})