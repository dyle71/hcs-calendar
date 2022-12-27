import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

const projectRootDir = resolve(__dirname);

export default defineConfig({
  plugins: [vue(), eslintPlugin(), VueI18nPlugin({})],
  resolve: {
    alias: {
      "@": resolve(projectRootDir, "src"),
    },
  },
});
