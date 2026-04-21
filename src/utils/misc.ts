import { PROJECT_METADATA } from "~/constants";

export function composePageTitle(title: string): string {
	return `${title} - ${PROJECT_METADATA.appName}`;
}

export function loadScript(src: string): Promise<void> {
	const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);

	if (existing) {
		return existing.dataset["loaded"] === "true"
			? Promise.resolve()
			: new Promise((resolve, reject) => {
					existing.addEventListener("load", () => resolve());
					existing.addEventListener("error", () =>
						reject(new Error(`Failed to load script: ${src}`)),
					);
				});
	}

	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = src;
		script.async = false;
		script.addEventListener("load", () => {
			script.dataset["loaded"] = "true";
			resolve();
		});
		script.addEventListener("error", () => reject(new Error(`Failed to load script: ${src}`)));
		document.head.appendChild(script);
	});
}
