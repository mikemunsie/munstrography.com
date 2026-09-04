import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";

import { portfolioPlugin } from "./vite-plugin-portfolio";

export default defineConfig({
  plugins: [react(), portfolioPlugin()],
  server: {
    port: 3001,
    host: true,
    strictPort: true,
  },
  preview: {
    port: 3001,
  },
  build: {
    outDir: "build",
    sourcemap: false,
  },
});
