import {
	AArrowDown,
	AArrowUp,
	ArrowLeft,
	BookOpen,
	Check,
	Clock,
	Code2,
	Loader2,
	RotateCcw,
	Square,
	Trophy,
	Volume2,
	X,
} from "lucide-react";

import { mirror } from "@diegofrayo-pkg/utilities/arrays-and-objects";

export const Icons = {
	A_ARROW_DOWN: AArrowDown,
	A_ARROW_UP: AArrowUp,
	ARROW_LEFT: ArrowLeft,
	BOOK_OPEN: BookOpen,
	CHECK: Check,
	CLOCK: Clock,
	CODE_2: Code2,
	LOADER_2: Loader2,
	ROTATE_CCW: RotateCcw,
	SQUARE: Square,
	TROPHY: Trophy,
	VOLUME_2: Volume2,
	X_MARK: X,
} as const;

export type IconName = keyof typeof Icons;

export const IconCatalog = mirror(Object.keys(Icons)) as Record<IconName, IconName>;
