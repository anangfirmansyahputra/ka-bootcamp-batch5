import { NextResponse } from "next/server";

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next();

    response.headers.set(
      "Access-Control-Allow-Origin",
      "http://localhost:3001",
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );

    if (req.method === "OPTIONS") {
      return new NextResponse(null, { status: 204 });
    }

    return response;
  }

  const currentUser = req.cookies.get("currentUser")?.value;

  if (currentUser) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/user",
    "/category/:path*",
    "/product/:path*",
    "/order/:path*",
    "/api/:path*",
  ],
};
