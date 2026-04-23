import path from "path";

import { readFile } from "@diegofrayo-pkg/utilities/server/files";

import type { TextContent } from "../../../types";

async function getTextContent(textId: string): Promise<GetTextContentResponse> {
	const filePath = path.resolve(process.cwd(), `src/data/texts/${textId}.md`);
	const content = readFile(filePath);

	const [originalText, translation] = content.split("<!-- TRANSLATION SEPARATOR -->");

	return { originalText: originalText || "", translation: translation || "" };
}

export default getTextContent;

// --- TYPES ---

export type GetTextContentResponse = TextContent;
