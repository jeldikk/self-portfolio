import { Schema } from "../../data/resource";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import { env } from "$amplify/env/create-contact-me";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const { resourceConfig, libraryOptions } =
  await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();

const ses = new SESClient({});

export const handler: Schema["ContactMeMutation"]["functionHandler"] = async (
  event,
) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  let authMode: "userPool" | "iam" = "iam";

  const response = await client.models.ContactMe.create(
    {
      name: event.arguments.name,
      email: event.arguments.email,
      message: event.arguments.message,
      wantAcknowledgement: event.arguments.wantAcknowledgement,
    },
    {
      authMode,
    },
  );

  console.dir({ response }, { depth: null });

  const adminCommand = new SendEmailCommand({
    Destination: {
      ToAddresses: ["admin@jeldikk.fyi"],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `
            You have a new contact message from your portfolio website!

            Name: ${event.arguments.name}
            Email: ${event.arguments.email}

            With Below Message:
            --------------------
            ${event.arguments.message}
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "You got a New Contact Message from Your Portfolio Website!",
      },
    },
    Source: "admin@jeldikk.fyi",
  });

  const userCommand = new SendEmailCommand({
    Destination: {
      ToAddresses: [event.arguments.email],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `
            Your message has been received! 
            
            Thank you for reaching out through my portfolio website. 
            I will get back to you as soon as possible.

            Here is a copy of your message:
            --------------------
            ${event.arguments.message}
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Your message has been received - Jeldikk Portfolio",
      },
    },
    Source: "admin@jeldikk.fyi",
  });

  try {
    await ses.send(adminCommand);
    if (event.arguments.wantAcknowledgement) {
      await ses.send(userCommand);
      await client.models.ContactMe.update(
        {
          id: response.data?.id!,
          acknowledged: true,
          acknowledgedAt: new Date().toISOString(),
        },
        {
          authMode,
        },
      );
    }
  } catch (err) {
    console.error("Error sending email:", err);
  }

  return response.data;
};
