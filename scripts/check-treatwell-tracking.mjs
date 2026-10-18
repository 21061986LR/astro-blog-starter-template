import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const listener = readFileSync("src/components/TreatwellClickTracking.astro", "utf8");
const endpoint = readFileSync("src/pages/api/booking-click.ts", "utf8");
const mustContain = (source, phrase, message) => assert.ok(source.includes(phrase), message);
const mustExclude = (source, phrase, message) => assert.ok(!source.includes(phrase), message);

mustContain(listener, "widget.treatwell.co.uk", "Only Treatwell widget clicks are tracked");
mustContain(listener, "layla_analytics_opt_out", "Visitor opt-out must be honoured");
mustContain(listener, "navigator.sendBeacon", "Non-blocking click reporting is required");
mustContain(endpoint, "TREATWELL_ANALYTICS", "Analytics Engine binding is required");
mustContain(endpoint, 'new Set(["booking"])', "Only booking events are accepted");

for (const [name, source] of [["listener", listener], ["endpoint", endpoint]]) {
  for (const field of ["geolocation", "latitude", "longitude", "coordinates", "ipAddress", "userAgent", "emailAddress", "fingerprint"]) {
    mustExclude(source.toLowerCase(), field.toLowerCase(), name + " must not collect " + field);
  }
  mustExclude(source, '"/location/"', name + " must not track the location page");
  mustExclude(source, '"/our-location/"', name + " must not track the location page");
  mustExclude(source, '"reviews"', name + " must not count review links");
}
const preferences = readFileSync("src/components/TreatwellClickPreferences.astro", "utf8");
mustContain(preferences, "layla_analytics_opt_out", "Privacy toggle must control the same opt-out key");
mustContain(preferences, "aria-pressed", "Privacy toggle must expose accessible state");
for (const page of ["index", "treatments/caci-facials-fareham", "treatments/microneedling-fareham", "treatments/dermaplaning-fareham", "treatments/jet-plasma-fareham", "treatments/massage-fareham", "treatments/pregnancy-massage-fareham"]) {
  const source = readFileSync("src/pages/" + page + ".astro", "utf8");
  mustContain(source, "<TreatwellClickPreferences />", page + " must show opt-out");
  mustContain(source, "<TreatwellClickTracking />", page + " must count booking clicks");
}
console.log("Treatwell click tracking static guardrails passed.");
