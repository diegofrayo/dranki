"use client";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, InlineText, Paragraph, Title } from "~/components/primitive";

export default function ColorsPage(): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		page: "min-h-screen p-6 bg-background",
		header: "mb-8",
		groupWrapper: "mb-10",
		groupLabel:
			"text-foreground mb-3 block text-sm font-semibold uppercase tracking-widest opacity-50",
		grid: cn("grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3"),
	};

	return (
		<Box className={classes.page}>
			<Box className={classes.header}>
				<Title
					as="h1"
					className="text-foreground text-2xl font-bold"
				>
					Color Palette
				</Title>
				<Paragraph className="text-muted-foreground mt-1 text-sm">
					CSS custom property tokens
				</Paragraph>
			</Box>

			{COLOR_GROUPS.map((group) => (
				<Box
					key={group.label}
					className={classes.groupWrapper}
				>
					<InlineText className={classes.groupLabel}>{group.label}</InlineText>
					<Box className={classes.grid}>
						{group.tokens.map((token) => (
							<ColorSwatch
								key={token.variable}
								token={token}
							/>
						))}
					</Box>
				</Box>
			))}
		</Box>
	);
}

// --- CONSTANTS ---

const COLOR_GROUPS: ColorGroup[] = [
	{
		label: "Base",
		tokens: [
			{ name: "background", variable: "--background", foreground: "--foreground" },
			{ name: "foreground", variable: "--foreground" },
		],
	},
	{
		label: "Brand",
		tokens: [
			{ name: "primary", variable: "--primary", foreground: "--primary-foreground" },
			{ name: "primary-foreground", variable: "--primary-foreground" },
			{ name: "secondary", variable: "--secondary", foreground: "--secondary-foreground" },
			{ name: "secondary-foreground", variable: "--secondary-foreground" },
			{ name: "accent", variable: "--accent", foreground: "--accent-foreground" },
			{ name: "accent-foreground", variable: "--accent-foreground" },
		],
	},
	{
		label: "UI",
		tokens: [
			{ name: "card", variable: "--card", foreground: "--card-foreground" },
			{ name: "card-foreground", variable: "--card-foreground" },
			{ name: "popover", variable: "--popover", foreground: "--popover-foreground" },
			{ name: "popover-foreground", variable: "--popover-foreground" },
			{ name: "muted", variable: "--muted", foreground: "--muted-foreground" },
			{ name: "muted-foreground", variable: "--muted-foreground" },
		],
	},
	{
		label: "State",
		tokens: [
			{ name: "destructive", variable: "--destructive", foreground: "--destructive-foreground" },
			{ name: "destructive-foreground", variable: "--destructive-foreground" },
		],
	},
	{
		label: "Form",
		tokens: [
			{ name: "border", variable: "--border" },
			{ name: "input", variable: "--input" },
			{ name: "ring", variable: "--ring" },
		],
	},
];

// --- TYPES ---

type ColorToken = {
	name: string;
	variable: string;
	foreground?: string;
};

type ColorGroup = {
	label: string;
	tokens: ColorToken[];
};

// --- COMPONENTS ---

type ColorSwatchProps = {
	token: ColorToken;
};

function ColorSwatch({ token }: ColorSwatchProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		swatch: "flex flex-col overflow-hidden rounded-lg border border-border",
		swatchColor: "relative h-16 w-full",
		swatchSample: "absolute inset-0 flex items-center justify-center text-xs font-medium",
		swatchLabel: "bg-card px-2 py-1.5",
		swatchName: "text-foreground block truncate text-xs font-medium",
		swatchVar: "text-muted-foreground block truncate text-[10px]",
	};

	return (
		<Box className={classes.swatch}>
			<Box
				className={classes.swatchColor}
				style={{ backgroundColor: `var(${token.variable})` }}
			>
				{token.foreground ? (
					<InlineText
						className={classes.swatchSample}
						style={{ color: `var(${token.foreground})` }}
					>
						Aa
					</InlineText>
				) : null}
			</Box>
			<Box className={classes.swatchLabel}>
				<InlineText className={classes.swatchName}>{token.name}</InlineText>
				<InlineText className={classes.swatchVar}>{token.variable}</InlineText>
			</Box>
		</Box>
	);
}
