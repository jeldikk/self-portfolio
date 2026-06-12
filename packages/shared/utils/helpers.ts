export function isAWSLambdaExecution(): boolean {
  return !!process.env.AWS_LAMBDA_FUNCTION_NAME;
}
