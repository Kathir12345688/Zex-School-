import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_URL || 'https://zex-school.onrender.com'

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Proxy API requests to the Django backend to avoid CORS in dev
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
        // Proxy media files served by Django
        '/media': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
