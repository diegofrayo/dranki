/*
import { usePathname, useRouter as useRouterNext } from "next/navigation";

export function useRouter(): { pathname: string; push: (routeName: string) => void } {
	const pathname = usePathname();
	const { push } = useRouterNext();

	return {
		pathname,
		push,
	};
}
*/

import { isBrowser } from "@diegofrayo-pkg/validator";

export function useRouter(): { pathname: string; push: (routeName: string) => void } {
	return {
		pathname: isBrowser() ? window.location.pathname : "",
		push: (route: string): void => {
			window.location.href = route;
		},
	};
}
