import { NextRequest, NextResponse } from "next/server";
import { updateTag } from "next/cache";

// PERF: Force Edge runtime for instant boot time and zero cold starts.
export const runtime = "edge";

// Time Complexity: O(1)
export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");
  const secret = request.headers.get("x-webhook-secret");

  // WHY: We must validate the secret token to prevent malicious actors from spamming the API and causing DDoS via constant cache purges.
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: "Unauthorized: Sai pass cấm vào" },
      { status: 401 },
    );
  }

  if (!tag) {
    return NextResponse.json(
      { message: "Bad Request: Thiếu tag" },
      { status: 400 },
    );
  }

  try {
    updateTag(tag);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    // BUG: Catch potential internal Next.js cache router errors.
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
