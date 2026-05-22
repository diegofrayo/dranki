import DataLoader from "../../../utils/data-loader";

async function getLessonContent(lessonId: string): Promise<GetLessonContentResponse> {
	const content = await DataLoader.get<string>(`lessons/${lessonId}.md`, {
		contentType: "md",
	});

	return content;
}

export default getLessonContent;

// --- TYPES ---

export type GetLessonContentResponse = string;
