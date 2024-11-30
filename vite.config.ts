import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ws': {
        target: 'ws://18.206.133.13:5173',
        ws: true, // Indica que es una conexión WebSocket
      },
    },
    host: true,
    port: 5173,
  },
})
