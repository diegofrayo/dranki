import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import { RemoteDebugger } from "~/components/common";
import { FAVICON_PATH, PROJECT_METADATA } from "~/constants";
import NotFoundPage from "~/features/pages/not-found";

// @ts-expect-error - This file is only used in the Vite build, so these imports are safe.
import appCss from "./app.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
			},
			{ title: `${PROJECT_METADATA.appName} - ${PROJECT_METADATA.slogan}` },
			{ name: "description", content: PROJECT_METADATA.description },
			{ name: "theme-color", content: PROJECT_METADATA.themeColor },
			{ name: "robots", content: "noindex, nofollow, nocache" },
			{ name: "googlebot", content: "noindex, nofollow" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: `${FAVICON_PATH}/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
			{ rel: "icon", href: `${FAVICON_PATH}/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
			{
				rel: "icon",
				href: `${FAVICON_PATH}/android-chrome-192x192.png`,
				sizes: "192x192",
				type: "image/png",
			},
			{
				rel: "icon",
				href: `${FAVICON_PATH}/android-chrome-512x512.png`,
				sizes: "512x512",
				type: "image/png",
			},
			{ rel: "apple-touch-icon", href: `${FAVICON_PATH}/apple-touch-icon.png` },
			{ rel: "shortcut icon", href: `${FAVICON_PATH}/favicon.ico` },
		],
	}),
	component: RootComponent,
	notFoundComponent: NotFoundPage,
});

function RootComponent(): ReactTypes.JSXElement {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({
	children,
}: Readonly<{ children: ReactTypes.Children }>): ReactTypes.JSXElement {
	return (
		<html>
			<head>
				<HeadContent />
			</head>
			<body className="font-sans">
				{children}
				<Scripts />
				<RemoteDebugger />
			</body>
		</html>
	);
}
