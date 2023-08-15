import { defineConfig } from "vite";
import dns from "dns";
import react from "@vitejs/plugin-react-swc";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  vite: {
    define: {
      "process.env.DB_CONFIG3_HOST": process.env,
    },
  },
<<<<<<< HEAD
  base: `'/deploy/'`,
=======
>>>>>>> parent of 1990284 (Update vite.config.js)
});
