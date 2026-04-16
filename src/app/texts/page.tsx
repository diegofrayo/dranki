import type ReactTypes from "@diegofrayo-pkg/types/react";

import api from "~/api";
import TextsPage from "~/features/pages/texts";
import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

export default async function TextsPageWrapper(): Promise<ReactTypes.JSXElement> {
	const texts = await api.texts.getTexts();

	return <TextsPage texts={texts} />;
}

export async function generateMetadata(): Promise<Metadata> {
	return { title: composePageTitle("Texts") };
}
