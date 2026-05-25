import type { Lesson } from "./lessons";

export type Text = {
	id: string;
	title: string;
	emoji: string;
	lesson: Lesson | undefined;
	public: boolean;
	createdAt: string;
	practiceWords: Array<{ word: string; translation: string; example: string }>;
};

export type TextContent = { originalText: string; translation: string };
