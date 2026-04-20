import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import type { NonNullableObject } from "@diegofrayo-pkg/types";

import DecksPage from "~/features/pages/decks";
import { loader } from "~/features/pages/decks/decks.loader.server";
import { composePageTitle } from "~/utils/misc";

type LoaderData = NonNullableObject<Awaited<ReturnType<typeof loader>>>;

export const getData = createServerFn().handler(async () => {
	return loader();
});

export const Route = createFileRoute("/decks/")({
	head: () => ({
		meta: [{ title: composePageTitle("Decks") }],
	}),
	loader: () => {
		return getData();
	},
	component: function DecksPageWrapper() {
		const { decks } = Route.useLoaderData() as LoaderData;

		return <DecksPage decks={decks} />;
	},
});
