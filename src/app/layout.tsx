import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Nunito as CustomFont } from "next/font/google";
import Script from "next/script";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import { FAVICON_PATH, PROJECT_METADATA } from "~/constants";

import "./globals.css";

type RootLayoutProps = Readonly<{
	children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		body: cn("font-sans antialiased", customFont.variable),
	};

	return (
		<html lang="en">
			<body className={classes.body}>
				{children}

				{process.env.NODE_ENV === "production" ? (
					<Analytics />
				) : (
					<>
						<Script
							src="https://cdn.jsdelivr.net/npm/eruda"
							strategy="beforeInteractive"
							async={false}
							defer={false}
						/>
						<Script>window.eruda?.init();</Script>
					</>
				)}
			</body>
		</html>
	);
}

// --- FONTS ---

const customFont = CustomFont({
	subsets: ["latin"],
	weight: ["400", "600", "700", "800"],
	variable: "--font-nunito",
});

// --- METADATA ---

export const metadata: Metadata = {
	title: `${PROJECT_METADATA.appName} - ${PROJECT_METADATA.slogan}`,
	description: PROJECT_METADATA.description,
	generator: "v0.app",
	icons: {
		icon: [
			{
				url: `${FAVICON_PATH}/favicon-16x16.png`,
				sizes: "16x16",
				type: "image/png",
			},
			{
				url: `${FAVICON_PATH}/favicon-32x32.png`,
				sizes: "32x32",
				type: "image/png",
			},
			{
				url: `${FAVICON_PATH}/android-chrome-192x192.png`,
				sizes: "192x192",
				type: "image/png",
			},
			{
				url: `${FAVICON_PATH}/android-chrome-512x512.png`,
				sizes: "512x512",
				type: "image/png",
			},
		],
		apple: `${FAVICON_PATH}/apple-touch-icon.png`,
		shortcut: `${FAVICON_PATH}/favicon.ico`,
	},
	robots: {
		index: false,
		follow: false,
		nocache: true,
		googleBot: {
			index: false,
			follow: false,
		},
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: PROJECT_METADATA.themeColor,
};
