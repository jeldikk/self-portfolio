import { defineStorage } from "@aws-amplify/backend";

export const publicBucket = defineStorage({
  name: "self-public-bucket",
  isDefault: true,
  access: (allow) => ({
    "public/images/*": [
      allow.guest.to(["read"]),
      allow.groups(["ADMIN"]).to(["delete", "write", "read"]),
    ],
  }),
});
