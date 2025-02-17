import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@mock', replacement: '/mock' },
      { find: '@twConfig', replacement: '/tailwind.config.js' },
    ]
  }
})
