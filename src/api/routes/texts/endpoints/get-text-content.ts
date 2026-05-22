import type { TextContent } from "../../../types";
import DataLoader from "../../../utils/data-loader";

async function getTextContent(textId: string): Promise<GetTextContentResponse> {
	const content = await DataLoader.get<string>(`texts/${textId}.md`, {
		contentType: "md",
	});

	const [originalText, translation] = content.split("<!-- TRANSLATION SEPARATOR -->");

	return { originalText: originalText || "", translation: translation || "" };
}

export default getTextContent;

// --- TYPES ---

export type GetTextContentResponse = TextContent;
