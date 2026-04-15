import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import TextLessonPage from "~/features/pages/texts/pages/[text-id]/texts.[text-id].page";
import { textLoader } from "~/features/router/tan-stack-loaders.server";

const getServerData = createServerFn()
	.inputValidator((data: { textId: string }) => data)
	.handler(async (ctx) => {
		return textLoader(ctx.data.textId);
	});

export const Route = createFileRoute("/texts/$textId")({
	ssr: true,
	beforeLoad: async ({ params }) => {
		const textId = params["textId"];

		return getServerData({ data: { textId } });
	},
	component: function TextLessonPageWrapper() {
		const { textDetails, textContent } = Route.useLoaderData();

		return (
			<TextLessonPage
				textDetails={textDetails}
				content={textContent}
			/>
		);
	},
});
