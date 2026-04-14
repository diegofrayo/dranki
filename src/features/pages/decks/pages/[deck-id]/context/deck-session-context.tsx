"use client";

import { createContext, useContext } from "react";

import { useBrowserStorage } from "@diegofrayo-pkg/browser-storage";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck, DeckPhrase } from "~/api";

import type { Phase } from "../decks.[deck-id].types";

// --- TYPES ---

type DeckSessionContextValue = {
	deck: Deck;
	endTime: string;
	currentIndex: number;
	phase: Phase;
	phrases: DeckPhrase[];
	practiceMoreCount: number;
	recognizedCount: number;
	showTranslationByDefault: boolean;
	startTime: string;
	clearSession: () => void;
	markPracticeMore: () => void;
	markRecognized: () => void;
	setShowTranslationByDefault: (value: boolean) => void;
	startSession: () => void;
};

type DeckSessionProviderProps = {
	children: ReactTypes.Children;
	deck: Deck;
};

// --- CONTEXT ---

const DeckSessionContext = createContext<DeckSessionContextValue | null>(null);

// --- PROVIDER ---

function DeckSessionProvider({ deck, children }: DeckSessionProviderProps): ReactTypes.JSXElement {
	// --- HOOKS ---
	const [phase, setPhase, clearPhase] = useBrowserStorage<Phase>({
		key: `dranki_${deck.id}_phase`,
		value: "overview",
	});
	const [phrases, setPhrases, clearPhrases] = useBrowserStorage<DeckPhrase[]>({
		key: `dranki_${deck.id}_phrases`,
		value: [],
	});
	const [currentIndex, setCurrentIndex, clearCurrentIndex] = useBrowserStorage<number>({
		key: `dranki_${deck.id}_currentIndex`,
		value: 0,
	});
	const [recognizedCount, setRecognizedCount, clearRecognizedCount] = useBrowserStorage<number>({
		key: `dranki_${deck.id}_recognized`,
		value: 0,
	});
	const [practiceMoreCount, setPracticeMoreCount, clearPracticeMoreCount] =
		useBrowserStorage<number>({
			key: `dranki_${deck.id}_practiceMore`,
			value: 0,
		});
	const [showTranslationByDefault, setShowTranslationByDefault, clearShowTranslationByDefault] =
		useBrowserStorage<boolean>({
			key: `dranki_${deck.id}_showTranslation`,
			value: false,
		});
	const [startTime, setStartTime, clearStartTime] = useBrowserStorage<string>({
		key: `dranki_${deck.id}_startTime`,
		value: "",
	});
	const [endTime, setEndTime, clearEndTime] = useBrowserStorage<string>({
		key: `dranki_${deck.id}_endTime`,
		value: "",
	});

	// --- HANDLERS ---
	function startSession(): void {
		const shuffledPhrases = shuffleArray(deck.phrases ?? []);

		setPhrases(shuffledPhrases);
		setCurrentIndex(0);
		setRecognizedCount(0);
		setPracticeMoreCount(0);
		setStartTime(new Date().toISOString());
		setEndTime("");
		setPhase("practice");
	}

	function markRecognized(): void {
		const newIndex = currentIndex + 1;
		const newCount = recognizedCount + 1;

		setCurrentIndex(newIndex);
		setRecognizedCount(newCount);

		checkIfDeckEnds(newIndex);
	}

	function markPracticeMore(): void {
		const newIndex = currentIndex + 1;
		const newCount = practiceMoreCount + 1;

		setCurrentIndex(newIndex);
		setPracticeMoreCount(newCount);

		checkIfDeckEnds(newIndex);
	}

	function checkIfDeckEnds(newIndex: number): void {
		if (newIndex >= phrases.length && phrases.length > 0) {
			setEndTime(new Date().toISOString());
			setPhase("results");
		}
	}

	function clearSession(): void {
		clearPhase();
		clearPhrases();
		clearCurrentIndex();
		clearRecognizedCount();
		clearPracticeMoreCount();
		clearShowTranslationByDefault();
		clearStartTime();
		clearEndTime();
		setPhase("overview");
	}

	return (
		<DeckSessionContext.Provider
			value={{
				deck,
				endTime,
				currentIndex,
				phase,
				phrases,
				practiceMoreCount,
				recognizedCount,
				showTranslationByDefault,
				startTime,
				clearSession,
				markPracticeMore,
				markRecognized,
				setShowTranslationByDefault,
				startSession,
			}}
		>
			{children}
		</DeckSessionContext.Provider>
	);
}

// --- HOOK ---

function useDeckSession(): DeckSessionContextValue {
	const context = useContext(DeckSessionContext);
	if (!context) throw new Error("useDeckSession must be used within DeckSessionProvider");
	return context;
}

export { DeckSessionProvider, useDeckSession };

// --- UTILS ---

function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j] as T, shuffled[i] as T];
	}
	return shuffled;
}
