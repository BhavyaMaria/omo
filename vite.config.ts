import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": "/src/app",
      "@components": "/src/components",
      "@screens": "/src/screens",
      "@context": "/src/context",
      "@services": "/src/services",
      "@models": "/src/models"
    }
  }
});

