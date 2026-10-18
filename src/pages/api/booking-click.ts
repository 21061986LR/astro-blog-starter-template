import type { APIRoute } from "astro";

export const prerender = false;

const PAGES = new Set([
  "/", "/treatments/caci-facials-fareham/",
  "/treatments/microneedling-fareham/",
  "/treatments/dermaplaning-fareham/",
  "/treatments/jet-plasma-fareham/",
  "/treatments/massage-fareham/",
  "/treatments/pregnancy-massage-fareham/"
]);
const CATEGORIES = new Set(["booking"]);

type AnalyticsBinding = {
  writeDataPoint: (data: { blobs: string[]; doubles: number[] }) => void;
};

export const POST: APIRoute = async ({ request, locals }) => {
  const origin = request.headers.get("origin");
  const requestOrigin = new URL(request.url).origin;
  if (!origin || origin !== requestOrigin) return new Response(null, { status: 403 });
  if (!(request.headers.get("content-type") || "").startsWith("application/json"))
    return new Response(null, { status: 415 });
  if (Number(request.headers.get("content-length") || 0) > 256)
    return new Response(null, { status: 413 });

  let payload: unknown;
  try { payload = await request.json(); } catch { return new Response(null, { status: 400 }); }
  if (!payload || typeof payload !== "object" || Array.isArray(payload))
    return new Response(null, { status: 400 });
  const { page, category } = payload as Record<string, unknown>;
  if (typeof page !== "string" || typeof category !== "string" ||
      !PAGES.has(page) || !CATEGORIES.has(category))
    return new Response(null, { status: 400 });

  const env = (locals as unknown as { runtime?: { env?: Record<string, unknown> } }).runtime?.env;
  const analytics = env?.TREATWELL_ANALYTICS as AnalyticsBinding | undefined;
  if (!analytics?.writeDataPoint) return new Response(null, { status: 503 });
  try {
    analytics.writeDataPoint({ blobs: [page, category], doubles: [1] });
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 503 });
  }
};
