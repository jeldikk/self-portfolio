import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { publicBucket } from "./storage/resource";
import { createContactMeFunction } from "./function/create-contact-me-handler/resource";
import { resumeBuilderWorkerFunction } from "./function/resume-builder-worker/resource";
import { createResumeHandlerFunction } from "./function/create-resume-handler/resource";
import * as lambdaEventSource from "aws-cdk-lib/aws-lambda-event-sources";
import * as iam from "aws-cdk-lib/aws-iam";
import { createSQSQueue } from "./utils/sqs-helpers";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  publicBucket,
  createContactMeFunction,
  resumeBuilderWorkerFunction,
  createResumeHandlerFunction,
});

const resumeBuilderStack = backend.createStack("ResumeBuilderStack");

const queue = createSQSQueue(resumeBuilderStack, "ResumeBuilderQueue", {
  queueName: "resume-builder-queue",
});

backend.createResumeHandlerFunction.addEnvironment(
  "RESUME_BUILDER_QUEUE_URL",
  queue.queueUrl,
);
const resumeBuilderLambda =
  backend.resumeBuilderWorkerFunction.resources.lambda;

resumeBuilderLambda.addEventSource(
  new lambdaEventSource.SqsEventSource(queue, {
    batchSize: 5,
    maxConcurrency: 2,
  }),
);

const sendEmailPolicy = new iam.PolicyStatement({
  actions: ["ses:SendEmail", "ses:SendRawEmail"],
  resources: ["*"],
});

backend.createContactMeFunction.resources.lambda.addToRolePolicy(
  sendEmailPolicy,
);

backend.resumeBuilderWorkerFunction.resources.lambda.addToRolePolicy(
  sendEmailPolicy,
);

backend.addOutput({
  custom: {
    resumeBuilderQueueUrl: queue.queueUrl,
    resumeBuilderQueueArn: queue.queueArn,
  },
});
