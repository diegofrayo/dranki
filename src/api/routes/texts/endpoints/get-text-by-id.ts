import type { Text } from "../../../types";
import getTexts from "./get-texts";

async function getTextById(textId: string): Promise<GetTextByIdResponse> {
	const texts = await getTexts();
	const text = texts.find((item) => item.id === textId);

	return text;
}

export default getTextById;

// --- TYPES ---

export type GetTextByIdResponse = Text | undefined;
