import type { Metadata } from "next";

import api, { type Text } from "~/api";

async function generateMetadata(textId: string): Promise<Metadata> {
	const textDetails = await api.texts.getTextById(textId);

	if (!textDetails) {
		return { title: "Text not found - dranki" };
	}

	return {
		title: `${textDetails.lesson.emoji} ${textDetails.title} - dranki`,
		description: textDetails.lesson.description,
	};
}

async function loader(
	textId: string,
): Promise<{ textDetails: Text | undefined; textContent: string }> {
	const textDetails = await api.texts.getTextById(textId);
	const textContent = await api.texts.getTextContent(textId);

	return { textDetails, textContent };
}

export default {
	generateMetadata,
	loader,
};
