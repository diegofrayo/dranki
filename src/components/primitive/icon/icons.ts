import { ArrowLeft, BookOpen, Check, RotateCcw, X } from "lucide-react";

import { mirror } from "@diegofrayo-pkg/utilities/arrays-and-objects";

export const Icons = {
	ARROW_LEFT: ArrowLeft,
	BOOK_OPEN: BookOpen,
	CHECK: Check,
	ROTATE_CCW: RotateCcw,
	X_MARK: X,
} as const;

export type IconName = keyof typeof Icons;

export const IconCatalog = mirror(Object.keys(Icons)) as Record<IconName, IconName>;
