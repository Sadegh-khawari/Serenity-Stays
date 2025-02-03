import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    watch: {
      usePolling: true, // Ensures changes are detected on all OS (especially WSL)
      interval: 100, // Polling interval in milliseconds
    },
    hmr: {
      overlay: false, // Prevents full-page reloads on errors
    },
    strictPort: true, // Ensures Vite does not switch ports if the default is in use
    port: 5173, // Set a fixed port (optional)
    open: true, // Opens the browser on server start
  },
});
