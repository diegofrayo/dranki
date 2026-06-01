import { create } from "zustand";

type DeckStoreState = {
	deckInProgress: boolean;
	setDeckInProgress: (value: boolean) => void;
};

const useDeckStore = create<DeckStoreState>((set) => ({
	deckInProgress: false,
	setDeckInProgress: (value): void => set({ deckInProgress: value }),
}));

export { useDeckStore };
