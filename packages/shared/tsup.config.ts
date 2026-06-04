import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["utils/index.ts", "schemas/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
