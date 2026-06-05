// create a lambda handler function in typescript with good type annotations

import { type SQSHandler } from "aws-lambda";
import { Logger } from "@aws-lambda-powertools/logger";

const logger = new Logger({
  serviceName: "self-portfolio-resume-builder-service",
});

export const handler: SQSHandler = async (event, context) => {
  console.log("event", event);
};
