"use client";

import { withRenderInBrowser } from "@diegofrayo-pkg/hocs";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck } from "~/api";
import { MainLayout } from "~/components/layout";

import DeckOverview from "./components/deck-overview";
import PracticeView from "./components/practice-view";
import ResultsScreen from "./components/results-screen";
import { DeckSessionProvider, useDeckSession } from "./context/deck-session-context";

type DeckPageProps = {
	deck: Deck;
};

function DeckPage({ deck }: DeckPageProps): ReactTypes.JSXElement {
	return (
		<DeckSessionProvider deck={deck}>
			<DeckPageContent />
		</DeckSessionProvider>
	);
}

export default DeckPage;

// --- COMPONENTS ---

const DeckPageContent = withRenderInBrowser(
	function DeckPageContent(): ReactTypes.JSXElementNullable {
		// --- HOOKS ---
		const { phase } = useDeckSession();

		if (phase === "practice") {
			return <PracticeView />;
		}

		return <MainLayout>{phase === "results" ? <ResultsScreen /> : <DeckOverview />}</MainLayout>;
	},
);
