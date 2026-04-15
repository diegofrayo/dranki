"use client";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, Link, Paragraph } from "~/components/primitive";
import { Routes } from "~/constants";
import { useRouter } from "~/features/router";

// --- COMPONENT DEFINITION ---

function Breadcrumb(): ReactTypes.JSXElementNullable {
	// --- HOOKS ---
	const { pathname } = useRouter();

	// --- COMPUTED STATES ---
	const crumbs = buildCrumbs(pathname);

	// --- STYLES ---
	const classes = {
		nav: "mt-1 flex items-center gap-1 text-sm",
		homeLink: "text-muted-foreground transition-colors hover:text-foreground font-bold",
		crumbItem: (isLast: boolean): string =>
			cn("flex items-center gap-1", isLast && "min-w-0 flex-1"),
		separator: "text-muted-foreground select-none",
	};

	if (pathname === Routes.INDEX) {
		return null;
	}

	return (
		<Box
			as="nav"
			aria-label="breadcrumb"
			className={classes.nav}
		>
			<Link
				href={Routes.INDEX}
				className={classes.homeLink}
			>
				Home
			</Link>
			{crumbs.map((crumb, index) => {
				const isLast = index === crumbs.length - 1;

				return (
					<Box
						key={crumb.href}
						className={classes.crumbItem(isLast)}
					>
						<Paragraph className={classes.separator}>›</Paragraph>
						<CrumbLabel
							crumb={crumb}
							isLast={isLast}
						/>
					</Box>
				);
			})}
		</Box>
	);
}

export default Breadcrumb;

// --- COMPONENTS ---

type CrumbLabelProps = {
	crumb: Crumb;
	isLast: boolean;
};

function CrumbLabel({ crumb, isLast }: CrumbLabelProps): ReactTypes.JSXElement {
	if (isLast) {
		return <Paragraph className="text-foreground truncate font-medium">{crumb.label}</Paragraph>;
	}

	return (
		<Link
			href={crumb.href}
			className="text-muted-foreground hover:text-foreground font-bold transition-colors"
		>
			{crumb.label}
		</Link>
	);
}

// --- TYPES ---

type Crumb = { label: string; href: string };

// --- UTILS ---

function formatSegment(segment: string): string {
	return segment
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

function buildCrumbs(pathname: string): Crumb[] {
	const segments = pathname.split("/").filter(Boolean);

	return segments.map((segment, index) => ({
		label: formatSegment(segment),
		href: "/" + segments.slice(0, index + 1).join("/"),
	}));
}
