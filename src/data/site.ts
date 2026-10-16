// Shared site data. Edit here and every page picks it up.

export const SITE_URL = "https://foreveryoungbeautybylayla.co.uk";
export const BOOKING_URL = "https://laylaradestock.mytreatwell.co.uk/";
export const PHONE = "+447799890398";
export const PHONE_DISPLAY = "07799 890398";

// Google Business Profile place ID for Forever Young Beauty By Layla.
export const GOOGLE_PLACE_ID = "ChIJv57sYEpvdEgR78z1GvYSv7Y";
// Coordinates of Layla's own Google Maps pin (not the club's).
export const GEO = { lat: 50.8485564, lng: -1.2684209 };

export const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Forever+Young+Beauty+By+Layla%2C+Abshot+Country+Club%2C+Fareham+PO14+4LN&destination_place_id=" +
  GOOGLE_PLACE_ID;
export const WRITE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=" + GOOGLE_PLACE_ID;

// Main menu, used on every page.
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/treatments/caci-facials-fareham/", label: "CACI Facials" },
  { href: "/treatments/dermaplaning-fareham/", label: "Dermaplaning" },
  { href: "/treatments/microneedling-fareham/", label: "Microneedling" },
  { href: "/treatments/jet-plasma-fareham/", label: "Jet Plasma" },
  { href: "/treatments/massage-fareham/", label: "Massage" },
  { href: "/treatments/pregnancy-massage-fareham/", label: "Pregnancy Massage" },
  { href: "/our-location/", label: "Our Location" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#find-us", label: "Find us" },
];

// The treatment pages, for "Explore more treatments" links.
export const TREATMENT_PAGES = [
  { href: "/treatments/caci-facials-fareham/", label: "CACI Facials in Fareham" },
  { href: "/treatments/dermaplaning-fareham/", label: "Dermaplaning in Fareham" },
  { href: "/treatments/microneedling-fareham/", label: "Microneedling in Fareham" },
  { href: "/treatments/jet-plasma-fareham/", label: "Jet Plasma in Fareham" },
  { href: "/treatments/massage-fareham/", label: "Massage in Fareham" },
  { href: "/treatments/pregnancy-massage-fareham/", label: "Pregnancy Massage in Fareham" },
];

// Links the Service schema on each treatment page to the business on the homepage.
export const PROVIDER = {
  "@type": "BeautySalon",
  "@id": `${SITE_URL}/#salon`,
  name: "Forever Young Beauty by Layla",
  url: SITE_URL,
};
