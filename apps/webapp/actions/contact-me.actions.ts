"use server";

import { createContactMeSchema } from "@/schemas/contact-me.schemas";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify.server";

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

    return {
      success: true,
      message: "Your message has been sent successfully!",
      errors: null,
    };
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
}
