import path from "path";
import { z } from "zod";

import { readFile } from "@diegofrayo-pkg/utilities/server/files";

import type { Deck } from "../../../types";
import getLessonById from "../../lessons/endpoints/get-lesson-by-id";
import getDeckPhrases from "./get-deck-phrases";

async function getDecks(): Promise<GetDecksResponse> {
	const filePath = path.resolve(process.cwd(), "src/data/decks.json");
	const rawResponse = readFile<RawGetDecksResponse>(filePath, "json");

	RawGetDecksResponseSchema.parse(rawResponse);

	return transformResponse(rawResponse);
}

export default getDecks;

// --- TYPES ---

const RawDeckSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	emoji: z.string(),
	lesson_id: z.string(),
	created_at: z.string(),
	theme: z.object({
		background_color: z.string(),
		font_color: z.string(),
	}),
});

const RawGetDecksResponseSchema = z.array(RawDeckSchema);

type RawGetDecksResponse = z.infer<typeof RawGetDecksResponseSchema>;

type GetDecksResponse = Array<Deck>;

// --- TRANSFORMS ---

async function transformResponse(raw: RawGetDecksResponse): Promise<GetDecksResponse> {
	return Promise.all(
		raw.map(async (deck) => ({
			id: deck.id,
			title: deck.title,
			description: deck.description,
			emoji: deck.emoji,
			lesson: await getLessonById(deck.lesson_id),
			createdAt: deck.created_at,
			theme: {
				backgroundColor: deck.theme.background_color,
				fontColor: deck.theme.font_color,
			},
			totalPhrases: (await getDeckPhrases(deck.id)).length,
		})),
	);
}
