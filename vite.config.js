import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const isRootDeployment = process.env.VERCEL || process.env.NETLIFY;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: isRootDeployment ? "/" : "/ShopVerse/",
});
