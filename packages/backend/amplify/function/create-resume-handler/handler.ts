import type { Schema } from "../../data/resource";
import { Logger } from "@aws-lambda-powertools/logger";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import type { Handler } from "aws-lambda";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import { env } from "$amplify/env/self-portfolio-create-resume-lambda";
import { ResumeBuilderWorkerInputType } from "@packages/shared/types";

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

  logger.info("Resume Builder Queue Url is", { resumeBuilderQueueUrl });

  try {
    const resumeRecord = await client.models.Resume.create({
      jobDescription: event.arguments.jobDescription,
      name: event.arguments.name,
      companyName: event.arguments.companyName,
      pdfTemplateType: event.arguments.pdfTemplateType,
      status: "processing",
    });

    if (resumeRecord.errors) {
      throw Error("Error occured while creating a Resume record", {
        cause: resumeRecord.errors,
      });
    }
    const inputMessage: ResumeBuilderWorkerInputType = {
      resumeRecordId: resumeRecord.data?.id as string,
      jobDescription: event.arguments.jobDescription,
      templateType: event.arguments.pdfTemplateType,
      companyName: event.arguments.companyname,
    };

    const command = new SendMessageCommand({
      QueueUrl: resumeBuilderQueueUrl,
      MessageBody: JSON.stringify(inputMessage),
    });

    const response = await sqsClient.send(command);
    logger.info("Successfully sent message. Message Id", {
      messageId: response.MessageId,
    });

    return {
      status: "success",
      message: "Resume message queued",
      messageId: response.MessageId,
    };
  } catch (err) {
    logger.error("Error occurred :", { err });
    return {
      status: "failed",
      message: `Failed to create Resume`,
      messageId: null,
    };
  }
};
