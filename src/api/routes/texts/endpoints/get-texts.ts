import path from "path";
import { z } from "zod";

import { sortBy } from "@diegofrayo-pkg/sort";
import { readFile } from "@diegofrayo-pkg/utilities/server/files";

import type { Text } from "../../../types";
import getLessonById from "../../lessons/endpoints/get-lesson-by-id";

async function getTexts(): Promise<GetTextsResponse> {
	const filePath = path.resolve(process.cwd(), "src/data/texts.json");
	const rawResponse = readFile<RawGetTextsResponse>(filePath, "json");

	RawGetTextsResponseSchema.parse(rawResponse);

	return transformResponse(rawResponse);
}

export default getTexts;

// --- TYPES ---

const RawTextSchema = z.object({
	id: z.string(),
	title: z.string(),
	emoji: z.string(),
	lesson_id: z.string(),
});

const RawGetTextsResponseSchema = z.array(RawTextSchema);

type RawGetTextsResponse = z.infer<typeof RawGetTextsResponseSchema>;

export type GetTextsResponse = Array<Text>;

// --- TRANSFORMS ---

async function transformResponse(raw: RawGetTextsResponse): Promise<GetTextsResponse> {
	const texts = await Promise.all(
		raw.map(async (rawText) => {
			const lesson = await getLessonById(rawText.lesson_id);

			return {
				id: rawText.id,
				title: rawText.title,
				emoji: rawText.emoji || "📝",
				lesson,
			};
		}),
	);

	return texts.sort(sortBy("title"));
}
