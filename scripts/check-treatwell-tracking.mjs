import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const listener = readFileSync("src/components/TreatwellClickTracking.astro", "utf8");
const endpoint = readFileSync("src/pages/api/booking-click.ts", "utf8");

assert.match(listener, /widget\\.treatwell\\.co\\.uk/, "Only the booking widget is tracked");
assert.match(listener, /layla_analytics_opt_out/, "Tracking must honour visitor opt-out");
assert.match(listener, /navigator\\.sendBeacon/, "Click reporting must not delay booking navigation");
assert.match(endpoint, /TREATWELL_ANALYTICS/, "Analytics Engine binding must be used");
assert.match(endpoint, /new Set\\(\\["booking"\\]\\)/, "Only booking events are accepted");

for (const [name, source] of [["listener", listener], ["endpoint", endpoint]]) {
  assert.doesNotMatch(source, /geolocation|latitude|longitude|coordinates|ipAddress|userAgent|emailAddress|fingerprint/i, name + " must not collect personal or location data");
  assert.doesNotMatch(source, /"\\/location\\/"|"\\/our-location\\/"/, name + " must not track location page");
  assert.doesNotMatch(source, /"reviews"/, name + " must not count review links");
}
console.log("Treatwell click tracking static guardrails passed.");
