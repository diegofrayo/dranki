import type ReactTypes from "@diegofrayo-pkg/types/react";

import api from "~/api";
import LessonsPage from "~/features/pages/lessons";

export default async function LessonsPageWrapper(): Promise<ReactTypes.JSXElement> {
	const lessons = await api.lessons.getLessons();

	return <LessonsPage lessons={lessons} />;
}
