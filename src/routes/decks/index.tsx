import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import DecksPage from "~/features/pages/decks";
import { decksLoader } from "~/features/router/tan-stack-loaders.server";
import { composePageTitle } from "~/utils/misc";

export const getData = createServerFn().handler(async () => {
	return { decks: await decksLoader() };
});

export const Route = createFileRoute("/decks/")({
	head: () => ({
		meta: [{ title: composePageTitle("Decks") }],
	}),
	loader: () => {
		return getData();
	},
	component: function DecksPageWrapper() {
		const { decks } = Route.useLoaderData();

		return <DecksPage decks={decks} />;
	},
});
