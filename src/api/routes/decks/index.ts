import getDecks from "./endpoints/get-decks";

const decksRouter = {
	getDecks,
};

export default decksRouter;

// --- RE-EXPORTS ---

export * from "./endpoints/get-decks";
