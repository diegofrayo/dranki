import {
	AArrowDown,
	AArrowUp,
	ArrowLeft,
	BookOpen,
	Check,
	ChevronDown,
	Clock,
	Code2,
	ExternalLink,
	Languages,
	Loader2,
	Lock,
	Play,
	RotateCcw,
	Settings,
	Square,
	TriangleAlert,
	Trophy,
	Volume2,
	X,
} from "lucide-react";

import { mirror } from "@diegofrayo-pkg/utilities/arrays-and-objects";

export const Icons = {
	ARROW_DOWN: AArrowDown,
	ARROW_UP: AArrowUp,
	ARROW_LEFT: ArrowLeft,
	BOOK_OPEN: BookOpen,
	CHECK: Check,
	CHEVRON_DOWN: ChevronDown,
	CLOCK: Clock,
	CODE: Code2,
	EXTERNAL_LINK: ExternalLink,
	LANGUAGES: Languages,
	LOADER: Loader2,
	LOCK: Lock,
	PLAY: Play,
	ROTATE_CCW: RotateCcw,
	SETTINGS: Settings,
	SQUARE: Square,
	TRIANGLE_ALERT: TriangleAlert,
	TROPHY: Trophy,
	VOLUME: Volume2,
	X_MARK: X,
} as const;

export type IconName = keyof typeof Icons;

export const IconCatalog = mirror(Object.keys(Icons)) as Record<IconName, IconName>;
