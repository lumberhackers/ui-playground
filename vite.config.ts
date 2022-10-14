import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { builtinModules } from "module";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    sourcemap: true,
    rollupOptions: {
      external: builtinModules, // https://github.com/vitejs/vite/issues/5676#issuecomment-1103710522
    },
    lib: {
      name: "mfe-beam",
      entry: path.resolve(__dirname, "src/main.ts"),
      formats: ["es"],
    },
  },
});
