import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import type { NonNullableObject } from "@diegofrayo-pkg/types";

import DeckPage from "~/features/pages/decks/pages/[deck-id]/decks.[deck-id].page";
import { deckLoader } from "~/features/router/tan-stack-loaders.server";

type LoaderData = NonNullableObject<Awaited<ReturnType<typeof deckLoader>>>;

const getServerData = createServerFn()
	.inputValidator((data: { deckId: string }) => data)
	.handler((ctx) => {
		return deckLoader(ctx.data.deckId);
	});

export const Route = createFileRoute("/decks/$deckId")({
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
