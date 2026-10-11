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
		if (!code.includes(from)) return null;
		return code.replaceAll(from, to);
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
