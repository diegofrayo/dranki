import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import type { NonNullableObject } from "@diegofrayo-pkg/types";

import { loader } from "~/features/pages/texts/pages/[text-id]/[text-id].loader.server";
import { generateMetadataTextPage } from "~/features/pages/texts/pages/[text-id]/[text-id].metadata";
import TextPage from "~/features/pages/texts/pages/[text-id]/[text-id].page";

type LoaderData = NonNullableObject<Awaited<ReturnType<typeof loader>>>;

const getServerData = createServerFn()
	.inputValidator((data: { textId: string }) => data)
	.handler(async (ctx) => {
		return loader(ctx.data.textId);
	});

export const Route = createFileRoute("/texts/$textId")({
	head: async (ctx) => ({
		meta: [await generateMetadataTextPage((ctx.loaderData as unknown as LoaderData).details)],
	}),
	loader: async ({ params }): Promise<LoaderData> => {
		const textId = params["textId"];
		const { details, content } = await getServerData({ data: { textId } });

		if (!details || !content) {
			throw notFound();
		}

		return { details, content };
	},
	component: function TextLessonPageWrapper() {
		const { details, content } = Route.useLoaderData() as LoaderData;

		return (
			<TextPage
				details={details}
				content={content}
			/>
		);
	},
});
