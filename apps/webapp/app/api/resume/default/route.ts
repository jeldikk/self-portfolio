import { NextResponse } from "next/server";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify.server";

export async function GET() {
  const authenticated = await isAuthenticated();

  const authMode = authenticated ? "userPool" : "iam";

  const defaultResume = await cookieBasedClient.models.Resume.list({
    filter: {
      and: {
        isDefault: {
          eq: true,
        },
        status: {
          eq: "completed",
        },
      },
    },
    authMode,
    selectionSet: ["id", "s3Key", "status"],
  });

  if (defaultResume.errors) {
    console.error({ errors: defaultResume.errors });
    return NextResponse.json(
      {
        error: "Failed to fetch default resume",
      },
      {
        status: 500,
      },
    );
  }

  if (defaultResume.data.length === 0) {
    console.log("There are no records found");
    return NextResponse.json(
      {
        error: "Record not found",
      },
      {
        status: 404,
      },
    );
  }

  const resumeData = defaultResume.data[0];

  return NextResponse.json(
    {
      ...resumeData,
    },
    {
      status: 200,
    },
  );
}
