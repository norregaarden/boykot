import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  // build: { rollupOptions: ['csv-parse/sync']},
  start: {
    middleware: "./src/middleware.ts",
  },
  assetsInclude: ['**/*.csv']
});
