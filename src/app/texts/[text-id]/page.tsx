import { notFound } from "next/navigation";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import api from "~/api";
import TextPage, {
	generateMetadata as generateMetadataImplementation,
} from "~/features/pages/texts/pages/[text-id]";

type TextPageProps = {
	params: Promise<{ "text-id": string }>;
};

export default async function TextPageWrapper({
	params,
}: TextPageProps): Promise<ReactTypes.JSXElement> {
	const textId = (await params)["text-id"];
	const textDetails = await api.texts.getTextById(textId);
	const textContent = await api.texts.getTextContent(textId);

	if (!textDetails) {
		return notFound();
	}

	return (
		<TextPage
			textDetails={textDetails}
			content={textContent}
		/>
	);
}

export async function generateMetadata({
	params,
}: TextPageProps): ReturnType<typeof generateMetadataImplementation> {
	const textId = (await params)["text-id"];
	return generateMetadataImplementation(textId);
}
