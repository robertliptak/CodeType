import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "vite-plugin-sass";

export default defineConfig({
  plugins: [react(), sass()],
  publicDir: "assets",
  server: {
    port: 3000,
    open: true,
  },
});
