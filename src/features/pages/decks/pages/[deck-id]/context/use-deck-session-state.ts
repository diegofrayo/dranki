import { useCallback, useEffect, useReducer, type ActionDispatch } from "react";

import { isServer } from "@diegofrayo-pkg/validator";

import type { DeckPhrase } from "~/api";

import type { DeckPhase } from "../[deck-id].types";
import type { PracticeMode } from "./deck-session-context";

type UseDeckSessionStateReturn = {
	state: DeckSessionState;
	dispatch: ActionDispatch<[action: DeckSessionAction]>;
	cleanStateFromLocalStorage: () => void;
};

export default function useDeckSessionState(deckId: string): UseDeckSessionStateReturn {
	// --- COMPUTED STATES ---
	const localStorageKey = `dranki_deck_config:${deckId}`;

	// --- STATES & REFS ---
	const [state, dispatch] = useReducer(deckSessionReducer, deckId, getInitialStateFromStorage);

	function getInitialStateFromStorage(): typeof INITIAL_STATE {
		if (isServer()) return INITIAL_STATE;

		try {
			const stored = window.localStorage.getItem(localStorageKey);
			const output = stored ? (JSON.parse(stored) as typeof INITIAL_STATE) : INITIAL_STATE;

			return output;
		} catch (e) {
			console.log(e);
			return INITIAL_STATE;
		}
	}

	// --- EFFECTS ---
	useEffect(
		function persistStateToLocalStorage() {
			window.localStorage.setItem(localStorageKey, JSON.stringify(state));
		},
		[localStorageKey, state],
	);

	// --- ACTIONS ---
	const cleanStateFromLocalStorage = useCallback(() => {
		window.localStorage.removeItem(localStorageKey);
	}, [localStorageKey]);

	return { state, dispatch, cleanStateFromLocalStorage };
}

// --- CONSTANTS ---

const INITIAL_STATE: DeckSessionState = {
	autoPlayAudio: true,
	currentIndex: 0,
	endTime: "",
	phase: "OVERVIEW",
	phrases: [],
	practiceMode: "LISTENING",
	practiceMoreCount: 0,
	recognizedCount: 0,
	showSentenceByDefault: false,
	showTranslationByDefault: false,
	startTime: "",
};

const PRACTICE_MODE_DEFAULTS = {
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
} as const;

// --- REDUCER ---

function deckSessionReducer(state: DeckSessionState, action: DeckSessionAction): DeckSessionState {
	switch (action.type) {
		case "START_SESSION": {
			return {
				...state,
				currentIndex: 0,
				endTime: "",
				phase: "PRACTICE",
				phrases: action.payload.phrases,
				practiceMoreCount: 0,
				recognizedCount: 0,
				startTime: new Date().toISOString(),
			};
		}

		case "MARK_RECOGNIZED": {
			const newIndex = state.currentIndex + 1;
			const isComplete = newIndex >= state.phrases.length && state.phrases.length > 0;

			return {
				...state,
				currentIndex: newIndex,
				recognizedCount: state.recognizedCount + 1,
				...(isComplete && { endTime: new Date().toISOString(), phase: "RESULTS" }),
			};
		}

		case "MARK_PRACTICE_MORE": {
			const newIndex = state.currentIndex + 1;
			const isComplete = newIndex >= state.phrases.length && state.phrases.length > 0;

			return {
				...state,
				currentIndex: newIndex,
				practiceMoreCount: state.practiceMoreCount + 1,
				...(isComplete && { endTime: new Date().toISOString(), phase: "RESULTS" }),
			};
		}

		case "CLEAR_SESSION": {
			return INITIAL_STATE;
		}

		case "SET_DECK_PHASE": {
			return { ...state, phase: action.payload };
		}

		case "SET_PRACTICE_MODE": {
			return {
				...state,
				...PRACTICE_MODE_DEFAULTS[action.payload],
				practiceMode: action.payload,
			};
		}

		case "SET_AUTO_PLAY_AUDIO": {
			return { ...state, autoPlayAudio: action.payload };
		}

		case "SET_SHOW_SENTENCE_BY_DEFAULT": {
			return { ...state, showSentenceByDefault: action.payload };
		}

		case "SET_SHOW_TRANSLATION_BY_DEFAULT": {
			return { ...state, showTranslationByDefault: action.payload };
		}

		case "DECK_FINISHED": {
			return { ...state, endTime: new Date().toISOString(), phase: "RESULTS" };
		}

		default:
			return state;
	}
}

// --- TYPES ---

type DeckSessionState = {
	autoPlayAudio: boolean;
	currentIndex: number;
	endTime: string;
	phase: DeckPhase;
	phrases: DeckPhrase[];
	practiceMode: PracticeMode;
	practiceMoreCount: number;
	recognizedCount: number;
	showSentenceByDefault: boolean;
	showTranslationByDefault: boolean;
	startTime: string;
};

type DeckSessionAction =
	| { type: "START_SESSION"; payload: { phrases: DeckPhrase[] } }
	| { type: "MARK_RECOGNIZED" }
	| { type: "MARK_PRACTICE_MORE" }
	| { type: "CLEAR_SESSION" }
	| { type: "SET_DECK_PHASE"; payload: DeckPhase }
	| {
			type: "SET_PRACTICE_MODE";
			payload: PracticeMode;
	  }
	| { type: "SET_AUTO_PLAY_AUDIO"; payload: boolean }
	| { type: "SET_SHOW_SENTENCE_BY_DEFAULT"; payload: boolean }
	| { type: "SET_SHOW_TRANSLATION_BY_DEFAULT"; payload: boolean }
	| { type: "DECK_FINISHED" };
