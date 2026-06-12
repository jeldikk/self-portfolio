import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";

export const bedrock = createAmazonBedrock({
  apiKey: process.env.AMPLIFY_BEARER_TOKEN_BEDROCK as string,
  region: process.env.AMPLIFY_BEDROCK_REGION as string,
});
