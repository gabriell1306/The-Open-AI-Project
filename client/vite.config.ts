import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // đảm bảo asset path đúng khi deploy
  build: {
    outDir: "dist", // mặc định là "dist", có thể để nguyên
  },
  server: {
    port: 3000, // local dev port, optional
  },
});
