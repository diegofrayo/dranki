import getTextById from "./endpoints/get-text-by-id";
import getTextContent from "./endpoints/get-text-content";
import getTexts from "./endpoints/get-texts";
import getTextsByLessonId from "./endpoints/get-texts-by-lesson-id";

const textsRouter = {
	getTextById,
	getTextContent,
	getTexts,
	getTextsByLessonId,
};

export default textsRouter;

// --- RE-EXPORTS ---

export * from "./endpoints/get-text-by-id";
export * from "./endpoints/get-text-content";
export * from "./endpoints/get-texts";
export * from "./endpoints/get-texts-by-lesson-id";
