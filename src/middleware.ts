import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const authenticated = token ? true : false;

  if (!authenticated && request.nextUrl.pathname.startsWith("/account")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authenticated && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  if (authenticated && request.nextUrl.pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/login/:path*", "/register/:path*"],
};
