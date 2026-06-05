import { Schema } from "../../data/resource";
import { Logger } from "@aws-lambda-powertools/logger";
import { SQSClient } from "@aws-sdk/client-sqs";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import type { Handler } from "aws-lambda";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import { env } from "$amplify/env/self-portfolio-create-resume-lambda";

const logger = new Logger({
  serviceName: "self-portfolio-resume-builder-service",
});

const { libraryOptions, resourceConfig } =
  await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();
const sqsClient = new SQSClient({ region: process.env.AWS_REGION });

export const handler: Handler = async (event, context) => {
  logger.info("Event of execution is", { event, context });
  const resumeBuilderQueueUrl = process.env.RESUME_BUILDER_QUEUE_URL;
  if (!resumeBuilderQueueUrl) {
    throw new Error("RESUME_BUILDER_QUEUE_URL is not set");
  }

  return {
    statusCode: 200,
  };
};
