import type { Lesson } from "./lessons";

export type Text = {
	id: string;
	title: string;
	emoji: string;
	lesson: Lesson | undefined;
};
