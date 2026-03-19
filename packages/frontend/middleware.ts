// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/my-buffs",
  "/boosting-station",
  "/payment",
  "/subscription-payment",
];
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/session/validate`,
        {
          headers: {
            Cookie: `token=${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok || !data.data) {
        const response = NextResponse.redirect(
          new URL("/sign-in", request.url),
        );
        response.cookies.delete("token");
        return response;
      }

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", data.userId);
      requestHeaders.set("x-user-type", data.userType);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("Session validation error:", error);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (isAuthRoute && token) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/session/validate`,
        {
          headers: {
            Cookie: `token=${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok && data.data) {
        return NextResponse.redirect(new URL("/boosting-station", request.url));
      }
    } catch {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
