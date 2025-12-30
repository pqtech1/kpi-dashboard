import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/kpi/",
  server: {
    host: true,
    port: 8080,
    strictPort: true, // <-- ADD THIS
    allowedHosts: ["techupgrad.in", "www.techupgrad.in"],
    // CRITICAL: Add this middleware
    proxy: {
      "/kpi": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kpi/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
