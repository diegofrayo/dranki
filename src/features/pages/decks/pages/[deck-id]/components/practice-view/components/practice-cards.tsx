"use client";

import { useRef, useState } from "react";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import {
	Box,
	Button,
	ButtonSize,
	ButtonVariant,
	Icon,
	IconCatalog,
	Text,
} from "~/components/primitive";
import type { Deck, Phrase } from "~/legacy/lib/types";

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

// --- COMPONENTS ---

const SWIPE_THRESHOLD = 100;
const ROTATION_FACTOR = 0.1;

type SwipeableCardProps = {
	deckColor: string;
	isTop: boolean;
	phrase: Phrase;
	showTranslationByDefault: boolean;
	onSwipeLeft: () => void;
	onSwipeRight: () => void;
};

export function SwipeableCard({
	deckColor,
	isTop,
	phrase,
	showTranslationByDefault,
	onSwipeLeft,
	onSwipeRight,
}: SwipeableCardProps): ReactTypes.JSXElement {
	// --- STATES & REFS ---
	const [isFlipped, setIsFlipped] = useState(showTranslationByDefault);
	const [dragX, setDragX] = useState(0);
	const [dragY, setDragY] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const cardRef = useRef<HTMLDivElement>(null);

	// --- COMPUTED STATES ---
	const rotation = dragX * ROTATION_FACTOR;
	const opacity = Math.max(0.5, 1 - Math.abs(dragX) / 300);
	const showKnewIt = dragX > 30;
	const showDidntKnow = dragX < -30;

	// --- STYLES ---
	const classes = {
		container: cn(
			"absolute inset-0 cursor-grab touch-none select-none",
			isDragging && "cursor-grabbing",
			!isTop && "pointer-events-none",
		),
		knewItIndicator: cn(
			"border-primary text-primary absolute top-6 right-6 z-20 rotate-12 rounded-lg border-4 px-4 py-2 text-xl font-bold uppercase transition-opacity",
			showKnewIt ? "opacity-100" : "opacity-0",
		),
		studyMoreIndicator: cn(
			"border-destructive text-destructive absolute top-6 left-6 z-20 -rotate-12 rounded-lg border-4 px-4 py-2 text-xl font-bold uppercase transition-opacity",
			showDidntKnow ? "opacity-100" : "opacity-0",
		),
		perspectiveContainer: "perspective-1000 h-full w-full",
		cardInner: cn(
			"preserve-3d relative h-full w-full transition-transform duration-500",
			isFlipped && "rotate-y-180",
		),
		cardFace:
			"absolute inset-0 flex flex-col items-center justify-center rounded-3xl p-8 shadow-xl",
	};

	// --- HANDLERS ---
	function handleTouchStart(e: React.TouchEvent): void {
		if (!e.touches[0] || !isTop) return;
		setIsDragging(true);
		startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
	}

	function handleTouchMove(e: React.TouchEvent): void {
		if (!e.touches[0] || !isDragging || !isTop) return;
		setDragX(e.touches[0].clientX - startPos.current.x);
		setDragY((e.touches[0].clientY - startPos.current.y) * 0.3);
	}

	function handleTouchEnd(): void {
		processDragEnd();
	}

	function handleMouseDown(e: React.MouseEvent): void {
		if (!isTop) return;
		setIsDragging(true);
		startPos.current = { x: e.clientX, y: e.clientY };
	}

	function handleMouseMove(e: React.MouseEvent): void {
		if (!isDragging || !isTop) return;
		setDragX(e.clientX - startPos.current.x);
		setDragY((e.clientY - startPos.current.y) * 0.3);
	}

	function handleMouseUp(): void {
		processDragEnd();
	}

	function handleMouseLeave(): void {
		if (isDragging) processDragEnd();
	}

	function handleCardClick(): void {
		if (isTop) setIsFlipped(!isFlipped);
	}

	// --- UTILS ---
	function processDragEnd(): void {
		if (!isDragging) return;
		setIsDragging(false);

		if (dragX > SWIPE_THRESHOLD) {
			onSwipeRight();
		} else if (dragX < -SWIPE_THRESHOLD) {
			onSwipeLeft();
		}

		setDragX(0);
		setDragY(0);
	}

	return (
		<div
			ref={cardRef}
			className={classes.container}
			style={{
				transform: `translateX(${dragX}px) translateY(${dragY}px) rotate(${rotation}deg)`,
				transition: isDragging ? "none" : "transform 0.3s ease-out",
				opacity: isTop ? opacity : 0.5,
				zIndex: isTop ? 10 : 5,
			}}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseLeave}
		>
			<div className={classes.knewItIndicator}>Knew it!</div>
			<div className={classes.studyMoreIndicator}>Study more</div>

			{/* NOTE: Using a native <button> here instead of the Button primitive because
			    the Button primitive carries CVA visual styles that conflict with the 3D
			    perspective container layout needed for the flip animation. */}
			<button
				type="button"
				className={classes.perspectiveContainer}
				onClick={handleCardClick}
			>
				<div
					className={classes.cardInner}
					style={{ transformStyle: "preserve-3d" }}
				>
					{/* Front - English */}
					<div
						className={classes.cardFace}
						style={{ backgroundColor: deckColor, backfaceVisibility: "hidden" }}
					>
						<Text className="mb-4 text-xs font-semibold tracking-wider text-white/60 uppercase">
							English
						</Text>
						<Text className="text-center text-2xl leading-relaxed font-bold text-balance text-white md:text-3xl">
							{phrase.english}
						</Text>
						<Text className="mt-8 text-sm text-white/50">Tap to reveal translation</Text>
					</div>

					{/* Back - Japanese */}
					<div
						className={classes.cardFace}
						style={{
							backgroundColor: deckColor,
							backfaceVisibility: "hidden",
							transform: "rotateY(180deg)",
						}}
					>
						<Text className="mb-4 text-xs font-semibold tracking-wider text-white/60 uppercase">
							Japanese
						</Text>
						<Text className="text-center text-2xl leading-relaxed font-bold text-balance text-white md:text-3xl">
							{phrase.japanese}
						</Text>
						<Text className="mt-8 text-sm text-white/50">Tap to see English</Text>
					</div>
				</div>
			</button>
		</div>
	);
}
