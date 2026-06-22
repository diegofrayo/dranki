import { useLocation, useNavigate } from "@tanstack/react-router";

import { useUrlParams } from "@diegofrayo-pkg/hooks";

import type { UseRouterReturn } from "./types";

export function useRouter(): UseRouterReturn {
	const location = useLocation();
	const navigate = useNavigate();
	const urlParams = useUrlParams();

	const api: UseRouterReturn = {
		pathname: location.pathname,
		push: (routeName, reload) => {
			if (reload) {
				window.location.href = routeName;
			} else {
				navigate({ href: routeName });
			}
		},
		searchParams: {
			get(urlParam) {
				return urlParams.get(urlParam) ?? null;
			},
		},
	};

	return api;
}
