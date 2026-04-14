import path from "path";
import { z } from "zod";

import { readFile } from "@diegofrayo-pkg/utilities/server/files";

import type { DeckPhrase } from "../../../types";

async function getDeckPhrases(deckId: string): Promise<GetDeckPhrasesResponse> {
	const filePath = path.resolve(process.cwd(), `src/data/decks/${deckId}.json`);
	const rawResponse = readFile<RawGetDeckPhrasesResponse>(filePath, "json");

	RawGetDeckPhrasesResponseSchema.parse(rawResponse);

	return transformResponse(rawResponse);
}

export default getDeckPhrases;

// --- TYPES ---

const RawDeckPhraseSchema = z.object({
	sentence: z.string(),
	translation: z.string(),
});

const RawGetDeckPhrasesResponseSchema = z.array(RawDeckPhraseSchema);

type RawGetDeckPhrasesResponse = z.infer<typeof RawGetDeckPhrasesResponseSchema>;

export type GetDeckPhrasesResponse = Array<DeckPhrase>;

// --- TRANSFORMS ---

function transformResponse(raw: RawGetDeckPhrasesResponse): GetDeckPhrasesResponse {
	return raw.map((phrase) => ({
		sentence: phrase.sentence,
		translation: phrase.translation,
	}));
}
