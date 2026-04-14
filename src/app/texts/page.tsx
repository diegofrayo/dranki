import type ReactTypes from "@diegofrayo-pkg/types/react";

import api from "~/api";
import TextsPage from "~/features/pages/texts";

export default async function TextsPageWrapper(): Promise<ReactTypes.JSXElement> {
	const texts = await api.texts.getTexts();

	return <TextsPage texts={texts} />;
}
