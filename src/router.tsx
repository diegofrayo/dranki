import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export function getRouter(): unknown {
	const router = createRouter({
		routeTree,
		scrollRestoration: true,
	});

	return router;
}
