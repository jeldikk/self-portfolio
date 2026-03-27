import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { publicBucket } from "./storage/resource";
import { createContactMeFunction } from "./function/resource";
import * as iam from "aws-cdk-lib/aws-iam";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  publicBucket,
  createContactMeFunction,
});

backend.createContactMeFunction.resources.lambda.addToRolePolicy(
  new iam.PolicyStatement({
    actions: ["ses:SendEmail", "ses:SendRawEmail"],
    resources: ["*"],
  }),
);
