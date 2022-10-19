import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { builtinModules } from "module";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { CSS_KEY } from "./src/const";

const { BUILD_MFE } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin({ styleId: CSS_KEY })],
  base: "/spa",
  build: {
    outDir: BUILD_MFE ? "dist/mfe" : "dist",
    sourcemap: true,
    rollupOptions: {
      // input: {
      // main: path.resolve(__dirname, "index.html"),
      // },
      external: builtinModules, // https://github.com/vitejs/vite/issues/5676#issuecomment-1103710522
    },
    lib: BUILD_MFE
      ? {
          name: "mfe-beam",
          entry: path.resolve(__dirname, "src/lib.ts"),
          formats: ["es"],
        }
      : undefined,
  },
});
