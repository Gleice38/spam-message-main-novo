import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  test: {
    environment: 'node'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://89.117.33.220:8000',
        changeOrigin: true
      }
    }
  }
})
