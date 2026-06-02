import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";

import type { UseRouterReturn } from "./types";

export function useRouter(): UseRouterReturn {
	const location = useLocation();
	const navigate = useNavigate();
	const searchParams = useSearch({
		from: window.location.pathname,
	});

	const api: UseRouterReturn = {
		pathname: location.pathname,
		push: (route) => {
			navigate({ href: route });
		},
		searchParams: {
			get(urlParam) {
				return searchParams[urlParam] ?? null;
			},
		},
	};

	return api;
}
