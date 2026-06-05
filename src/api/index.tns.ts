import { createServerOnlyFn } from "@tanstack/react-start";

import decksRouter from "./routes/decks";
import lessonsRouter from "./routes/lessons";
import textsRouter from "./routes/texts";

const api = (): API => ({
	decks: decksRouter,
	lessons: lessonsRouter,
	texts: textsRouter,
});

const apiProtected = createServerOnlyFn(() => {
	return api();
});

export default apiProtected;

// --- TYPES ---

type API = {
	decks: typeof decksRouter;
	lessons: typeof lessonsRouter;
	texts: typeof textsRouter;
};
