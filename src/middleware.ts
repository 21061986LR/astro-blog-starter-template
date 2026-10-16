import { defineMiddleware } from "astro:middleware";

// Removed starter-template routes must never fall back to the homepage.
// Respond at the application boundary, including slash and nested variants.
export const onRequest = defineMiddleware(async ({ url }, next) => {
  const path = url.pathname.replace(/\/+$/, "") || "/";

  if (path === "/about" || path === "/blog" || path.startsWith("/blog/")) {
    return new Response("404 — Page not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex",
        "Cache-Control": "no-store",
      },
    });
  }

  const response = await next();

  // Homepage safety fix: hide the obsolete second hero wordmark that is
  // rendered over Layla's photo. The small circular corner logo remains.
  // On mobile, move the hero copy lower so Layla's face is less obscured.
  if (path === "/" && response.headers.get("content-type")?.includes("text/html")) {
    const html = await response.text();
    const fixedHtml = html.replace(
      "</head>",
      '<style id="fyb-hero-logo-fix">.hero img.logo{display:none!important}.hero-inner{justify-content:center!important}@media(max-width:860px){.hero-inner>div{transform:translateY(98px)}}</style></head>'
    );

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("etag");

    return new Response(fixedHtml, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
});
