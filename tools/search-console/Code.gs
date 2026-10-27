/**
 * Forever Young Beauty by Layla - FREE Google Search Console monthly export.
 * Run setup() ONCE as the Google account that can read this GSC property.
 * No payment, API key, webhook, password or service account required.
 * The spreadsheet belongs to the account that executes setup().
 */
const FYB = Object.freeze({
  domain: "foreveryoungbeautybylayla.co.uk",
  tz: "Europe/London",
  spreadsheetName: "Layla - Search Console Monthly SEO",
  dimensions: ["query", "page", "device", "country", "date"]
});
const HEADERS = Object.freeze({
  Overview: ["Period", "Start", "End", "Clicks", "Impressions", "CTR", "Average position", "Retrieved (UTC)"],
  Queries: ["Period", "Query", "Category", "Clicks", "Impressions", "CTR", "Average position"],
  Pages: ["Period", "Landing page", "Clicks", "Impressions", "CTR", "Average position"],
  Devices: ["Period", "Device", "Clicks", "Impressions", "CTR", "Average position"],
  Countries: ["Period", "Country code", "Clicks", "Impressions", "CTR", "Average position"],
  Daily: ["Period", "Date", "Clicks", "Impressions", "CTR", "Average position"]
});

function setup() {
  const props = PropertiesService.getScriptProperties();
  const property = locateProperty_();
  props.setProperty("PROPERTY", property);

  let id = props.getProperty("SHEET_ID");
  if (!id) {
    const spreadsheet = SpreadsheetApp.create(FYB.spreadsheetName);
    id = spreadsheet.getId();
    props.setProperty("SHEET_ID", id);
  }
  const spreadsheet = SpreadsheetApp.openById(id);
  Object.keys(HEADERS).forEach(function (name) { getSheet_(spreadsheet, name); });

  ScriptApp.getProjectTriggers().filter(function (trigger) {
    return trigger.getHandlerFunction() === "runMonthlyReport";
  }).forEach(function (trigger) { ScriptApp.deleteTrigger(trigger); });
  ScriptApp.newTrigger("runMonthlyReport")
    .timeBased().onMonthDay(5).atHour(9).inTimezone(FYB.tz).create();

  runMonthlyReport();
  Logger.log("Monthly report installed, property: " + property);
  Logger.log("Open your spreadsheet: " + spreadsheet.getUrl());
  return spreadsheet.getUrl();
}

function runMonthlyReport() {
  // On the fifth of each month, capture the ENTIRE preceding calendar month.
  const parts = Utilities.formatDate(new Date(), FYB.tz, "yyyy-MM").split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const start = new Date(Date.UTC(year, month - 2, 1));
  const end = new Date(Date.UTC(year, month - 1, 0));
  return runPeriod_(date_(start), date_(end), date_(start).slice(0, 7));
}

// Optional: imports the baseline period used in the October 2026 SEO review.
// Do not use this as a recurring job; the regular monthly reports are comparable.
function importOctoberBaseline() {
  return runPeriod_("2026-07-09", "2026-10-08", "Baseline Jul 9-Oct 8 2026");
}

function runPeriod_(startDate, endDate, period) {
  const props = PropertiesService.getScriptProperties();
  const site = props.getProperty("PROPERTY");
  const id = props.getProperty("SHEET_ID");
  if (!site || !id) throw new Error("Run setup() first.");

  const total = analytics_(site, startDate, endDate, [], 1)[0] || {};
  const spreadsheet = SpreadsheetApp.openById(id);
  const fetched = Utilities.formatDate(new Date(), "UTC", "yyyy-MM-dd HH:mm:ss");
  overwritePeriod_(getSheet_(spreadsheet, "Overview"), period, [[
    period, startDate, endDate,
    number_(total.clicks), number_(total.impressions),
    number_(total.ctr), number_(total.position), fetched
  ]]);

  FYB.dimensions.forEach(function (dimension) {
    const tab = dimension === "query" ? "Queries"
      : dimension === "page" ? "Pages"
      : dimension === "device" ? "Devices"
      : dimension === "country" ? "Countries" : "Daily";
    const rows = analytics_(site, startDate, endDate, [dimension], 1000).map(function (r) {
      const key = safeText_((r.keys || [])[0] || "");
      const metrics = [number_(r.clicks), number_(r.impressions),
        number_(r.ctr), number_(r.position)];
      if (dimension === "query") {
        const category = /layla|forever.young|fyb|beauty.at.abshot/i.test(key)
          ? "Likely branded" : "Other visible query";
        return [period, key, category].concat(metrics);
      }
      return [period, key].concat(metrics);
    });
    overwritePeriod_(getSheet_(spreadsheet, tab), period, rows);
  });

  Logger.log("Updated " + period + " in " + spreadsheet.getUrl());
  return spreadsheet.getUrl();
}

