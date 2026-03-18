import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./utils/amplify.server";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  // console.log("Middleware triggered for URL:", nextUrl);

  // Example: Redirect to login page if user is not authenticated
  // (In a real application, you would check authentication status here)
  if (nextUrl.pathname.startsWith("/admin")) {
    const authenticated = await isAuthenticated();
    console.log({ authenticated });
    if (!authenticated) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
}
