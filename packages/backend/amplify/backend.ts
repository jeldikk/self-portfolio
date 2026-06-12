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
import * as lambda from "aws-cdk-lib/aws-lambda";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.dir({ filename: __filename, dirname: __dirname });

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

backend.resumeBuilderWorkerFunction.resources.lambda.addToRolePolicy(
  new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: ["bedrock:InvokeModel"],
    resources: ["*"],
  }),
);

const fontLayerStack = backend.createStack("FontLayerStack");

const resumeBuilderStack = backend.createStack("ResumeBuilderStack");

const queue = createSQSQueue(resumeBuilderStack, "ResumeBuilderQueue", {
  queueName: "resume-builder-queue",
});

const fontsLayer = new lambda.LayerVersion(
  fontLayerStack,
  "FontLayerTTFfiles",
  {
    code: lambda.Code.fromAsset(path.join(__dirname, "assets/fonts")),
    description: "static font assets for pdfkit library",
  },
);

backend.createResumeHandlerFunction.addEnvironment(
  "RESUME_BUILDER_QUEUE_URL",
  queue.queueUrl,
);
const resumeBuilderLambda =
  backend.resumeBuilderWorkerFunction.resources.lambda;

(resumeBuilderLambda as lambda.Function).addLayers(fontsLayer);

resumeBuilderLambda.addEventSource(
  new lambdaEventSource.SqsEventSource(queue, {
    batchSize: 5,
    maxConcurrency: 2,
  }),
);

queue.grantSendMessages(backend.createResumeHandlerFunction.resources.lambda);

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
