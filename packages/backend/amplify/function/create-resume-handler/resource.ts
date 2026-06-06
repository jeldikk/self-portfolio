import { defineFunction } from "@aws-amplify/backend";

export const createResumeHandlerFunction = defineFunction({
  name: "self-portfolio-create-resume-lambda",
  entry: "./handler.ts",
  runtime: 24,
});
