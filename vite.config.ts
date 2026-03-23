import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          ui: ["@radix-ui/react-select", "@radix-ui/react-slider", "@radix-ui/react-slot"],
          game: ["matter-js", "motion", "zustand"],
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
