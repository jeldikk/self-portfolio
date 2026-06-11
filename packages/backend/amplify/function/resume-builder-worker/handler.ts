import { type SQSHandler } from "aws-lambda";
import { Logger } from "@aws-lambda-powertools/logger";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import { env } from "$amplify/env/resume-builder-worker-function";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../data/resource";
import { generateResume } from "@packages/shared/ai";
import type { ResumeBuilderWorkerInputType } from "@packages/shared/types";
import {
  createResumePdf,
  portfolioDetailsToText,
} from "@packages/shared/utils";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { InputMode } from "aws-cdk-lib/aws-stepfunctions-tasks";

const logger = new Logger({
  serviceName: "self-portfolio-resume-builder-service",
});

const { libraryOptions, resourceConfig } =
  await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();
const s3Client = new S3Client({});

export const handler: SQSHandler = async (event, context) => {
  logger.info("Event of execution is", {
    event,
    context,
    recordsLength: event.Records.length,
  });
  const bucketName = process.env.SELF_PUBLIC_BUCKET_NAME;
  for (const record of event.Records) {
    const inputMessage: ResumeBuilderWorkerInputType = JSON.parse(record.body);

    try {
      const resumeText = portfolioDetailsToText();

      logger.info("Input Message is ", { inputMessage });
      logger.info("resumeText is ", { resumeText });
      const { output, text } = await generateResume(
        resumeText,
        inputMessage.jobDescription,
      );

      const pdfBuffer = await createResumePdf(
        output,
        inputMessage.templateType,
      );

      // TODO: store the pdf file in S3
      const putCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: `private/resumes/${inputMessage.resumeRecordId}.pdf`,
        Body: pdfBuffer,
        ContentType: "application/pdf",
      });

      await s3Client.send(putCommand);

      // TODO: Update the resume record in DynamoDB wit S3 details, status and timestamp
      const result = await client.models.Resume.update({
        id: inputMessage.resumeRecordId,
        s3Key: `private/resumes/${inputMessage.resumeRecordId}.pdf`,
        status: "completed",
      });

      if (result.errors) {
        logger.error("Error occurred while updating resume record", {
          errors: result.errors,
        });
      }
    } catch (err) {
      logger.error("There is error with processing of record", { err });
      await client.models.Resume.update({
        id: inputMessage.resumeRecordId,
        s3Key: `private/resumes/${inputMessage.resumeRecordId}.pdf`,
        status: "failed",
      });
    }
  }

  return;
};
