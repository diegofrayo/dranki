import getTextById from "./endpoints/get-text-by-id";
import getTextContent from "./endpoints/get-text-content";
import getTexts from "./endpoints/get-texts";

const textsRouter = {
	getTextById,
	getTextContent,
	getTexts,
};

export default textsRouter;

// --- RE-EXPORTS ---

export * from "./endpoints/get-text-by-id";
export * from "./endpoints/get-text-content";
export * from "./endpoints/get-texts";
