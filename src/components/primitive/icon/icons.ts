import { BookOpen } from "lucide-react";

import { mirror } from "@diegofrayo-pkg/utilities/arrays-and-objects";

export const Icons = {
	BOOK_OPEN: BookOpen,
} as const;

export type IconName = keyof typeof Icons;

export const IconCatalog = mirror(Object.keys(Icons)) as Record<IconName, IconName>;
