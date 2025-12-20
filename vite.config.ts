import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig({
  base: "/kpi/",
  server: {
    host: true,
    port: 8080,
    allowedHosts: ["techupgrad.in", "www.techupgrad.in"],
  },
});
