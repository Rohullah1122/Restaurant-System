// Vite settings file
import { defineConfig } from "vite"; // helper to write the config
import react from "@vitejs/plugin-react"; // lets Vite understand React (JSX)

// export the settings so Vite can use them
export default defineConfig({
  plugins: [react()], // turn on the React plugin
});
