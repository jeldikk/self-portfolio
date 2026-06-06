import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "utils/index.ts",
    "schemas/index.ts",
    "ai/index.ts",
    "types/index.ts",
  ],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
