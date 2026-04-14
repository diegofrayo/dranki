export const Routes = {
	INDEX: "/",
	DECKS: "/decks",
	DECK: (deckId: string) => `/decks/${deckId}`,
	LESSON: (lessonId: string) => `/lessons/${lessonId}`,
	TEXT: (textId: string) => `/texts/${textId}`,
} as const;
