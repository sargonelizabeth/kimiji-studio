import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true, https: false, host: true },
  preview: { port: 4173, strictPort: true },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        community: resolve(__dirname, 'community.html'),
        upload: resolve(__dirname, 'upload.html'),
      }
    }
  }
})
