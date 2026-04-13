export const Routes = {
	INDEX: "/",
	DECKS: "/decks",
	DECK: (deckId: string) => `/decks/${deckId}`,
} as const;
