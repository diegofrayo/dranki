"use client";

import { createContext, useCallback, useContext } from "react";

import { useBrowserStorage } from "@diegofrayo-pkg/browser-storage";
import { useDidMount } from "@diegofrayo-pkg/hooks";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck, DeckPhrase } from "~/api";
import { PROJECT_METADATA } from "~/constants";
import { Sounds, useSound } from "~/features/sounds";
import { useDeckStore } from "~/stores/deck-store";

import type { DeckPhase, DeckSessionContextValue, PracticeMode } from "../../[deck-id].types";

// --- CONTEXT ---

const DeckSessionContext = createContext<DeckSessionContextValue | null>(null);

// --- PROVIDER ---

type DeckSessionProviderProps = {
	children: ReactTypes.Children;
	deck: Deck;
};

// eslint-disable-next-line max-lines-per-function
function DeckSessionProvider({ deck, children }: DeckSessionProviderProps): ReactTypes.JSXElement {
	const browserStorageBaseKey = `${PROJECT_METADATA.appName}_${deck.id}`;

	// --- HOOKS ---
	const setDeckInProgress = useDeckStore((store) => store.setDeckInProgress);
	const [playSuccessSound] = useSound(Sounds.SUCCESS);
	const [playErrorSound] = useSound(Sounds.ERROR);
	const [playNotifySound] = useSound(Sounds.NOTIFY);

	// --- STATES & REFS ---
	const [phase, setDeckPhase, clearPhase] = useBrowserStorage<DeckPhase>({
		key: `${browserStorageBaseKey}_phase`,
		value: "OVERVIEW",
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
	const [startTime, setStartTime, clearStartTime] = useBrowserStorage<string>({
		key: `${browserStorageBaseKey}_startTime`,
		value: "",
	});
	const [endTime, setEndTime, clearEndTime] = useBrowserStorage<string>({
		key: `${browserStorageBaseKey}_endTime`,
		value: "",
	});
	const [practiceMode, setPracticeModeRaw] = useBrowserStorage<PracticeMode>({
		key: `${browserStorageBaseKey}_practiceMode`,
		value: "LISTENING",
	});
	const [autoPlayAudio, setAutoPlayAudio] = useBrowserStorage<boolean>({
		key: `${browserStorageBaseKey}_autoPlayAudio`,
		value: true,
	});
	const [showSentenceByDefault, setShowSentenceByDefault] = useBrowserStorage<boolean>({
		key: `${browserStorageBaseKey}_showSentence`,
		value: false,
	});
	const [showTranslationByDefault, setShowTranslationByDefault] = useBrowserStorage<boolean>({
		key: `${browserStorageBaseKey}_showTranslation`,
		value: false,
	});

	// --- EFFECTS ---
	useDidMount(function syncDeckInProgressOnMount() {
		setDeckInProgress(phase === "PRACTICE");
	});

	// --- HANDLERS ---
	const checkIfDeckEnds = useCallback(
		function checkIfDeckEnds(newIndex: number): void {
			if (newIndex >= phrases.length && phrases.length > 0) {
				setEndTime(new Date().toISOString());
				setDeckPhase("RESULTS");
				setDeckInProgress(false);
				playNotifySound();
			}
		},
		[phrases, setEndTime, setDeckPhase, setDeckInProgress, playNotifySound],
	);

	const startSession: DeckSessionContextValue["startSession"] = useCallback(
		function startSession() {
			const shuffledPhrases = shuffleArray(deck.phrases);

			setPhrases(shuffledPhrases);
			setCurrentIndex(0);
			setRecognizedCount(0);
			setPracticeMoreCount(0);
			setStartTime(new Date().toISOString());
			setEndTime("");
			setDeckPhase("PRACTICE");
			setDeckInProgress(true);
		},
		[
			deck,
			setPhrases,
			setCurrentIndex,
			setRecognizedCount,
			setPracticeMoreCount,
			setStartTime,
			setEndTime,
			setDeckPhase,
			setDeckInProgress,
		],
	);

	const markRecognized: DeckSessionContextValue["markRecognized"] = useCallback(
		function markRecognized(config) {
			const newIndex = currentIndex + 1;
			const newCount = recognizedCount + 1;

			setCurrentIndex(newIndex);
			setRecognizedCount(newCount);
			if (config.enableSounds) playSuccessSound();

			checkIfDeckEnds(newIndex);
		},
		[
			currentIndex,
			recognizedCount,
			setCurrentIndex,
			setRecognizedCount,
			playSuccessSound,
			checkIfDeckEnds,
		],
	);

	const markPracticeMore: DeckSessionContextValue["markPracticeMore"] = useCallback(
		function markPracticeMore(config) {
			const newIndex = currentIndex + 1;
			const newCount = practiceMoreCount + 1;

			setCurrentIndex(newIndex);
			setPracticeMoreCount(newCount);
			if (config.enableSounds) playErrorSound();

			checkIfDeckEnds(newIndex);
		},
		[
			currentIndex,
			practiceMoreCount,
			setCurrentIndex,
			setPracticeMoreCount,
			playErrorSound,
			checkIfDeckEnds,
		],
	);

	const setPracticeMode: DeckSessionContextValue["setPracticeMode"] = useCallback(
		function setPracticeMode(mode) {
			const defaults = PRACTICE_MODE_DEFAULTS[mode];

			setPracticeModeRaw(mode);
			setAutoPlayAudio(defaults.autoPlayAudio);
			setShowSentenceByDefault(defaults.showSentenceByDefault);
			setShowTranslationByDefault(defaults.showTranslationByDefault);
		},
		[setPracticeModeRaw, setAutoPlayAudio, setShowSentenceByDefault, setShowTranslationByDefault],
	);

	const clearSession: DeckSessionContextValue["clearSession"] = useCallback(
		function clearSession() {
			clearCurrentIndex();
			clearEndTime();
			clearPhase();
			clearPhrases();
			clearPracticeMoreCount();
			clearRecognizedCount();
			clearStartTime();
			setDeckInProgress(false);
		},
		[
			clearCurrentIndex,
			clearEndTime,
			clearPhase,
			clearPhrases,
			clearPracticeMoreCount,
			clearRecognizedCount,
			clearStartTime,
			setDeckInProgress,
		],
	);

	return (
		<DeckSessionContext.Provider
			value={{
				autoPlayAudio,
				currentIndex,
				deck,
				endTime,
				phase,
				phrases,
				practiceMode,
				practiceMoreCount,
				recognizedCount,
				showSentenceByDefault,
				showTranslationByDefault,
				startTime,
				clearSession,
				markPracticeMore,
				markRecognized,
				setAutoPlayAudio,
				setDeckPhase,
				setPracticeMode,
				setShowSentenceByDefault,
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

export { DeckSessionProvider, useDeckSession, type PracticeMode };

// --- UTILS ---

function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];

	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j] as T, shuffled[i] as T];
	}

	return shuffled;
}

// --- CONSTANTS ---

const PRACTICE_MODE_DEFAULTS: Record<
	PracticeMode,
	{
		autoPlayAudio: boolean;
		showSentenceByDefault: boolean;
		showTranslationByDefault: boolean;
	}
> = {
	LISTENING: {
		autoPlayAudio: true,
		showSentenceByDefault: false,
		showTranslationByDefault: false,
	},
	VOCABULARY: {
		autoPlayAudio: false,
		showSentenceByDefault: false,
		showTranslationByDefault: true,
	},
	REGULAR: {
		autoPlayAudio: true,
		showSentenceByDefault: true,
		showTranslationByDefault: false,
	},
	CUSTOM: {
		autoPlayAudio: false,
		showSentenceByDefault: false,
		showTranslationByDefault: false,
	},
};
