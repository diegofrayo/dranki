import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import type { NonNullableObject } from "@diegofrayo-pkg/types";

import TextsPage from "~/features/pages/texts";
import { loader } from "~/features/pages/texts/texts.loader.server";
import { composePageTitle } from "~/utils/misc";

type LoaderData = NonNullableObject<Awaited<ReturnType<typeof loader>>>;

export const getData = createServerFn().handler(async () => {
	return loader();
});

export const Route = createFileRoute("/texts/")({
	head: () => ({
		meta: [{ title: composePageTitle("Texts") }],
	}),
	loader: async () => {
		return getData();
	},
	component: function TextsPageWrapper() {
		const { texts } = Route.useLoaderData() as LoaderData;

		return <TextsPage texts={texts} />;
	},
});
