import {
	ArrowLeft,
	BookOpen,
	Check,
	Clock,
	Loader2,
	RotateCcw,
	Square,
	Trophy,
	Volume2,
	X,
} from "lucide-react";

import { mirror } from "@diegofrayo-pkg/utilities/arrays-and-objects";

export const Icons = {
	ARROW_LEFT: ArrowLeft,
	BOOK_OPEN: BookOpen,
	CHECK: Check,
	CLOCK: Clock,
	LOADER_2: Loader2,
	ROTATE_CCW: RotateCcw,
	SQUARE: Square,
	TROPHY: Trophy,
	VOLUME_2: Volume2,
	X_MARK: X,
} as const;

export type IconName = keyof typeof Icons;

export const IconCatalog = mirror(Object.keys(Icons)) as Record<IconName, IconName>;