function locateProperty_() {
  const result = request_("GET", "https://www.googleapis.com/webmasters/v3/sites");
  const entries = (result.siteEntry || []).filter(function (e) {
    return e.permissionLevel && e.permissionLevel !== "siteUnverifiedUser";
  });
  const domain = "sc-domain:" + FYB.domain;
  const candidates = [domain,
    "https://" + FYB.domain + "/",
    "https://www." + FYB.domain + "/"];
  const item = candidates.map(function (name) {
    return entries.find(function (entry) { return entry.siteUrl === name; });
  }).find(Boolean);
  if (!item) {
    throw new Error("The signed-in Google account cannot read Layla's Search Console property. Open Search Console in this Google account and check its permissions.");
  }
  return item.siteUrl;
}

function analytics_(site, startDate, endDate, dimensions, limit) {
  const body = {
    startDate: startDate, endDate: endDate, dimensions: dimensions,
    type: "web", dataState: "final", rowLimit: limit
  };
  const url = "https://www.googleapis.com/webmasters/v3/sites/"
    + encodeURIComponent(site) + "/searchAnalytics/query";
  return request_("POST", url, body).rows || [];
}

function request_(method, url, body) {
  const opts = {
    method: method,
    muteHttpExceptions: true,
    headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() }
  };
  if (body) {
    opts.contentType = "application/json";
    opts.payload = JSON.stringify(body);
  }
  const res = UrlFetchApp.fetch(url, opts);
  const status = res.getResponseCode();
  if (status < 200 || status >= 300) {
    throw new Error("Google Search Console API returned HTTP " + status +
      ": " + res.getContentText().slice(0, 600));
  }
  const bodyText = res.getContentText();
  return bodyText ? JSON.parse(bodyText) : {};
}

function getSheet_(spreadsheet, name) {
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) sheet = spreadsheet.insertSheet(name);
  const headers = HEADERS[name];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground("#1b3a4c").setFontColor("#ffffff").setFontWeight("bold");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  return sheet;
}

function overwritePeriod_(sheet, period, incoming) {
  const lastRow = sheet.getLastRow();
  const width = HEADERS[sheet.getName()].length;
  const prior = lastRow > 1
    ? sheet.getRange(2, 1, lastRow - 1, width).getValues() : [];
  const rows = prior.filter(function (r) { return r[0] !== period; }).concat(incoming);
  if (lastRow > 1) sheet.getRange(2, 1, lastRow - 1, width).clearContent();
  if (rows.length > 0) sheet.getRange(2, 1, rows.length, width).setValues(rows);
  const ctrColumn = sheet.getName() === "Overview" ? 6
    : sheet.getName() === "Queries" ? 6 : 5;
  if (rows.length > 0) {
    sheet.getRange(2, ctrColumn, rows.length, 1).setNumberFormat("0.00%");
    sheet.getRange(2, ctrColumn + 1, rows.length, 1).setNumberFormat("0.0");
  }
  sheet.autoResizeColumns(1, width);
}

function safeText_(input) {
  // Avoid interpreting arbitrary search queries as formulas in Google Sheets.
  return /^[=+\-@]/.test(String(input)) ? "'" + String(input) : String(input);
}
function number_(value) { return Number.isFinite(value) ? value : 0; }
function date_(d) { return Utilities.formatDate(d, "UTC", "yyyy-MM-dd"); }
