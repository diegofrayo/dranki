"use client";

import { createContext, useContext } from "react";

import { useBrowserStorage } from "@diegofrayo-pkg/browser-storage";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck, DeckPhrase } from "~/api";
import { PROJECT_METADATA } from "~/constants";

// --- TYPES ---

type DeckSessionContextValue = {
	deck: Deck;
	endTime: string;
	currentIndex: number;
	phase: Phase;
	phrases: DeckPhrase[];
	practiceMoreCount: number;
	recognizedCount: number;
	autoPlayAudio: boolean;
	showSentenceByDefault: boolean;
	showTranslationByDefault: boolean;
	startTime: string;
	clearSession: () => void;
	markPracticeMore: () => void;
	markRecognized: () => void;
	setAutoPlayAudio: (value: boolean) => void;
	setPhase: (value: Phase) => void;
	setShowSentenceByDefault: (value: boolean) => void;
	setShowTranslationByDefault: (value: boolean) => void;
	startSession: () => void;
};

type DeckSessionProviderProps = {
	children: ReactTypes.Children;
	deck: Deck;
};

type Phase = "overview" | "practice" | "results";

// --- CONTEXT ---

const DeckSessionContext = createContext<DeckSessionContextValue | null>(null);

// --- PROVIDER ---

function DeckSessionProvider({ deck, children }: DeckSessionProviderProps): ReactTypes.JSXElement {
	const browserStorageBaseKey = `${PROJECT_METADATA.appName}_${deck.id}`;

	// --- HOOKS ---
	const [phase, setPhase, clearPhase] = useBrowserStorage<Phase>({
		key: `${browserStorageBaseKey}_phase`,
		value: "overview",
	});
	const [phrases, setPhrases, clearPhrases] = useBrowserStorage<DeckPhrase[]>({
		key: `${browserStorageBaseKey}_phrases`,
		value: [],
	});
	const [currentIndex, setCurrentIndex, clearCurrentIndex] = useBrowserStorage<number>({
		key: `${browserStorageBaseKey}_currentIndex`,
		value: 0,
	});
	const [recognizedCount, setRecognizedCount, clearRecognizedCount] = useBrowserStorage<number>({
		key: `${browserStorageBaseKey}_recognized`,
		value: 0,
	});
	const [practiceMoreCount, setPracticeMoreCount, clearPracticeMoreCount] =
		useBrowserStorage<number>({
			key: `${browserStorageBaseKey}_practiceMore`,
			value: 0,
		});
	const [autoPlayAudio, setAutoPlayAudio, clearAutoPlayAudio] = useBrowserStorage<boolean>({
		key: `${browserStorageBaseKey}_autoPlayAudio`,
		value: true,
	});
	const [showSentenceByDefault, setShowSentenceByDefault, clearShowSentenceByDefault] =
		useBrowserStorage<boolean>({
			key: `${browserStorageBaseKey}_showSentence`,
			value: true,
		});
	const [showTranslationByDefault, setShowTranslationByDefault, clearShowTranslationByDefault] =
		useBrowserStorage<boolean>({
			key: `${browserStorageBaseKey}_showTranslation`,
			value: false,
		});
	const [startTime, setStartTime, clearStartTime] = useBrowserStorage<string>({
		key: `${browserStorageBaseKey}_startTime`,
		value: "",
	});
	const [endTime, setEndTime, clearEndTime] = useBrowserStorage<string>({
		key: `${browserStorageBaseKey}_endTime`,
		value: "",
	});

	// --- HANDLERS ---
	function startSession(): void {
		const shuffledPhrases = shuffleArray(deck.phrases).slice(0, 25);

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
		clearAutoPlayAudio();
		clearShowSentenceByDefault();
		clearShowTranslationByDefault();
		clearStartTime();
		clearEndTime();
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
				autoPlayAudio,
				showSentenceByDefault,
				showTranslationByDefault,
				startTime,
				clearSession,
				markPracticeMore,
				markRecognized,
				setAutoPlayAudio,
				setShowSentenceByDefault,
				setShowTranslationByDefault,
				startSession,
				setPhase,
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
