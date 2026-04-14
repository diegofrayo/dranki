import getLessonById from "./endpoints/get-lesson-by-id";
import getLessonContent from "./endpoints/get-lesson-content";
import getLessons from "./endpoints/get-lessons";

const lessonsRouter = {
	getLessonById,
	getLessonContent,
	getLessons,
};

export default lessonsRouter;

// --- RE-EXPORTS ---

export * from "./endpoints/get-lesson-by-id";
export * from "./endpoints/get-lesson-content";
export * from "./endpoints/get-lessons";
