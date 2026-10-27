# Forever Young Beauty by Layla – FREE Search Console reporting

This folder contains a **Google Apps Script fallback** if the Windsor.ai connection is unavailable. It is NOT installed or scheduled yet. It uses Google's free Search Console API, runs as your Google account, and saves results only into a Google Sheet owned by you. No paid GSC Wizard subscription, password, API key or webhook.

## Initial setup (once)

1. Open https://script.google.com and select **New project** while signed in to the Google account that already has access to Layla's verified Search Console property.
2. Replace the default `Code.gs` with the complete contents of this folder's `Code.gs`.
3. Under **Project Settings**, enable **Show appsscript.json manifest file in editor**. Replace that manifest with `appsscript.json` from this folder.
4. Save. In the function picker choose `setup`, then **Run**. Review and approve the Google permission prompts. If a permission or API-disabled error occurs, the project may need its Search Console API enabled through its associated Google Cloud project.
5. Open **Execution log** for the Google Sheet URL. This initial setup creates a Google spreadsheet and imports the **previous full calendar month**, then creates one monthly trigger for the **5th** of each month, around **9 am Europe/London**.
6. Optional: run `importOctoberBaseline` once to import the earlier **9 July – 8 October 2026** rolling-period baseline as a *separate* entry.

The sheet has tabs for Overview, Queries, Pages, Devices, Countries and Daily. Reports replace the same period when rerun, rather than appending duplicates. Google Search Console may suppress some individual query rows for privacy, so **query totals are not necessarily equal to property totals**. Use the Overview sheet for complete clicks/impressions/CTR figures; query and page tabs show representative rows.

## Scope and safety

- This script uses a **read-only** Search Console OAuth scope. It cannot change Search Console property settings, submit sitemaps or request indexing.
- All reporting data remains within your Google account; you can share the Sheet with your already-connected ChatGPT Google Drive if desired.
- Search Console may take several days to finalise recent dates. Running on the fifth gives a small buffer.
- Only connect Google accounts you control or have authorisation to access. Do not publish OAuth tokens or private spreadsheet contents in the GitHub repository.
- It does not perform searches or manufacture clicks. It measures real search performance.

Official references:
- https://developers.google.com/webmaster-tools/pricing
- https://developers.google.com/webmaster-tools/v1/searchanalytics/query
- https://developers.google.com/apps-script/reference/script/script-app
- https://developers.google.com/apps-script/reference/script/clock-trigger-builder
