import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true, https: false, host: true },
  preview: { port: 4173, strictPort: true },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        community: path.resolve(__dirname, 'community.html'),
        upload: path.resolve(__dirname, 'upload.html'),
      }
    }
  }
})
