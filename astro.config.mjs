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

		// Keep treatment-page header controls visually identical in size to the homepage.
		if (id.includes("/src/pages/treatments/") && next.includes("</style>")) {
			const sharedHeaderSizing = `
.corner-logo{width:66px!important;height:66px!important;padding:2px!important}
.menu summary{font-size:27px;line-height:1;min-width:52px;min-height:52px;display:flex;align-items:center;justify-content:center;padding:8px}
.hamburger{font-size:27px!important;line-height:1}
@media(max-width:560px){
  .corner-logo{width:58px!important;height:58px!important;padding:2px!important}
  .menu summary{font-size:32px;min-width:56px;min-height:56px;padding:7px}
  .hamburger{font-size:32px!important}
}
`;
			next = next.replace("</style>", `${sharedHeaderSizing}</style>`);
		}

		return next === code ? null : next;
	},
});

export default defineConfig({
	site: "https://www.foreveryoungbeautybylayla.co.uk",
	integrations: [mdx(), sitemap()],
	vite: {
		plugins: [headerLogoPlugin()],
	},
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});
