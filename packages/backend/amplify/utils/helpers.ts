import { Fn, Stack } from "aws-cdk-lib";

// Extract the last part of stackId from a given stack by splitting using '-'
export function getSuffixFromStack(stack: Stack): string {
  const shortStackId = Fn.select(2, Fn.split("/", stack.stackId));
  const suffix = Fn.select(4, Fn.split("-", shortStackId));
  return suffix;
}
