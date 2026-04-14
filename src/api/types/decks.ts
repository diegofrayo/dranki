import type { Lesson } from "./lessons";

export type Deck = {
	id: string;
	title: string;
	description: string;
	emoji: string;
	lesson: Lesson | undefined;
	createdAt: string;
	theme: { backgroundColor: string; fontColor: string };
	totalPhrases: number;
};
