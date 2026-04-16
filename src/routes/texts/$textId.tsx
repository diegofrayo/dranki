import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import type { NonNullableObject } from "@diegofrayo-pkg/types";

import TextLessonPage from "~/features/pages/texts/pages/[text-id]/texts.[text-id].page";
import { textLoader } from "~/features/router/tan-stack-loaders.server";

type LoaderData = NonNullableObject<Awaited<ReturnType<typeof textLoader>>>;

const getServerData = createServerFn()
	.inputValidator((data: { textId: string }) => data)
	.handler(async (ctx) => {
		return textLoader(ctx.data.textId);
	});

export const Route = createFileRoute("/texts/$textId")({
	loader: async ({ params }): Promise<LoaderData> => {
		const textId = params["textId"];
		const { textDetails, textContent } = await getServerData({ data: { textId } });

		if (!textDetails) throw notFound();

		return { textDetails, textContent };
	},
	component: function TextLessonPageWrapper() {
		const { textDetails, textContent } = Route.useLoaderData() as LoaderData;

		return (
			<TextLessonPage
				textDetails={textDetails}
				content={textContent}
			/>
		);
	},
});
