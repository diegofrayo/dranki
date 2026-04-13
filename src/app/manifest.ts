import type { MetadataRoute } from "next";

import { FAVICON_PATH, PROJECT_METADATA } from "~/constants";

export default function manifest(): MetadataRoute.Manifest {
	return {
		id: "/",
		name: `${PROJECT_METADATA.appName} - ${PROJECT_METADATA.slogan}`,
		short_name: PROJECT_METADATA.appName,
		description: PROJECT_METADATA.description,
		start_url: "/",
		display_override: ["standalone", "fullscreen", "minimal-ui"],
		display: "standalone",
		background_color: "#FFFFFF",
		theme_color: PROJECT_METADATA.backgroundColor,
		orientation: "portrait",
		icons: [
			{
				src: `${FAVICON_PATH}/favicon-16x16.png`,
				sizes: "16x16",
				type: "image/png",
			},
			{
				src: `${FAVICON_PATH}/favicon-32x32.png`,
				sizes: "32x32",
				type: "image/png",
			},
			{
				src: `${FAVICON_PATH}/android-chrome-192x192.png`,
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: `${FAVICON_PATH}/android-chrome-512x512.png`,
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
			{
				src: `${FAVICON_PATH}/android-chrome-512x512.png`,
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
		screenshots: [
			{
				src: "/screenshots/desktop.png",
				sizes: "1355x1144",
				type: "image/png",
				form_factor: "wide",
				label: "Application",
			},
			{
				src: "/screenshots/mobile.png",
				sizes: "410x784",
				type: "image/png",
				form_factor: "narrow",
				label: "Application",
			},
		],
	};
}
