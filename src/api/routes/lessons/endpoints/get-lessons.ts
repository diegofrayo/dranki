import path from "path";
import { z } from "zod";

import { readFile } from "@diegofrayo-pkg/utilities/server/files";

import type { Lesson } from "../../../types";

async function getLessons(): Promise<GetLessonsResponse> {
	const filePath = path.resolve(process.cwd(), "src/data/lessons.json");
	const rawResponse = readFile<RawGetLessonsResponse>(filePath, "json");

	RawGetLessonsResponseSchema.parse(rawResponse);

	return transformResponse(rawResponse);
}

export default getLessons;

// --- TYPES ---

const RawLessonSchema = z.object({
	id: z.string(),
	title: z.string(),
	emoji: z.string(),
	description: z.string(),
});

const RawGetLessonsResponseSchema = z.array(RawLessonSchema);

type RawGetLessonsResponse = z.infer<typeof RawGetLessonsResponseSchema>;

type GetLessonsResponse = Array<Lesson>;

// --- TRANSFORMS ---

function transformResponse(raw: RawGetLessonsResponse): GetLessonsResponse {
	return raw.map((lesson) => ({
		id: lesson.id,
		title: lesson.title,
		emoji: lesson.emoji,
		description: lesson.description,
	}));
}
