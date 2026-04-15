import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import { PROJECT_METADATA } from "~/constants";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: PROJECT_METADATA.appName },
		],
		links: [{ rel: "stylesheet", href: "/src/routes/app.css" }],
	}),
	component: RootComponent,
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
			</body>
		</html>
	);
}
