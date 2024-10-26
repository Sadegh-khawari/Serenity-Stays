import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), eslint()],
    server: {
        watch: {
            // Vite will watch all files in the current directory and its subdirectories
            include: ["src/**", "index.html"],
            // But it will ignore files in the `node_modules` directory
            exclude: ["node_modules/**"],
        },
    },
});

