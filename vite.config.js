// vite.config.js (multi-page)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        community: path.resolve(__dirname, 'community.html'),
        upload: path.resolve(__dirname, 'upload.html'),
        signup: path.resolve(__dirname, 'signup.html'),
        login: path.resolve(__dirname, 'login.html'),   // 추가
        reset: path.resolve(__dirname, 'reset.html'),   // 추가
      }
    }
  }
});
