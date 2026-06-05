import api from "~/api";

import type { TextPageProps } from "./[text-id].types";

export async function loader(
	textId: string,
): Promise<{ details: TextPageProps["details"] | undefined } & Pick<TextPageProps, "content">> {
	const details = await api.texts.getTextById(textId);
	const content = await api.texts.getTextContent(textId);

	return { details, content };
}
