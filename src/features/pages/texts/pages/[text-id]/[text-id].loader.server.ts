import api, { type Text } from "~/api";

export async function loader(
	textId: string,
): Promise<{ textDetails: Text | undefined; textContent: string }> {
	const textDetails = await api.texts.getTextById(textId);
	const textContent = await api.texts.getTextContent(textId);

	return { textDetails, textContent };
}
