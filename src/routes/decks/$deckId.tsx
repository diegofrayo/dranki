import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import DeckPage, { pageConfig } from "~/features/pages/decks/pages/[deck-id]";

const getServerData = createServerFn()
	.inputValidator((data: { deckId: string }) => data)
	.handler(async (ctx) => {
		const { deck } = await pageConfig.loader(ctx.data.deckId);

		return { deck };
	});

export const Route = createFileRoute("/decks/$deckId")({
	ssr: true,
	loader: async ({ params }) => {
		const deckId = params["deckId"];

		return getServerData({ data: { deckId } });
	},
	component: function DeckPageWrapper() {
		const { deck } = Route.useLoaderData();

		return <DeckPage deck={deck} />;
	},
});
