import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import type { NonNullableObject } from "@diegofrayo-pkg/types";

import { loader } from "~/features/pages/decks/pages/[deck-id]/[deck-id].loader.server";
import { generateMetadataDeckPage } from "~/features/pages/decks/pages/[deck-id]/[deck-id].metadata";
import DeckPage from "~/features/pages/decks/pages/[deck-id]/[deck-id].page";

type LoaderData = NonNullableObject<Awaited<ReturnType<typeof loader>>>;

const getServerData = createServerFn()
	.inputValidator((data: { deckId: string }) => data)
	.handler((ctx) => {
		return loader(ctx.data.deckId);
	});

export const Route = createFileRoute("/decks/$deckId")({
	head: async (ctx) => ({
		meta: [await generateMetadataDeckPage((ctx.loaderData as unknown as LoaderData).deck)],
	}),
	loader: async ({ params }): Promise<LoaderData> => {
		const deckId = params["deckId"];
		const { deck } = await getServerData({ data: { deckId } });

		if (!deck) throw notFound();

		return { deck };
	},
	component: function DeckPageWrapper() {
		const { deck } = Route.useLoaderData() as LoaderData;

		return <DeckPage deck={deck} />;
	},
});
