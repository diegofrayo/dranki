import type { Text } from "~/api";

export type TextLessonPageProps = {
	// params: Promise<{ "lesson-id": string }>;
	textDetails: Text;
	content: string;
};
