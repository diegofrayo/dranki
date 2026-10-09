import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

export { default } from "~/features/pages/dev/colors";

export function generateMetadata(): Metadata {
	return { title: composePageTitle("Colors") };
}
