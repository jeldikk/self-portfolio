import { defineStorage } from "@aws-amplify/backend";
import { resumeBuilderWorkerFunction } from "../function/resume-builder-worker/resource";

export const publicBucket = defineStorage({
  name: "self-public",
  access: (allow) => ({
    "public/images/*": [
      allow.guest.to(["read"]),
      allow.groups(["ADMIN"]).to(["delete", "write", "read"]),
    ],
    "private/resumes/*": [
      allow
        .resource(resumeBuilderWorkerFunction)
        .to(["write", "read", "delete"]),
      allow.groups(["ADMIN"]).to(["delete", "read", "write"]),
    ],
  }),
});
