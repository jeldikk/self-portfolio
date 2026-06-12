import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";

export const bedrock = createAmazonBedrock({
  apiKey: process.env.AWS_BEARER_TOKEN_BEDROCK as string,
  region: process.env.BEDROCK_REGION as string,
});
