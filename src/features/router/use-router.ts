import { usePathname, useRouter as useRouterNext } from "next/navigation";

export function useRouter(): { pathname: string; push: (routeName: string) => void } {
	const pathname = usePathname();
	const { push } = useRouterNext();

	return {
		pathname,
		push,
	};
}
