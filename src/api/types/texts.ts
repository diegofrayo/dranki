import type { Lesson } from "./lessons";

export type Text = {
	id: string;
	title: string;
	emoji: string;
	lesson: Lesson | undefined;
	practiceWords: Array<{ word: string; translation: string; example: string }>;
};
