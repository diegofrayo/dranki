import { useEffect, useState } from "react";

import type ReactTypes from "../types/react";

function withRenderInBrowser<ComponentProps extends object>(
	Component: ReactTypes.FunctionComponent<ComponentProps>,
): ReactTypes.FunctionComponent<ComponentProps> {
	function RenderInBrowserComponent(props: ComponentProps): ReactTypes.JSXElementNullable {
		const [isMounted, setIsMounted] = useState(false);

		useEffect(function onMount() {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setIsMounted(true);
		}, []);

		if (!isMounted) return null;

		return <Component {...props} />;
	}

	RenderInBrowserComponent.displayName = `withRenderInBrowser(${
		Component.displayName || Component.name || "Component"
	})`;

	return RenderInBrowserComponent;
}

export default withRenderInBrowser;
