import path from "path";

import { readFile } from "@diegofrayo-pkg/utilities/server/files";

async function getTextContent(textId: string): Promise<GetTextContentResponse> {
	const filePath = path.resolve(process.cwd(), `src/data/texts/${textId}.md`);
	const content = readFile(filePath);

	return content;
}

export default getTextContent;

// --- TYPES ---

export type GetTextContentResponse = string;
