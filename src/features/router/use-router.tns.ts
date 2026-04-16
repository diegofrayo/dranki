import { useLocation } from "@tanstack/react-router";

export function useRouter(): { pathname: string; push: (routeName: string) => void } {
	const location = useLocation();

	return {
		pathname: location.pathname,
		push: (route: string): void => {
			window.location.href = route;
		},
	};
}
