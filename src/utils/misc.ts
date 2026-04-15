import { PROJECT_METADATA } from "~/constants";

export function composePageTitle(title: string): string {
	return `${title} - ${PROJECT_METADATA.appName}`;
}
