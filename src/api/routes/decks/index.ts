import getDeckById from "./endpoints/get-deck-by-id";
import getDeckPhrases from "./endpoints/get-deck-phrases";
import getDecks from "./endpoints/get-decks";

const decksRouter = {
	getDeckById,
	getDeckPhrases,
	getDecks,
};

export default decksRouter;

// --- RE-EXPORTS ---

export * from "./endpoints/get-deck-by-id";
export * from "./endpoints/get-deck-phrases";
export * from "./endpoints/get-decks";
