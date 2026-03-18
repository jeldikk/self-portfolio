import { defineFunction } from "@aws-amplify/backend";

export const preSignUp = defineFunction({
  name: "self-pre-signup",
  entry: "./handler.ts",

  environment: {
    ADMIN_EMAILID: process.env.ADMIN_EMAILID || "",
  },
});
