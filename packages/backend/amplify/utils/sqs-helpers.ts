import * as sqs from "aws-cdk-lib/aws-sqs";
import { Duration, type Stack } from "aws-cdk-lib";
import { getSuffixFromStack } from "./helpers";

export function createSQSQueue(
  stack: Stack,
  id: string,
  props?: sqs.QueueProps,
): sqs.IQueue {
  return new sqs.Queue(stack, id, {
    ...props,
    queueName: `${props?.queueName}-${process.env.APP_ENV}-${getSuffixFromStack(stack)}`,
    visibilityTimeout: Duration.seconds(30 * 60),
    // keep retention period to default 4 days
  });
}
