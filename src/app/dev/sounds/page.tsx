import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

export { default } from "~/features/pages/dev/sounds";

export async function generateMetadata(): Promise<Metadata> {
	return { title: composePageTitle("Sounds") };
}
