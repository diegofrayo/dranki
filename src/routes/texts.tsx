import { createFileRoute } from "@tanstack/react-router";

import api from "~/api";
import TextsPage from "~/features/pages/texts";

export const Route = createFileRoute("/texts")({
	loader: async () => {
		const texts = await api.texts.getTexts();

		return { texts };
	},
	component: function TextsPageWrapper() {
		const { texts } = Route.useLoaderData();

		return <TextsPage texts={texts} />;
	},
});
