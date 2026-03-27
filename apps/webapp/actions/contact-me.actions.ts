"use server";

import { createContactMeSchema } from "@/schemas/contact-me.schemas";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify.server";
import { redirect } from "next/navigation";

export interface CreateFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]> | null;
}

export async function createContactMeAction(
  prevState: CreateFormState,
  formData: FormData,
) {
  console.log("Received form data:", Object.fromEntries(formData.entries()));
  const parsedData = createContactMeSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    wantAcknowledgement: formData.get("acknowledge") === "on",
  });

  console.dir({ parsedData }, { depth: null });
  if (!parsedData.success) {
    return {
      success: false,
      message: "There were errors with your submission",
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const { name, email, message, wantAcknowledgement } = parsedData.data;
  let createdRecordId: string | undefined;

  try {
    let authMode: "userPool" | "iam" = "iam";

    if (await isAuthenticated()) {
      authMode = "userPool";
    }

    const response = await cookieBasedClient.mutations.ContactMeMutation(
      {
        name: name || "",
        email,
        message,
        wantAcknowledgement,
      },
      {
        authMode,
      },
    );

    console.dir({ response }, { depth: null });
    createdRecordId = response.data?.id;
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message:
        "An error occurred while sending your message. Please try again later.",
      errors: {
        general: ["Failed to send message. Please try again later."],
      },
    };
  }

  if (!createdRecordId) {
    return {
      success: false,
      message: "Message was created but no record id was returned.",
      errors: {
        general: ["Missing record id in response."],
      },
    };
  }

  redirect(`/contact-me/success/${createdRecordId}`);
}
