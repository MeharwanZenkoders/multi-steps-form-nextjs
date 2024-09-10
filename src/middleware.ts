import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import MultiStepForm from "./pages/stepForm";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  const { pathname } = req.nextUrl.clone();

  // if (pathname === "/") {
  //   return NextResponse.redirect(new URL("/home", req.url));
  // }
  const publicRoutes = ["/stepForm","/login", "/signup"];

  const protectedRoutes = ["/"];

  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/stepForm", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|static|favicon.ico|assets|favicon|manifest.json|_next).*)",
  ],
};
