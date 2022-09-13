import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    "/": {
      target: "http://127.0.0.1:4000",
      changeOrigin: true,
      ws: true,
      credentials: "include",
    },
  },
});
