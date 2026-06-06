import { defineFunction } from "@aws-amplify/backend";

export const resumeBuilderWorkerFunction = defineFunction({
  name: "resume-builder-worker-function",
  entry: "./handler.ts",
  runtime: 24,
});
