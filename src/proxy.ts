import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ipAddress } from "@vercel/functions";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(20, "10s"),
  analytics: true,
});

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl.pathname.toLowerCase();

  // Security Headers
  const headers = response.headers;
  headers.set("X-DNS-Prefetch-Control", "on");
  headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );
  headers.set("X-XSS-Protection", "1; mode=block");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );

  if (
    /\.(png|jpg|jpeg|gif|webp|svg|ico|css|js)$/.exec(url) ||
    url.startsWith("/_next") ||
    url.startsWith("/static")
  ) {
    return response;
  }

  // Enhanced Rate Limiting
  const ip = ipAddress(request) ?? "127.0.0.1";
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  headers.set("X-RateLimit-Limit", limit.toString());
  headers.set("X-RateLimit-Remaining", remaining.toString());
  headers.set("X-RateLimit-Reset", reset.toString());

  if (!success) {
    const isPageRequest = request.headers.get("accept")?.includes("text/html");

    if (isPageRequest) {
      return NextResponse.rewrite(new URL("/too-many-requests", request.url), {
        status: 429,
      });
    }

    return NextResponse.json(
      {
        error: "rate_limit_exceeded",
        message: "Bạn gửi yêu cầu quá dồn dập, hãy bình tĩnh!",
        retryAfter: 60,
      },
      {
        status: 429,
        headers: { "Retry-After": "60" },
      },
    );
  }

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
