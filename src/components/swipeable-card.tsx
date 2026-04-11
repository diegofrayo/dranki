"use client";

import { useCallback, useRef, useState } from "react";

import type { Phrase } from "~/legacy/lib/types";
import { cn } from "~/legacy/lib/utils";

interface SwipeableCardProps {
	phrase: Phrase;
	deckColor: string;
	onSwipeLeft: () => void;
	onSwipeRight: () => void;
	isTop: boolean;
}

export function SwipeableCard({
	phrase,
	deckColor,
	onSwipeLeft,
	onSwipeRight,
	isTop,
}: SwipeableCardProps) {
	const [isFlipped, setIsFlipped] = useState(false);
	const [dragX, setDragX] = useState(0);
	const [dragY, setDragY] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const startPos = useRef({ x: 0, y: 0 });
	const cardRef = useRef<HTMLDivElement>(null);

	const SWIPE_THRESHOLD = 100;
	const ROTATION_FACTOR = 0.1;

	const handleStart = useCallback(
		(clientX: number, clientY: number) => {
			if (!isTop) return;
			setIsDragging(true);
			startPos.current = { x: clientX, y: clientY };
		},
		[isTop],
	);

	const handleMove = useCallback(
		(clientX: number, clientY: number) => {
			if (!isDragging || !isTop) return;
			const deltaX = clientX - startPos.current.x;
			const deltaY = clientY - startPos.current.y;
			setDragX(deltaX);
			setDragY(deltaY * 0.3); // Reduce vertical movement
		},
		[isDragging, isTop],
	);

	const handleEnd = useCallback(() => {
		if (!isDragging) return;
		setIsDragging(false);

		if (dragX > SWIPE_THRESHOLD) {
			// Swipe right - knew it
			onSwipeRight();
		} else if (dragX < -SWIPE_THRESHOLD) {
			// Swipe left - didn't know
			onSwipeLeft();
		}

		setDragX(0);
		setDragY(0);
	}, [isDragging, dragX, onSwipeLeft, onSwipeRight]);

	const handleTouchStart = (e: React.TouchEvent) => {
		handleStart(e.touches[0].clientX, e.touches[0].clientY);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		handleMove(e.touches[0].clientX, e.touches[0].clientY);
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		handleStart(e.clientX, e.clientY);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		handleMove(e.clientX, e.clientY);
	};

	const handleMouseUp = () => {
		handleEnd();
	};

	const handleMouseLeave = () => {
		if (isDragging) handleEnd();
	};

	const rotation = dragX * ROTATION_FACTOR;
	const opacity = Math.max(0.5, 1 - Math.abs(dragX) / 300);

	// Indicator colors
	const showKnewIt = dragX > 30;
	const showDidntKnow = dragX < -30;

	return (
		<div
			ref={cardRef}
			className={cn(
				"absolute inset-0 cursor-grab touch-none select-none",
				isDragging && "cursor-grabbing",
				!isTop && "pointer-events-none",
			)}
			style={{
				transform: `translateX(${dragX}px) translateY(${dragY}px) rotate(${rotation}deg)`,
				transition: isDragging ? "none" : "transform 0.3s ease-out",
				opacity: isTop ? opacity : 0.5,
				zIndex: isTop ? 10 : 5,
			}}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleEnd}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseLeave}
		>
			{/* Swipe indicators */}
			<div
				className={cn(
					"border-primary text-primary absolute top-6 right-6 z-20 rotate-12 rounded-lg border-4 px-4 py-2 text-xl font-bold uppercase transition-opacity",
					showKnewIt ? "opacity-100" : "opacity-0",
				)}
			>
				Knew it!
			</div>
			<div
				className={cn(
					"border-destructive text-destructive absolute top-6 left-6 z-20 -rotate-12 rounded-lg border-4 px-4 py-2 text-xl font-bold uppercase transition-opacity",
					showDidntKnow ? "opacity-100" : "opacity-0",
				)}
			>
				Study more
			</div>

			{/* Card */}
			<div
				className="perspective-1000 h-full w-full"
				onClick={() => isTop && setIsFlipped(!isFlipped)}
			>
				<div
					className={cn(
						"preserve-3d relative h-full w-full transition-transform duration-500",
						isFlipped && "rotate-y-180",
					)}
					style={{ transformStyle: "preserve-3d" }}
				>
					{/* Front - English */}
					<div
						className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl p-8 shadow-xl backface-hidden"
						style={{
							backgroundColor: deckColor,
							backfaceVisibility: "hidden",
						}}
					>
						<p className="mb-4 text-xs font-semibold tracking-wider text-white/60 uppercase">
							English
						</p>
						<p className="text-center text-2xl leading-relaxed font-bold text-balance text-white md:text-3xl">
							{phrase.english}
						</p>
						<p className="mt-8 text-sm text-white/50">Tap to reveal translation</p>
					</div>

					{/* Back - Japanese */}
					<div
						className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl p-8 shadow-xl"
						style={{
							backgroundColor: deckColor,
							backfaceVisibility: "hidden",
							transform: "rotateY(180deg)",
						}}
					>
						<p className="mb-4 text-xs font-semibold tracking-wider text-white/60 uppercase">
							Japanese
						</p>
						<p className="text-center text-2xl leading-relaxed font-bold text-balance text-white md:text-3xl">
							{phrase.japanese}
						</p>
						<p className="mt-8 text-sm text-white/50">Tap to see English</p>
					</div>
				</div>
			</div>
		</div>
	);
}
