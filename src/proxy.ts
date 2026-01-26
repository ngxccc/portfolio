import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl.pathname.toLowerCase();

  // Security Headers
  const headers = response.headers;
  headers.set("X-XSS-Protection", "1; mode=block");
  // Chống clickjacking
  headers.set("X-Frame-Options", "SAMEORIGIN");
  // Ép trình duyệt chỉ load resource an toàn
  headers.set("X-Content-Type-Options", "nosniff");
  // Bảo vệ thông tin referrer
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // Chặn các tính năng không dùng đến
  headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );
  // HSTS (Bắt buộc dùng HTTPS)
  headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload",
  );

  // Prevent common attack patterns
  const blockedPatterns = ["/wp-admin", "/wp-login", "/admin", ".php", ".env"];
  if (blockedPatterns.some((pattern) => url.includes(pattern))) {
    return NextResponse.rewrite(new URL("/not-found-trigger", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match tất cả request paths ngoại trừ:
     * 1. /api/auth/... (nếu dùng next-auth)
     * 2. /_next/static (static files)
     * 3. /_next/image (image optimization files)
     * 4. favicon.ico (favicon file)
     * 5. Các file ảnh trong public (.png, .jpg...)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
