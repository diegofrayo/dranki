import type { Metadata } from "next";

import api, { type Text } from "~/api";
import { composePageTitle } from "~/utils/misc";

async function generateMetadata(textId: string): Promise<Metadata> {
	const textDetails = await api.texts.getTextById(textId);

	if (!textDetails) {
		return { title: composePageTitle("Text not found") };
	}

	return {
		title: composePageTitle(`${textDetails.lesson.emoji} ${textDetails.title}`),
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
