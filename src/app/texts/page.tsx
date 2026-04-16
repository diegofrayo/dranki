import type ReactTypes from "@diegofrayo-pkg/types/react";

import TextsPage from "~/features/pages/texts";
import { loader } from "~/features/pages/texts/texts.loader.server";
import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

export default async function TextsPageWrapper(): Promise<ReactTypes.JSXElement> {
	const { texts } = await loader();

	return <TextsPage texts={texts} />;
}

export async function generateMetadata(): Promise<Metadata> {
	return { title: composePageTitle("Texts") };
}
