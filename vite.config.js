import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const openRouterKey =
    env.OPEN_ROUTER_API_KEY ||
    env.VITE_OPEN_ROUTER_API_KEY ||
    env.VITE_OPENROUTER_API_KEY ||
    process.env.OPEN_ROUTER_API_KEY ||
    process.env.VITE_OPEN_ROUTER_API_KEY ||
    "";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".jsx", ".tsx", ".js", ".ts", ".mjs", ".mts", ".json"],
    },
    define: {
      "process.env.REACT_APP_BACKEND_URL": JSON.stringify(
        env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || ""
      ),
      "process.env.OPEN_ROUTER_API_KEY": JSON.stringify(openRouterKey),
      "import.meta.env.VITE_OPEN_ROUTER_API_KEY": JSON.stringify(openRouterKey),
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
