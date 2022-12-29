import { NextResponse } from "next/server";

import verifyJwt from "./utils/jose/verify-jwt.js";

const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/football",
  "/rugby",
  "/judo",
];
const protectedRoutes = ["/profile", "/sports", "/todo"];
const adminRoutes = ["/admin"];

export const middleware = async (request) => {
  const hasJWT = request.cookies.has("currentUser");

  // Redirect if try to access to Admin and not logged in.
  if (adminRoutes.includes(request.nextUrl.pathname) && !hasJWT) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Redirect if try to access to Admin and not `ADMIN` role.
  if (adminRoutes.includes(request.nextUrl.pathname) && hasJWT) {
    const jwt = request.cookies.get("currentUser")?.value;

    const currentUser = await verifyJwt(jwt, "middlewareAdmin", NextResponse);

    if (currentUser?.role !== "ADMIN")
      return NextResponse.redirect(new URL("/profile", request.url));
  }

  // Redirect to login page if not logged.
  if (protectedRoutes.includes(request.nextUrl.pathname) && !hasJWT)
    return NextResponse.redirect(new URL("/sign-in", request.url));

  // Redirect to profile if already logged in.
  if (publicRoutes.includes(request.nextUrl.pathname) && hasJWT) {
    // Get jwt.
    const jwt = request.cookies.get("currentUser")?.value;

    const isVerified = await verifyJwt(jwt, "middleware", NextResponse);

    if (isVerified)
      return NextResponse.redirect(new URL("/profile", request.url));
  }
};
