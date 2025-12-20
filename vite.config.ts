import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/kpi/", // This is correct
  server: {
    host: true,
    port: 8080,
    allowedHosts: ["techupgrad.in", "www.techupgrad.in"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
