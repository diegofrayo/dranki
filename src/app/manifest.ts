import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "dranki - Learn English Phrases",
		short_name: "dranki",
		description: "A fun, mobile-first app to practice English phrases with swipeable flashcards",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#58CC02",
		orientation: "portrait",
		icons: [
			{
				src: "/favicon/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png",
			},
			{
				src: "/favicon/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png",
			},
			{
				src: "/favicon/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/favicon/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/favicon/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
	};
}
