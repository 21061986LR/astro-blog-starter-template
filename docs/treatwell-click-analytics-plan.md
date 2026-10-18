# Treatwell click tracking — implementation specification (not deployed)

## Goal
Measure aggregate outbound clicks to Treatwell, broken down by source page and link category, without visitor identifiers, analytics cookies, or interruption to booking.

## Proposed Cloudflare binding
- Variable: `TREATWELL_ANALYTICS`
- Dataset: `layla_booking_clicks`
- Binding is **not saved** in Cloudflare; do not deploy before approval.

## Event collection
- Add a small same-origin endpoint at `/api/booking-click` using an Astro server endpoint compatible with the existing Cloudflare adapter.
- Only accept POST with a short JSON payload and a fixed allowlist of page IDs and link categories. Reject arbitrary URL strings, free-text, or personal data.
- Check same-origin Origin where available; use content-type, request size, and simple rate limiting/abuse controls. Do not claim these make events fraud-proof.
- Call the Analytics Engine binding's `writeDataPoint` with approved categorical blobs and a count of 1. Never include IP address, user agent, full referrer, cookie, unique ID, or timestamp beyond server-side aggregate date.
- Return 204 on successful acceptance; fail closed without exposing internals. Consider how to detect missing bindings without failing the site.

## Client behavior
- A small delegated listener observes clicks on links whose destination host is explicitly approved as a Treatwell booking or review destination.
- Determine source page from an allowlist of route paths; classify link type by URL and stable button context. Do not record the clicked URL or any query strings.
- Use `navigator.sendBeacon` when available with a safe fallback `fetch(..., {keepalive:true})`; never preventDefault, await, redirect, or modify href/target.
- Respect a persistent opt-out preference stored locally **only when the visitor chooses it**, and ensure the tracking code does not send events when opted out.
- The privacy preference UI must be keyboard accessible and available on every page. Include accurate privacy notice and an uncomplicated opt-out route.
- Verify UK PECR/ICO statistical-purpose exception conditions and Cloudflare's processing/transfer terms before activation; cookieless does not automatically mean exempt.

## Deployment safety
- The production branch is `main` and automatically deploys. Keep all code on `feature/treatwell-click-analytics` until explicitly authorised.
- Confirm whether Cloudflare is using Pages Functions or Workers and whether the Analytics Engine binding works with the deployed Astro adapter.
- Verify existing deployment configuration, preview behavior and binding availability before adding server code.
- Add the binding in Cloudflare only when code and rollback plan are ready; a binding takes effect on the next deployment.

## Tests required
1. All homepage and six treatment-page booking links still open Treatwell on mobile and desktop.
2. Link-click events are counted exactly once in ordinary interaction; keyboard clicks supported.
3. Treatwell review links are classified separately from booking links.
4. No analytics requests after opt-out, and no nonessential storage before choice.
5. Missing binding, blocked network, JS disabled and offline cases do not break navigation.
6. Requests with arbitrary page names or free-text are rejected.
7. Report totals can be queried privately without publishing Cloudflare credentials.
8. Retention and opt-out wording verified against applicable guidance.

## Reporting
Daily counts by approved page ID and event category, plus weekly/monthly totals. These are click counts, not unique visitors or confirmed Treatwell bookings. Longer-term aggregate summaries require a separate storage/retention decision.

## Status
Design draft only. No endpoint, click listener, binding, or production deployment implemented.
