// create a lambda handler function in typescript with good type annotations

import { type SQSHandler } from "aws-lambda";
import { Logger } from "@aws-lambda-powertools/logger";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import { env } from "$amplify/env/resume-builder-worker-function";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../data/resource";

const logger = new Logger({
  serviceName: "self-portfolio-resume-builder-service",
});

const { libraryOptions, resourceConfig } =
  await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();

export const handler: SQSHandler = async (event, context) => {
  logger.info("Event of execution is", { event, context });
};
