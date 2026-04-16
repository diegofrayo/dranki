import api, { type Text } from "~/api";
import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

async function generateMetadata(textDetails: Text | undefined): Promise<Metadata> {
	if (!textDetails) {
		return { title: composePageTitle("Text not found") };
	}

	return {
		title: composePageTitle(`${textDetails.lesson?.emoji || ""} ${textDetails.title}`).trim(),
		description: textDetails.lesson?.description || "",
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
