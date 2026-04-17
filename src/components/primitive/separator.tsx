import { Separator as BaseUISeparator, type SeparatorProps } from "@base-ui/react";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

function Separator({ orientation, className }: SeparatorProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		root: cn(orientation === "vertical" ? "w-px" : "h-px", className),
	};

	return (
		<BaseUISeparator
			orientation={orientation}
			className={classes.root}
		/>
	);
}

export default Separator;
