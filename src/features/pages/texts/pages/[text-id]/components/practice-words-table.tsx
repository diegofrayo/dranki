"use client";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Text } from "~/api";
import { SectionCard } from "~/components/common";
import { Box, Button, Icon, IconCatalog, Separator } from "~/components/primitive";
import { useSpeechSynthesis } from "~/features/voice-settings";

type PracticeWordsTableProps = {
	practiceWords: Text["practiceWords"];
};

function PracticeWordsTable({
	practiceWords,
}: PracticeWordsTableProps): ReactTypes.JSXElementNullable {
	// --- STYLES ---
	const classes = {
		tableWrapper: "border-border bg-background rounded-md border overflow-x-auto relative",
		table: "w-full border-collapse text-left text-sm",
		th: "bg-muted/50 text-black border-border border-b px-3 py-2 font-bold", // nth-3:min-w-48
		td: "border-border align-top border-b px-3 py-2", // nth-3:min-w-48
		word: "text-foreground font-medium",
		translation: "text-muted-foreground",
		example: "text-foreground italic",
		actionCell: "w-12 text-center",
	};

	if (practiceWords.length === 0) return null;

	return (
		<>
			<Separator className="bg-border my-16" />
			<SectionCard title="Practice">
				<Box className={classes.tableWrapper}>
					<table className={classes.table}>
						<thead>
							<tr>
								<th className={classes.th}>Word</th>
								<th className={classes.th}>Translation</th>
								<th className={classes.th}>Example</th>
								<th className={cn(classes.th, classes.actionCell)}>
									<span className="sr-only">Play</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{practiceWords.map((item) => (
								<PracticeWordRow
									key={item.word}
									example={item.example}
									translation={item.translation}
									word={item.word}
									classes={classes}
								/>
							))}
						</tbody>
					</table>
				</Box>
			</SectionCard>
		</>
	);
}

export default PracticeWordsTable;

// --- COMPONENTS ---

type PracticeWordRowProps = {
	classes: {
		actionCell: string;
		example: string;
		td: string;
		translation: string;
		word: string;
	};
	example: string;
	translation: string;
	word: string;
};

function PracticeWordRow({
	classes,
	example,
	translation,
	word,
}: PracticeWordRowProps): ReactTypes.JSXElement {
	// --- HOOKS ---
	const { isPlaying, toggle } = useSpeechSynthesis({ text: word });

	// --- HANDLERS ---
	function handleTogglePlayClick(): void {
		toggle();
	}

	return (
		<tr>
			<td className={cn(classes.td, classes.word)}>{word}</td>
			<td className={cn(classes.td, classes.translation)}>{translation}</td>
			<td className={cn(classes.td, classes.example)}>{example}</td>
			<td className={cn(classes.td, classes.actionCell)}>
				<Button
					variant="GHOST"
					size="ICON_SM"
					aria-label={isPlaying ? `Stop ${word}` : `Play ${word}`}
					onClick={handleTogglePlayClick}
				>
					<Icon
						name={isPlaying ? IconCatalog.SQUARE : IconCatalog.VOLUME}
						size={18}
					/>
				</Button>
			</td>
		</tr>
	);
}
