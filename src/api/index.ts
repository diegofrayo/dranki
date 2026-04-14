import decksRouter from "./routes/decks";
import lessonsRouter from "./routes/lessons";
import textsRouter from "./routes/texts";

const api = {
	decks: decksRouter,
	lessons: lessonsRouter,
	texts: textsRouter,
};

export default api;

// --- RE-EXPORTS ---

export * from "./routes/decks";
export * from "./routes/lessons";
export * from "./routes/texts";
export * from "./types";
