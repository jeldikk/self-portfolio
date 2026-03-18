import { PreSignUpTriggerHandler } from "aws-lambda";

export const handler: PreSignUpTriggerHandler = async (event, context) => {
  console.log({ event, context });
  const email = event.request.userAttributes.email;
  const adminEmailId = process.env.ADMIN_EMAILID;
  if (!adminEmailId) {
    throw new Error(
      "Admin email ID is not configured in environment variables",
    );
  }

  if (email !== adminEmailId) {
    // If the email doesn't match the admin email, prevent sign-up
    throw new Error("Only the admin email is allowed to sign up");
  }

  return event;
};
