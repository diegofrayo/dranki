import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";

import type { NonNullableObject } from "@diegofrayo-pkg/types";

import { Routes } from "~/constants";
import { getUser } from "~/features/auth/actions/get-user";
import { loader } from "~/features/pages/decks/pages/[deck-id]/[deck-id].loader";
import { generateMetadataDeckPage } from "~/features/pages/decks/pages/[deck-id]/[deck-id].metadata";
import DeckPage from "~/features/pages/decks/pages/[deck-id]/[deck-id].page";

type LoaderData = NonNullableObject<Awaited<ReturnType<typeof loader>>>;

const getServerData = createServerFn()
	.inputValidator((data: { deckId: string }) => data)
	.handler((ctx) => {
		return loader(ctx.data.deckId);
	});

const getUserOnlyServer = createServerOnlyFn(getUser);

export const Route = createFileRoute("/decks/$deckId")({
	head: async (ctx) => ({
		meta: [await generateMetadataDeckPage((ctx.loaderData as unknown as LoaderData).deck)],
	}),
	loader: async ({ params }): Promise<LoaderData> => {
		const deckId = params["deckId"];
		const { deck } = await getServerData({ data: { deckId } });

		if (!deck) throw notFound();

		const isPrivateText = !deck.public;
		const isUserLoggedIn = !!(await getUserOnlyServer());
		const shouldProtectRoute = isPrivateText && !isUserLoggedIn;

		if (shouldProtectRoute) {
			throw redirect({ to: Routes.DECKS, replace: true });
		}

		return { deck };
	},
	component: function DeckPageWrapper() {
		const { deck } = Route.useLoaderData() as LoaderData;

		return <DeckPage deck={deck} />;
	},
});
