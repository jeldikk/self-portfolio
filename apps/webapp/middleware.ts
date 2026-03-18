import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  console.log("Middleware triggered for URL:", nextUrl);

  // Example: Redirect to login page if user is not authenticated
  // (In a real application, you would check authentication status here)
  if (nextUrl.pathname.startsWith("/admin")) {
    const isAuthenticated = false; // Replace with actual authentication check
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
}
