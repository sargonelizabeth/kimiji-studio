import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        community: resolve(__dirname, "community.html"),
        signup: resolve(__dirname, "signup.html"),
        login: resolve(__dirname, "login.html"),
        find: resolve(__dirname, "find.html"),
        upload: resolve(__dirname, "upload.html"),
        authCallback: resolve(__dirname, "auth/callback.html"),
      }
    }
  }
});
