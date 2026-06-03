"use client";

import { usePathname, useRouter as useRouterNext, useSearchParams } from "next/navigation";

import type { UseRouterReturn } from "./types";

export function useRouter(): UseRouterReturn {
	const pathname = usePathname();
	const { push } = useRouterNext();
	const searchParams = useSearchParams();

	return {
		pathname,
		push,
		searchParams,
	};
}
