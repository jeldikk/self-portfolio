"use server";

import { resumeBuilderSchema } from "@/schemas/resume-builder.schema";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify.server";
import { redirect } from "next/navigation";

export interface CreateFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]> | null;
}

export async function createResumeAction(
  prevState: CreateFormState,
  formData: FormData,
) {
  console.log("Received form data: ", Object.fromEntries(formData.entries()));

  const rawInput = {
    name: formData.get("name"),
    jobDescription: formData.get("job-description"),
    pdfTemplateType: formData.get("pdf-template-type"),
    companyName: formData.get("company-name"),
  };

  const parsedData = resumeBuilderSchema.safeParse(rawInput);

  console.dir({ parsedData }, { depth: null });

  if (!parsedData.success) {
    return {
      success: false,
      message: "Invalid form data",
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const { name, jobDescription, pdfTemplateType, companyName } =
    parsedData.data;

  try {
    const isAuth = await isAuthenticated();

    if (!isAuth) {
      redirect("/auth/login");
    }

    const result = await cookieBasedClient.mutations.createResumeMutation({
      name,
      jobDescription,
      companyName,
      pdfTemplateType,
    });
    console.dir({ result }, { depth: null });
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "An error occurred while creating the resume",
      errors: {
        general: ["An error occurred while creating the resume"],
      },
    };
  }

  redirect("/admin/resumes");
}
