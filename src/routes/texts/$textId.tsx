import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import TextPage, { pageConfig } from "~/features/pages/texts/pages/[text-id]";

const getServerData = createServerFn()
	.inputValidator((data: { textId: string }) => data)
	.handler(async (ctx) => {
		const { textContent, textDetails } = await pageConfig.loader(ctx.data.textId);

		return { textContent, textDetails };
	});

export const Route = createFileRoute("/texts/$textId")({
	ssr: true,
	loader: async ({ params }) => {
		const textId = params["textId"];

		return getServerData({ data: { textId } });
	},
	component: function TextPageWrapper() {
		const { textDetails, textContent } = Route.useLoaderData();

		return (
			<TextPage
				textDetails={textDetails}
				content={textContent}
			/>
		);
	},
});
