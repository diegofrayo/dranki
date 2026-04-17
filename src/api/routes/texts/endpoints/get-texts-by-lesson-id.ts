import type { Text } from "../../../types";
import getTexts from "./get-texts";

async function getTextsByLessonId(lessonId: string): Promise<GetTextsByLessonIdResponse> {
	const texts = await getTexts();

	return texts.filter((text) => text.lesson?.id === lessonId);
}

export default getTextsByLessonId;

// --- TYPES ---

export type GetTextsByLessonIdResponse = Array<Text>;
