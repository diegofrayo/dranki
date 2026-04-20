import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import type { NonNullableObject } from "@diegofrayo-pkg/types";

import { loader } from "~/features/pages/lessons/lessons.loader.server";
import LessonsPage from "~/features/pages/lessons/lessons.page";
import { composePageTitle } from "~/utils/misc";

type LoaderData = NonNullableObject<Awaited<ReturnType<typeof loader>>>;

export const getData = createServerFn().handler(async () => {
	return loader();
});

export const Route = createFileRoute("/lessons/")({
	head: () => ({
		meta: [{ title: composePageTitle("Lessons") }],
	}),
	loader: async () => {
		return getData();
	},
	component: function LessonsPageWrapper() {
		const { lessons } = Route.useLoaderData() as LoaderData;

		return <LessonsPage lessons={lessons} />;
	},
});
