import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, Paragraph, Separator, Switch } from "~/components/primitive";

type SettingsProps = {
	autoPlayAudio: boolean;
	isCustomMode: boolean;
	showSentenceByDefault: boolean;
	showTranslationByDefault: boolean;
	onAutoPlayAudioChange: (checked: boolean) => void;
	onSentenceChange: (checked: boolean) => void;
	onTranslationChange: (checked: boolean) => void;
};

function Settings({
	autoPlayAudio,
	isCustomMode,
	showSentenceByDefault,
	showTranslationByDefault,
	onAutoPlayAudioChange,
	onSentenceChange,
	onTranslationChange,
}: SettingsProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		sectionLabel: "text-foreground mb-3 text-xs font-semibold uppercase tracking-wider mt-1",
		togglesWrapper: cn("flex flex-col gap-0 transition-opacity"),
		toggleRow: "flex items-center justify-between gap-3",
		toggleTextsWrapper: cn({ "opacity-50": !isCustomMode }),
		toggleLabel: "text-foreground text-sm font-semibold",
		toggleDescription: "text-muted-foreground mt-0.5 text-xs",
	};

	return (
		<>
			<Paragraph className={classes.sectionLabel}>Settings</Paragraph>
			<Box className={classes.togglesWrapper}>
				<Box className={classes.toggleRow}>
					<Box className={classes.toggleTextsWrapper}>
						<Paragraph className={classes.toggleLabel}>Auto-play audio</Paragraph>
						<Paragraph className={classes.toggleDescription}>
							Play phrase audio automatically when a card appears
						</Paragraph>
					</Box>
					<Switch
						className="shrink-0"
						checked={autoPlayAudio}
						disabled={!isCustomMode}
						onCheckedChange={onAutoPlayAudioChange}
					/>
				</Box>

				<Separator className="bg-border my-4 h-px" />

				<Box className={classes.toggleRow}>
					<Box className={classes.toggleTextsWrapper}>
						<Paragraph className={classes.toggleLabel}>Show sentence</Paragraph>
						<Paragraph className={classes.toggleDescription}>Show sentence by default</Paragraph>
					</Box>
					<Switch
						className="shrink-0"
						checked={showSentenceByDefault}
						disabled={!isCustomMode}
						onCheckedChange={onSentenceChange}
					/>
				</Box>

				<Separator className="bg-border my-4 h-px" />

				<Box className={classes.toggleRow}>
					<Box className={classes.toggleTextsWrapper}>
						<Paragraph className={classes.toggleLabel}>Show translation</Paragraph>
						<Paragraph className={classes.toggleDescription}>
							Show Spanish translation by default
						</Paragraph>
					</Box>
					<Switch
						className="shrink-0"
						checked={showTranslationByDefault}
						disabled={!isCustomMode}
						onCheckedChange={onTranslationChange}
					/>
				</Box>
			</Box>
		</>
	);
}

export default Settings;
