import { PostConfirmationTriggerHandler } from "aws-lambda";
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({});

export const handler: PostConfirmationTriggerHandler = async (
  event,
  context,
) => {
  console.log({ event, context });
  const command = new AdminAddUserToGroupCommand({
    GroupName: "ADMIN",
    UserPoolId: event.userPoolId,
    Username: event.userName,
  });

  const response = await cognitoClient.send(command);
  console.log("processed", response.$metadata);
  return event;
};
