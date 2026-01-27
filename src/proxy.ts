import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.pathname.toLowerCase();
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // Prevent common attack patterns
  const blockedPatterns = ["/wp-admin", "/wp-login", "/admin", ".php", ".env"];
  if (blockedPatterns.some((pattern) => url.includes(pattern))) {
    return NextResponse.rewrite(new URL("/not-found-trigger", request.url));
  }

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `;

  // Security Headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    cspHeader.replace(/\s{2,}/g, " ").trim(),
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set(
    "Content-Security-Policy",
    cspHeader.replace(/\s{2,}/g, " ").trim(),
  );
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload",
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * /_next/static (static files)
     * /_next/image (image optimization files)
     * favicon.ico (favicon file)
     * Các file ảnh trong public (.png, .jpg...)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
