export const Routes = {
	INDEX: "/",
	DECKS: "/decks",
	LESSONS: "/lessons",
	TEXTS: "/texts",
	DECK: (deckId: string) => `/decks/${deckId}`,
	LESSON: (lessonId: string) => `/lessons/${lessonId}`,
	TEXT: (textId: string) => `/texts/${textId}`,
} as const;
