// create a lambda handler function in typescript with good type annotations

import { type SQSHandler } from "aws-lambda";
import { Logger } from "@aws-lambda-powertools/logger";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import { env } from "$amplify/env/resume-builder-worker-function";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../data/resource";
import { generateText, Output } from "ai";
import { bedrock } from "@packages/shared/ai";
import type { ResumeBuilderWorkerInputType } from "@packages/shared/types";
import { portfolioDetailsSchema } from "@packages/shared/schemas";
import { createResumePdf } from "@packages/shared/utils";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const logger = new Logger({
  serviceName: "self-portfolio-resume-builder-service",
});

const { libraryOptions, resourceConfig } =
  await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();
const s3Client = new S3Client({});

export const handler: SQSHandler = async (event, context) => {
  logger.info("Event of execution is", { event, context });
  for (const record of event.Records) {
    const inputMessage: ResumeBuilderWorkerInputType = JSON.parse(record.body);
    const { text, output } = await generateText({
      model: bedrock("openai.gpt-oss-120b-1:0"),
      system:
        "You are an expert technical resume writer and ATS optimization specialist. Rewrite and refine the provided resume to maximize its alignment with the given Job Description. Maintain strict factual accuracy—do not invent data, but rephrase existing experience to highlight relevant keyword matches.",
      prompt: `
      --- INPUT RESUME ---
      ${inputMessage.resumeText}

      --- TARGET JOB DESCRIPTION ---
      ${inputMessage.jobDescription}
    `,
      output: Output.object({
        schema: portfolioDetailsSchema,
      }),
    });

    const pdfBuffer = await createResumePdf(output, inputMessage.templateType);

    // const putCommand = new PutObjectCommand({
    //   Bucket: ""
    // })
    logger.info("Created PDF Buffer is :", { pdfBuffer });
  }
};
