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

  if (response.headers.get("content-type")?.includes("text/html")) {
    let fixedHtml = await response.text();

    // Review buttons should open existing review lists, not maps or review composers.
    // Google: open Layla's existing Google reviews for this Place ID.
    const googleReviewsUrl =
      "https://search.google.com/local/reviews?placeid=ChIJv57sYEpvdEgR78z1GvYSv7Y";

    fixedHtml = fixedHtml.replaceAll(
      'href="https://www.google.com/maps/place/?q=place_id%3AChIJv57sYEpvdEgR78z1GvYSv7Y"',
      `href="${googleReviewsUrl}"`
    );
    fixedHtml = fixedHtml.replaceAll(
      'href="https://www.google.com/maps/search/?api=1&amp;query=Forever+Young+Beauty+By+Layla+Fareham&amp;query_place_id=ChIJv57sYEpvdEgR78z1GvYSv7Y"',
      `href="${googleReviewsUrl}"`
    );
    fixedHtml = fixedHtml.replaceAll(
      'href="https://search.google.com/local/writereview?placeid=ChIJv57sYEpvdEgR78z1GvYSv7Y"',
      `href="${googleReviewsUrl}"`
    );

    // Treatwell: go straight to Layla's working reviews page.
    fixedHtml = fixedHtml.replaceAll(
      'href="https://www.treatwell.co.uk/place/forever-young-beauty-by-layla/"',
      'href="https://laylaradestock.mytreatwell.co.uk/reviews.html"'
    );

    if (path === "/") {
      // Homepage safety fix: hide the obsolete second hero wordmark that is
      // rendered over Layla's photo. The small circular corner logo remains.
      // On mobile, move the hero copy lower and lift Layla's face out of the veil.
      // Social buttons use recognisable Instagram and Facebook brand colours.
      fixedHtml = fixedHtml.replace(
        "</head>",
        '<style id="fyb-hero-logo-fix">.hero img.logo{display:none!important}.hero-inner{justify-content:center!important}.social-brand-btn{display:inline-flex!important;align-items:center;justify-content:center;gap:.58rem}.social-brand-btn svg{width:1.18rem;height:1.18rem;flex:0 0 auto}.btn-row a[href*="instagram.com/foreveryoungbeauty_bylayla"]{background:linear-gradient(135deg,#833ab4 0%,#c13584 30%,#e1306c 55%,#f77737 78%,#fcaf45 100%)!important;border-color:transparent!important;color:#fff!important;box-shadow:0 4px 14px rgba(193,53,132,.18)}.btn-row a[href*="facebook.com/foreveryoungbeautybylayla"]{background:#1877f2!important;border-color:#1877f2!important;color:#fff!important;box-shadow:0 4px 14px rgba(24,119,242,.18)}.btn-row a[href*="instagram.com/foreveryoungbeauty_bylayla"]:hover,.btn-row a[href*="instagram.com/foreveryoungbeauty_bylayla"]:focus-visible,.btn-row a[href*="facebook.com/foreveryoungbeautybylayla"]:hover,.btn-row a[href*="facebook.com/foreveryoungbeautybylayla"]:focus-visible{filter:brightness(.94)}.treatment-page-links>a{display:inline-block!important;padding:.8rem 1.6rem!important;border-radius:999px!important;text-decoration:none!important;font-weight:700!important;border:1.5px solid var(--navy)!important;color:var(--navy)!important;background:transparent!important;line-height:1.25}.treatment-page-links>a:hover,.treatment-page-links>a:focus-visible{background:var(--navy)!important;color:#fff!important}@media(max-width:860px){.hero-inner{padding-top:calc(3.25rem + 110px)!important;padding-bottom:calc(3.5rem + 110px)!important}.hero-inner>div{transform:translateY(110px)}.hero-photo{filter:brightness(1.12) saturate(1.04);object-position:50% 24%!important}.hero-veil{background:linear-gradient(to bottom,rgba(27,58,76,.62) 0%,rgba(27,58,76,.34) 18%,rgba(27,58,76,.18) 34%,rgba(27,58,76,.50) 50%,rgba(27,58,76,.84) 70%,rgba(27,58,76,.97) 100%)!important}}</style></head>'
      );

      fixedHtml = fixedHtml.replace(
        />Follow on Instagram<\/a>/,
        '><span class="social-brand-btn"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.25" fill="currentColor"/></svg><span>Instagram</span></span></a>'
      );
      fixedHtml = fixedHtml.replace(
        />Find us on Facebook<\/a>/,
        '><span class="social-brand-btn"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M13.2 20v-6.7h2.3l.35-2.7H13.2V8.9c0-.78.22-1.31 1.34-1.31h1.43V5.17c-.25-.03-1.1-.1-2.1-.1-2.08 0-3.5 1.27-3.5 3.61v1.92H8v2.7h2.37V20h2.83Z" fill="currentColor"/></svg><span>Facebook</span></span></a>'
      );

      // Add strong internal links to the newest locally targeted treatment pages.
      fixedHtml = fixedHtml.replace(
        /(<div[^>]*aria-label="Learn more about treatments"[^>]*>)([\s\S]*?)(<\/div>)/,
        (_match, open, content, close) => {
          const scope = content.match(/(data-astro-cid-[a-z0-9]+="")/)?.[1] ?? "";
          const scoped = scope ? ` ${scope}` : "";
          return `${open}${content}<a class="btn btn-ghost"${scoped} href="/treatments/dermaplaning-fareham/">Dermaplaning in Fareham →</a><a class="btn btn-ghost"${scoped} href="/treatments/pregnancy-massage-fareham/">Pregnancy massage in Fareham →</a>${close}`;
        }
      );
    }

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
