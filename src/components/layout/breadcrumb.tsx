"use client";

import { usePathname } from "next/navigation";

import { Box, Link, Text } from "~/components/primitive";

// --- TYPES ---

type Crumb = { label: string; href: string };

type CrumbLabelProps = {
	crumb: Crumb;
	isLast: boolean;
};

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

// --- SUB-COMPONENTS ---

function CrumbLabel({ crumb, isLast }: CrumbLabelProps) {
	if (isLast) {
		return <Text className="text-foreground font-medium">{crumb.label}</Text>;
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

// --- COMPONENT DEFINITION ---

function Breadcrumb() {
	const pathname = usePathname();

	if (pathname === "/") {
		return null;
	}

	const crumbs = buildCrumbs(pathname);

	// --- STYLES ---
	const classes = {
		nav: "mt-1 flex items-center gap-1 text-sm",
		homeLink: "text-muted-foreground transition-colors hover:text-foreground font-bold",
		crumbItem: "flex items-center gap-1",
		separator: "text-muted-foreground select-none",
	};

	return (
		<Box
			as="nav"
			aria-label="breadcrumb"
			className={classes.nav}
		>
			<Link
				href="/"
				className={classes.homeLink}
			>
				Home
			</Link>
			{crumbs.map((crumb, index) => (
				<Box
					key={crumb.href}
					className={classes.crumbItem}
				>
					<Text className={classes.separator}>›</Text>
					<CrumbLabel
						crumb={crumb}
						isLast={index === crumbs.length - 1}
					/>
				</Box>
			))}
		</Box>
	);
}

export default Breadcrumb;
