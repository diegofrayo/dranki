import type ReactTypes from "@diegofrayo-pkg/types/react";

import LessonsPage from "~/features/pages/lessons";
import { loader } from "~/features/pages/lessons/lessons.loader";
import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

export default async function LessonsPageWrapper(): Promise<ReactTypes.JSXElement> {
	const { lessons } = await loader();

	return <LessonsPage lessons={lessons} />;
}

export async function generateMetadata(): Promise<Metadata> {
	return { title: composePageTitle("Lessons") };
}
