import { notFound, redirect } from "next/navigation";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import api from "~/api";
import { Routes } from "~/constants";
import { getUser } from "~/features/auth/actions/get-user";
import TextPage from "~/features/pages/texts/pages/[text-id]";
import { loader } from "~/features/pages/texts/pages/[text-id]/[text-id].loader";
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

	const isPrivateText = !details.public;
	const isUserLoggedIn = !!(await getUser());
	const shouldProtectRoute = isPrivateText && !isUserLoggedIn;

	if (shouldProtectRoute) {
		return redirect(Routes.TEXTS);
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
	const textDetails = await api().texts.getTextById(textId);

	return generateMetadataTextPage(textDetails);
}

export async function generateStaticParams(): Promise<Array<{ "text-id": string }>> {
	const texts = await api().texts.getTexts();

	return texts.slice(0, 5).map((text) => ({
		"text-id": text.id,
	}));
}
