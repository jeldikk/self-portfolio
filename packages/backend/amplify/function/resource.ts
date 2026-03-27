import { defineFunction } from "@aws-amplify/backend";

export const createContactMeFunction = defineFunction({
  name: "create-contact-me",
  entry: "./handlers/create-contact-me.handler.ts",
  environment: {
    ADMIN_EMAILID: process.env.ADMIN_EMAILID || "",
  },
});
