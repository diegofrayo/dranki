import { notFound } from "next/navigation";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import TextPage, { pageConfig } from "~/features/pages/texts/pages/[text-id]";

type TextPageProps = {
	params: Promise<{ "text-id": string }>;
};

export default async function TextPageWrapper({
	params,
}: TextPageProps): Promise<ReactTypes.JSXElement> {
	const textId = (await params)["text-id"];
	const { textDetails, textContent } = await pageConfig.loader(textId);

	if (!textDetails || !textContent) {
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
}: TextPageProps): ReturnType<typeof pageConfig.generateMetadata> {
	const textId = (await params)["text-id"];
	return pageConfig.generateMetadata(textId);
}
