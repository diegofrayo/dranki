export type Metadata = {
	title: string;
	description?: string;
};

export type UseRouterReturn = {
	pathname: string;
	push: (routeName: string, reload?: boolean) => void;
	searchParams: { get: (urlParam: string) => string | null };
};
