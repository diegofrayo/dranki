import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import DeckPage from "~/features/pages/decks/pages/[deck-id]/decks.[deck-id].page";
import { deckLoader } from "~/features/router/tan-stack-loaders.server";

const getServerData = createServerFn()
	.inputValidator((data: { deckId: string }) => data)
	.handler((ctx) => {
		return deckLoader(ctx.data.deckId);
	});

export const Route = createFileRoute("/decks/$deckId")({
	loader: ({ params }) => {
		const deckId = params["deckId"];

		return getServerData({ data: { deckId } });
	},
	component: function DeckPageWrapper() {
		const { deck } = Route.useLoaderData();

		return <DeckPage deck={deck} />;
	},
});
