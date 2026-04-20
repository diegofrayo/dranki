import type { Lesson } from "./lessons";

export type DeckPhrase = {
	sentence: string;
	translation: string;
};

export type Deck = {
	id: string;
	title: string;
	description: string;
	emoji: string;
	lesson?: Lesson | undefined;
	theme: { backgroundColor: string; fontColor: string };
	phrases: DeckPhrase[];
	totalPhrases: number;
	createdAt: string;
};
