import type ReactTypes from "@diegofrayo-pkg/types/react";

import api from "~/api";
import LessonsPage from "~/features/pages/lessons";
import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

export default async function LessonsPageWrapper(): Promise<ReactTypes.JSXElement> {
	const lessons = await api.lessons.getLessons();

	return <LessonsPage lessons={lessons} />;
}

export async function generateMetadata(): Promise<Metadata> {
	return { title: composePageTitle("Lessons") };
}
