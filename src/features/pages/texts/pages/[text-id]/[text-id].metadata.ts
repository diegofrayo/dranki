import type { Text } from "~/api/types";
import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

export function generateMetadataTextPage(textDetails: Text | undefined): Metadata {
	if (!textDetails) {
		return { title: composePageTitle("Text not found") };
	}

	return {
		title: composePageTitle(`${textDetails.lesson?.emoji || ""} ${textDetails.title}`).trim(),
		description: textDetails.lesson?.description || "",
	};
}
