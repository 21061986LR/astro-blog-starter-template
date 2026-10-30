/* Treatwell outbound click tracking. Requires an existing, consent-compliant GA4 setup. */
(function () {
  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a[href]");
    if (!link) return;
    var url;
    try { url = new URL(link.href, location.href); } catch (_) { return; }
    if (!/(^|\\.)treatwell\\.co\\.uk$/.test(url.hostname)) return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "treatwell_click", {
      treatment_page: location.pathname,
      link_text: (link.textContent || "").trim().slice(0, 100),
      link_domain: url.hostname
    });
  }, true);
})();
