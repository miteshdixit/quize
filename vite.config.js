import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    proxy:
      process.env.NODE_ENV === "development"
        ? {
            "/api": {
              target: "https://api.jsonserve.com", // Your actual API endpoint
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ""),
            },
          }
        : {},
  },
});
