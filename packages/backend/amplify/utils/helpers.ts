import * as sqs from "aws-cdk-lib/aws-sqs";
import { Stack } from "aws-cdk-lib";

export function createSqsQueue(
  scope: Stack,
  id: string,
  props?: sqs.QueueProps,
): sqs.IQueue {
  return new sqs.Queue(scope, id, {
    ...props,
  });
}
