// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        community: resolve(__dirname, 'community.html'),
        upload: resolve(__dirname, 'upload.html'),
        signup: resolve(__dirname, 'signup.html'),
        login: resolve(__dirname, 'login.html'),
        reset: resolve(__dirname, 'reset.html'),
      },
    },
  },
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
})
