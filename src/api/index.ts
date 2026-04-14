import lessonsRouter from "./routes/lessons";
import textsRouter from "./routes/texts";

const api = {
	lessons: lessonsRouter,
	texts: textsRouter,
};

export default api;

// --- RE-EXPORTS ---

export * from "./routes/lessons";
export * from "./routes/texts";
export * from "./types";
