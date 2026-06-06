import { defineStorage } from "@aws-amplify/backend";

export const publicBucket = defineStorage({
  name: "self-public",
  access: (allow) => ({
    "public/images/*": [
      allow.guest.to(["read"]),
      allow.groups(["ADMIN"]).to(["delete", "write", "read"]),
    ],
    "private/resumes/*": [
      allow.groups(["ADMIN"]).to(["delete", "read", "write"]),
    ],
  }),
});
