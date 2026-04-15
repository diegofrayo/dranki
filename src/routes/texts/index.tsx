import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import TextsPage from "~/features/pages/texts";
import { textsLoader } from "~/features/router/tan-stack-loaders.server";

export const getData = createServerFn().handler(async () => {
	return { texts: await textsLoader() };
});

export const Route = createFileRoute("/texts/")({
	loader: async () => {
		return getData();
	},
	component: function TextsPageWrapper() {
		const { texts } = Route.useLoaderData();

		return <TextsPage texts={texts} />;
	},
});
