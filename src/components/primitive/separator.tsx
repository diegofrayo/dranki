import { Separator as BaseUISeparator, type SeparatorProps } from "@base-ui/react";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

function Separator({ orientation, className }: SeparatorProps): ReactTypes.JSXElement {
	return (
		<BaseUISeparator
			orientation={orientation}
			className={cn(className)}
		/>
	);
}

export default Separator;
