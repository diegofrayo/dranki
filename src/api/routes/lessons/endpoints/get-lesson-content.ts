import path from "path";

import { readFile } from "@diegofrayo-pkg/utilities/server/files";

async function getLessonContent(lessonId: string): Promise<GetLessonContentResponse> {
	const filePath = path.resolve(process.cwd(), `src/data/lessons/${lessonId}.md`);
	const content = readFile(filePath);

	return content;
}

export default getLessonContent;

// --- TYPES ---

export type GetLessonContentResponse = string;
