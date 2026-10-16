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
  // On mobile, move the hero copy lower and lift Layla's face out of the veil.
  if (path === "/" && response.headers.get("content-type")?.includes("text/html")) {
    const html = await response.text();
    let fixedHtml = html.replace(
      "</head>",
      '<style id="fyb-hero-logo-fix">.hero img.logo{display:none!important}.hero-inner{justify-content:center!important}@media(max-width:860px){.hero-inner{padding-top:calc(3.25rem + 110px)!important;padding-bottom:calc(3.5rem + 110px)!important}.hero-inner>div{transform:translateY(110px)}.hero-photo{filter:brightness(1.12) saturate(1.04);object-position:50% 24%!important}.hero-veil{background:linear-gradient(to bottom,rgba(27,58,76,.62) 0%,rgba(27,58,76,.34) 18%,rgba(27,58,76,.18) 34%,rgba(27,58,76,.50) 50%,rgba(27,58,76,.84) 70%,rgba(27,58,76,.97) 100%)!important}}</style></head>'
    );

    // Add strong internal links to the newest locally targeted treatment pages.
    fixedHtml = fixedHtml.replace(
      /(<div[^>]*aria-label="Learn more about treatments"[^>]*>[\s\S]*?)(<\/div>)/,
      '$1<a class="btn btn-ghost" href="/treatments/dermaplaning-fareham/">Dermaplaning in Fareham →</a><a class="btn btn-ghost" href="/treatments/pregnancy-massage-fareham/">Pregnancy massage in Fareham →</a>$2'
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
