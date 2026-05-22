import { z } from "zod";

import { sortBy } from "@diegofrayo-pkg/sort";

import { Emojis } from "~/constants";

import type { Text } from "../../../types";
import DataLoader from "../../../utils/data-loader";
import getLessonById from "../../lessons/endpoints/get-lesson-by-id";

async function getTexts(): Promise<GetTextsResponse> {
	const rawResponse = await DataLoader.get<RawGetTextsResponse>("texts.json", {
		contentType: "json",
	});

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
	practice_words: z
		.array(
			z.object({
				word: z.string(),
				translation: z.string(),
				example: z.string(),
			}),
		)
		.optional(),
	public: z.boolean().optional(),
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
				emoji: rawText.emoji || Emojis.TEXTS,
				lesson,
				practiceWords: (rawText.practice_words || []).sort(sortBy("word")),
				public: rawText.public ?? true,
			};
		}),
	);

	return texts.sort(sortBy("title"));
}
