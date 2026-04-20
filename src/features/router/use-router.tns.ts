import { useLocation, useNavigate } from "@tanstack/react-router";

export function useRouter(): { pathname: string; push: (routeName: string) => void } {
	const location = useLocation();
	const navigate = useNavigate();

	return {
		pathname: location.pathname,
		push: (route: string): void => {
			navigate({ href: route });
		},
	};
}
