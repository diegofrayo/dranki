"use client";

import { createContext, useCallback, useContext, useEffect } from "react";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck, DeckPhrase } from "~/api";
import { Sounds, useSound } from "~/features/sounds";
import { useDeckStore } from "~/stores/deck-store";

import type { DeckPhase, PracticeMode } from "../[deck-id].types";
import useDeckSessionState from "./use-deck-session-state";

// --- CONTEXT ---

const DeckSessionContext = createContext<DeckSessionContextValue | null>(null);

// --- PROVIDER ---

type DeckSessionProviderProps = {
	children: ReactTypes.Children;
	deck: Deck;
};

type DeckSessionContextValue = {
	deck: Deck;
	endTime: string;
	currentIndex: number;
	phase: DeckPhase;
	phrases: DeckPhrase[];
	practiceMode: PracticeMode;
	practiceMoreCount: number;
	recognizedCount: number;
	autoPlayAudio: boolean;
	showSentenceByDefault: boolean;
	showTranslationByDefault: boolean;
	startTime: string;
	clearSession: () => void;
	markPracticeMore: (config: { enableSounds: boolean }) => void;
	markRecognized: (config: { enableSounds: boolean }) => void;
	setAutoPlayAudio: (value: boolean) => void;
	setDeckPhase: (value: DeckPhase) => void;
	setPracticeMode: (mode: PracticeMode) => void;
	setShowSentenceByDefault: (value: boolean) => void;
	setShowTranslationByDefault: (value: boolean) => void;
	startSession: () => void;
};

function DeckSessionProvider({ deck, children }: DeckSessionProviderProps): ReactTypes.JSXElement {
	// --- HOOKS ---
	const setDeckInProgress = useDeckStore((store) => store.setDeckInProgress);
	const [playSuccessSound] = useSound(Sounds.SUCCESS);
	const [playErrorSound] = useSound(Sounds.ERROR);
	const [playNotifySound] = useSound(Sounds.NOTIFY);
	const { state, dispatch, cleanStateFromLocalStorage } = useDeckSessionState(deck.id);

	// --- EFFECTS ---
	useEffect(
		function syncDeckInProgress() {
			setDeckInProgress(state.phase === "PRACTICE");
		},
		[state.phase],
	);

	// --- UTILS ---
	const checkIfDeckEnds = useCallback(
		(newIndex: number, totalDeckPhrases: number): void => {
			if (newIndex >= totalDeckPhrases && totalDeckPhrases > 0) {
				dispatch({ type: "DECK_FINISHED" });
				playNotifySound();
			}
		},
		[dispatch, playNotifySound],
	);

	// --- HANDLERS ---
	const startSession: DeckSessionContextValue["startSession"] = useCallback(
		function startSession() {
			dispatch({ type: "START_SESSION", payload: { phrases: shuffleArray(deck.phrases) } });
		},
		[deck, dispatch],
	);

	const markRecognized: DeckSessionContextValue["markRecognized"] = useCallback(
		(config) => {
			const newIndex = state.currentIndex + 1;

			dispatch({ type: "MARK_RECOGNIZED" });
			if (config.enableSounds) playSuccessSound();
			checkIfDeckEnds(newIndex, state.phrases.length);
		},
		[state.currentIndex, state.phrases.length, dispatch, checkIfDeckEnds, playSuccessSound],
	);

	const markPracticeMore: DeckSessionContextValue["markPracticeMore"] = useCallback(
		(config) => {
			const newIndex = state.currentIndex + 1;

			dispatch({ type: "MARK_PRACTICE_MORE" });
			if (config.enableSounds) playErrorSound();
			checkIfDeckEnds(newIndex, state.phrases.length);
		},
		[state.currentIndex, state.phrases.length, dispatch, checkIfDeckEnds, playErrorSound],
	);

	const clearSession: DeckSessionContextValue["clearSession"] = useCallback(() => {
		cleanStateFromLocalStorage();
		dispatch({ type: "CLEAR_SESSION" });
	}, [dispatch, cleanStateFromLocalStorage]);

	const setDeckPhase: DeckSessionContextValue["setDeckPhase"] = useCallback(
		(phase) => {
			dispatch({ type: "SET_DECK_PHASE", payload: phase });
		},
		[dispatch],
	);

	const setPracticeMode: DeckSessionContextValue["setPracticeMode"] = useCallback(
		(mode) => {
			dispatch({
				type: "SET_PRACTICE_MODE",
				payload: mode,
			});
		},
		[dispatch],
	);

	const setAutoPlayAudio: DeckSessionContextValue["setAutoPlayAudio"] = useCallback(
		(value) => {
			dispatch({ type: "SET_AUTO_PLAY_AUDIO", payload: value });
		},
		[dispatch],
	);

	const setShowSentenceByDefault: DeckSessionContextValue["setShowSentenceByDefault"] = useCallback(
		(value) => {
			dispatch({ type: "SET_SHOW_SENTENCE_BY_DEFAULT", payload: value });
		},
		[dispatch],
	);

	const setShowTranslationByDefault: DeckSessionContextValue["setShowTranslationByDefault"] =
		useCallback(
			(value) => {
				dispatch({ type: "SET_SHOW_TRANSLATION_BY_DEFAULT", payload: value });
			},
			[dispatch],
		);

	return (
		<DeckSessionContext.Provider
			value={{
				autoPlayAudio: state.autoPlayAudio,
				currentIndex: state.currentIndex,
				deck,
				endTime: state.endTime,
				phase: state.phase,
				phrases: state.phrases,
				practiceMode: state.practiceMode,
				practiceMoreCount: state.practiceMoreCount,
				recognizedCount: state.recognizedCount,
				showSentenceByDefault: state.showSentenceByDefault,
				showTranslationByDefault: state.showTranslationByDefault,
				startTime: state.startTime,
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
