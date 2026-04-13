import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, Button, ButtonSize, ButtonVariant, Icon, IconCatalog } from "~/components/primitive";
import type { Deck, Phrase } from "~/legacy/lib/types";

import { SwipeableCard } from "../../swipeable-card";

type PracticeCardsProps = {
	currentIndex: number;
	deck: Deck;
	phrases: Phrase[];
	showTranslationByDefault: boolean;
	onSwipeLeft: () => void;
	onSwipeRight: () => void;
};

export default function PracticeCards({
	currentIndex,
	deck,
	phrases,
	showTranslationByDefault,
	onSwipeLeft,
	onSwipeRight,
}: PracticeCardsProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		controls: "flex items-center justify-center gap-6 py-6",
		studyMoreButton:
			"h-16 w-16 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-white",
		knewItButton:
			"h-16 w-16 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white",
	};

	return (
		<>
			<Box className="relative min-h-100 flex-1">
				{phrases.slice(currentIndex, currentIndex + 2).map((phrase, idx) => (
					<SwipeableCard
						key={`${currentIndex + idx}-${phrase.english}`}
						phrase={phrase}
						deckColor={deck.color}
						showTranslationByDefault={showTranslationByDefault}
						onSwipeLeft={onSwipeLeft}
						onSwipeRight={onSwipeRight}
						isTop={idx === 0}
					/>
				))}
			</Box>

			<Box className={classes.controls}>
				<Button
					variant={ButtonVariant.OUTLINE}
					size={ButtonSize.LG}
					className={classes.studyMoreButton}
					aria-label="Study more"
					onClick={onSwipeLeft}
				>
					<Icon
						name={IconCatalog.X_MARK}
						size={28}
					/>
				</Button>
				<Button
					variant={ButtonVariant.OUTLINE}
					size={ButtonSize.LG}
					className={classes.knewItButton}
					aria-label="Knew it"
					onClick={onSwipeRight}
				>
					<Icon
						name={IconCatalog.CHECK}
						size={28}
					/>
				</Button>
			</Box>
		</>
	);
}
