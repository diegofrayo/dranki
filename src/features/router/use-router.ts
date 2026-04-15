import { isBrowser } from "@diegofrayo-pkg/validator";

export function useRouter(): { pathname: string; push: (routeName: string) => void } {
	return {
		pathname: isBrowser() ? window.location.pathname : "",
		push: (route: string): void => {
			window.location.href = route;
		},
	};
}
