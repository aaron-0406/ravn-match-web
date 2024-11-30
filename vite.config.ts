import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access from remote IPs
    port: 5173, // Your port
    hmr: {
      host: '18.206.133.13', // The public IP or domain
      port: 5173,            // Match the port your Vite server is running on
    },
  },
})
