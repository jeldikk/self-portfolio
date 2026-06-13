import { defineFunction } from "@aws-amplify/backend";

export const resumeBuilderWorkerFunction = defineFunction({
  name: "resume-builder-worker-function",
  entry: "./handler.ts",
  runtime: 24,
  bundling: {
    minify: false,
  },
  timeoutSeconds: 5 * 60,
  environment: {
    MAX_RETRIES: process.env.MAX_RETRIES ?? "5",
  },
});
