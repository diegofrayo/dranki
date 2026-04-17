import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import type { NonNullableObject } from "@diegofrayo-pkg/types";

import { loader } from "~/features/pages/texts/pages/[text-id]/[text-id].loader.server";
import { generateMetadataTextPage } from "~/features/pages/texts/pages/[text-id]/[text-id].metadata";
import TextLessonPage from "~/features/pages/texts/pages/[text-id]/[text-id].page";

type LoaderData = NonNullableObject<Awaited<ReturnType<typeof loader>>>;

const getServerData = createServerFn()
	.inputValidator((data: { textId: string }) => data)
	.handler(async (ctx) => {
		return loader(ctx.data.textId);
	});

export const Route = createFileRoute("/texts/$textId")({
	head: async (ctx) => ({
		meta: [await generateMetadataTextPage((ctx.loaderData as unknown as LoaderData).textDetails)],
	}),
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
