// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

const headerLogoPlugin = () => ({
 name: "fyb-header-logo",
 enforce: "pre",
 transform(code, id) {
  if (!id.endsWith(".astro")) return null;
  const from = 'src="/images/fyb-wordmark-1.png" alt="Forever Young Beauty logo"';
  const to = 'src="/images/fyb-header-logo.svg" alt="Forever Young Beauty logo"';
  let next = code.replaceAll(from, to);
  if (id.includes("/src/pages/treatments/") && next.includes("</style>")) {
   const sharedHeaderSizing = `
.corner-logo{width:70px!important;height:70px!important;padding:2px!important}
.menu summary{min-width:58px!important;min-height:58px!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:6px!important}
.hamburger{font-size:34px!important;line-height:1!important}
@media(max-width:560px){
.corner-logo{width:62px!important;height:62px!important;padding:2px!important}
.menu summary{min-width:60px!important;min-height:60px!important;padding:4px!important}
.hamburger{font-size:38px!important;line-height:1!important}
}`;
   next = next.replace("</style>", `${sharedHeaderSizing}</style>`);
  }
  return next === code ? null : next;
 },
});

export default defineConfig({
 site: "https://foreveryoungbeautybylayla.co.uk",
 integrations: [mdx(), sitemap()],
 vite: { plugins: [headerLogoPlugin()] },
 adapter: cloudflare({ platformProxy: { enabled: true } }),
});
