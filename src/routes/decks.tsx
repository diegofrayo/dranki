import { createFileRoute } from "@tanstack/react-router";

import api from "~/api";
import DecksPage from "~/features/pages/decks";

export const Route = createFileRoute("/decks")({
	loader: async () => {
		const decks = await api.decks.getDecks();

		return { decks };
	},
	component: function DecksPageWrapper() {
		const { decks } = Route.useLoaderData();

		return <DecksPage decks={decks} />;
	},
});
