import { notFound } from "next/navigation";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import api from "~/api";
import TextPage from "~/features/pages/texts/pages/[text-id]";
import { loader } from "~/features/pages/texts/pages/[text-id]/[text-id].loader.server";
import { generateMetadataTextPage } from "~/features/pages/texts/pages/[text-id]/[text-id].metadata";

type TextPageProps = {
	params: Promise<{ "text-id": string }>;
};

export default async function TextPageWrapper({
	params,
}: TextPageProps): Promise<ReactTypes.JSXElement> {
	const textId = (await params)["text-id"];
	const { details, content } = await loader(textId);

	if (!details || !content) {
		return notFound();
	}

	return (
		<TextPage
			details={details}
			content={content}
		/>
	);
}

export async function generateMetadata({
	params,
}: TextPageProps): ReturnType<typeof generateMetadataTextPage> {
	const textId = (await params)["text-id"];
	const textDetails = await api.texts.getTextById(textId);

	return generateMetadataTextPage(textDetails);
}
