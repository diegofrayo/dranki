import { z } from "zod";

import type { DeckPhrase } from "../../../types";
import DataLoader from "../../../utils/data-loader";

async function getDeckPhrases(deckId: string): Promise<GetDeckPhrasesResponse> {
	const filePath = `decks/${deckId}.json`;
	const rawResponse = await DataLoader.get<RawGetDeckPhrasesResponse>(filePath, {
		contentType: "json",
	});

	RawGetDeckPhrasesResponseSchema.parse(rawResponse);

	return transformResponse(rawResponse);
}

export default getDeckPhrases;

// --- TYPES ---

const RawDeckPhraseSchema = z.object({
	sentence: z.string(),
	translation: z.string(),
	explanation: z.string().optional(),
});

const RawGetDeckPhrasesResponseSchema = z.array(RawDeckPhraseSchema);

type RawGetDeckPhrasesResponse = z.infer<typeof RawGetDeckPhrasesResponseSchema>;

export type GetDeckPhrasesResponse = Array<DeckPhrase>;

// --- TRANSFORMS ---

function transformResponse(raw: RawGetDeckPhrasesResponse): GetDeckPhrasesResponse {
	return raw.map((phrase) => ({
		sentence: phrase.sentence,
		translation: phrase.translation,
		explanation: phrase.explanation,
	}));
}
