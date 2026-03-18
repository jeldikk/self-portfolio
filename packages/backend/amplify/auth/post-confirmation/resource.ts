import { defineFunction } from "@aws-amplify/backend";

export const postConfirmation = defineFunction({
  name: "self-post-confirmation",
  entry: "./handler.ts",
});
