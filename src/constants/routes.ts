export const Routes = {
	INDEX: "/",
	DECKS: "/decks",
	LESSONS: "/lessons",
	TEXTS: "/texts",
	SIGN_IN: "/sign-in",
	SIGN_OUT: "/sign-out",
	AUTH_CALLBACK: "/auth/callback",
	DECK: (deckId: string) => `/decks/${deckId}`,
	LESSON: (lessonId: string) => `/lessons/${lessonId}`,
	TEXT: (textId: string) => `/texts/${textId}`,
} as const;
