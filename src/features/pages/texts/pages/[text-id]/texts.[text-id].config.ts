import type { Metadata } from "next";

import api from "~/api";

export async function generateMetadata(textId: string): Promise<Metadata> {
	const textDetails = await api.texts.getTextById(textId);

	if (!textDetails) {
		return { title: "Text not found - dranki" };
	}

	return {
		title: `${textDetails.lesson.emoji} ${textDetails.title} - dranki`,
		description: textDetails.lesson.description,
	};
}
