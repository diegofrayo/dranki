"use client";

import { useCallback, useState } from "react";
import { ArrowLeft, Check, RotateCcw, X } from "lucide-react";
import Link from "next/link";

import { SwipeableCard } from "~/components/swipeable-card";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import type { Deck, Phrase } from "~/legacy/lib/types";

interface PracticeViewProps {
	deck: Deck;
}

function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

export function PracticeView({ deck }: PracticeViewProps) {
	const [phrases, setPhrases] = useState<Phrase[]>(() => shuffleArray(deck.phrases));
	const [currentIndex, setCurrentIndex] = useState(0);
	const [knewCount, setKnewCount] = useState(0);
	const [studyMoreCount, setStudyMoreCount] = useState(0);

	const isComplete = currentIndex >= phrases.length;
	const progress = phrases.length > 0 ? (currentIndex / phrases.length) * 100 : 0;

	const handleSwipeRight = useCallback(() => {
		setKnewCount((c) => c + 1);
		setCurrentIndex((i) => i + 1);
	}, []);

	const handleSwipeLeft = useCallback(() => {
		setStudyMoreCount((c) => c + 1);
		setCurrentIndex((i) => i + 1);
	}, []);

	const handleRestart = () => {
		setPhrases(shuffleArray(deck.phrases));
		setCurrentIndex(0);
		setKnewCount(0);
		setStudyMoreCount(0);
	};

	const handleButtonSwipe = (direction: "left" | "right") => {
		if (direction === "right") {
			handleSwipeRight();
		} else {
			handleSwipeLeft();
		}
	};

	return (
		<div className="bg-background flex min-h-screen flex-col">
			{/* Header */}
			<header className="bg-background/80 border-border sticky top-0 z-40 border-b backdrop-blur-md">
				<div className="mx-auto max-w-md px-4 py-3">
					<div className="flex items-center gap-3">
						<Link href="/">
							<Button
								variant="ghost"
								size="icon"
								className="h-9 w-9"
								aria-label="Back to decks"
							>
								<ArrowLeft className="h-5 w-5" />
							</Button>
						</Link>
						<div className="min-w-0 flex-1">
							<div className="flex items-center gap-2">
								<span
									className="text-xl"
									role="img"
									aria-label="deck icon"
								>
									{deck.emoji}
								</span>
								<h1 className="text-foreground truncate font-bold">{deck.title}</h1>
							</div>
							<div className="mt-1.5">
								<Progress
									value={progress}
									className="h-2"
								/>
							</div>
						</div>
						<span className="text-muted-foreground text-sm font-medium tabular-nums">
							{currentIndex}/{phrases.length}
						</span>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-6">
				{isComplete ? (
					/* Completion Screen */
					<div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
						<div
							className="mb-6 flex h-24 w-24 items-center justify-center rounded-full"
							style={{ backgroundColor: deck.color }}
						>
							<span className="text-5xl">{deck.emoji}</span>
						</div>
						<h2 className="text-foreground mb-2 text-2xl font-bold">Session Complete!</h2>
						<p className="text-muted-foreground mb-8">
							You&apos;ve reviewed all {phrases.length} phrases
						</p>

						{/* Stats */}
						<div className="mb-8 flex gap-8">
							<div className="text-center">
								<div className="text-primary flex items-center justify-center gap-2">
									<Check className="h-5 w-5" />
									<span className="text-3xl font-bold">{knewCount}</span>
								</div>
								<p className="text-muted-foreground mt-1 text-sm">Knew it</p>
							</div>
							<div className="text-center">
								<div className="text-destructive flex items-center justify-center gap-2">
									<X className="h-5 w-5" />
									<span className="text-3xl font-bold">{studyMoreCount}</span>
								</div>
								<p className="text-muted-foreground mt-1 text-sm">Study more</p>
							</div>
						</div>

						<div className="flex w-full max-w-xs flex-col gap-3">
							<Button
								onClick={handleRestart}
								size="lg"
								className="h-12 font-bold"
							>
								<RotateCcw className="mr-2 h-4 w-4" />
								Practice Again
							</Button>
							<Link
								href="/"
								className="w-full"
							>
								<Button
									variant="outline"
									size="lg"
									className="h-12 w-full"
								>
									Back to Decks
								</Button>
							</Link>
						</div>
					</div>
				) : (
					/* Practice Cards */
					<>
						<div className="relative min-h-[400px] flex-1">
							{/* Show current and next card */}
							{phrases.slice(currentIndex, currentIndex + 2).map((phrase, idx) => (
								<SwipeableCard
									key={`${currentIndex + idx}-${phrase.english}`}
									phrase={phrase}
									deckColor={deck.color}
									onSwipeLeft={handleSwipeLeft}
									onSwipeRight={handleSwipeRight}
									isTop={idx === 0}
								/>
							))}
						</div>

						{/* Button Controls */}
						<div className="flex items-center justify-center gap-6 py-6">
							<Button
								variant="outline"
								size="lg"
								className="border-destructive text-destructive hover:bg-destructive h-16 w-16 rounded-full border-2 hover:text-white"
								onClick={() => handleButtonSwipe("left")}
								aria-label="Study more"
							>
								<X className="h-7 w-7" />
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="border-primary text-primary hover:bg-primary h-16 w-16 rounded-full border-2 hover:text-white"
								onClick={() => handleButtonSwipe("right")}
								aria-label="Knew it"
							>
								<Check className="h-7 w-7" />
							</Button>
						</div>
					</>
				)}
			</main>
		</div>
	);
}
