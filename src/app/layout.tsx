import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Nunito as CustomFont } from "next/font/google";

import cn from "@diegofrayo-pkg/cn";

import "./globals.css";

type RootLayoutProps = Readonly<{
	children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
	const styles = {
		body: cn(`font-sans antialiased`, customFont.variable),
	};
	return (
		<html lang="en">
			<body className={styles.body}>
				{children}
				{process.env.NODE_ENV === "production" && <Analytics />}
			</body>
		</html>
	);
}

// --- FONTS ---

const customFont = CustomFont({
	subsets: ["latin"],
	weight: ["400", "600", "700", "800"],
	variable: "--font-nunito",
});

// --- METADATA ---

export const metadata: Metadata = {
	title: "dranki - Learn English Phrases",
	description: "A fun, mobile-first app to practice English phrases with swipeable flashcards",
	generator: "v0.app",
	icons: {
		icon: [
			{
				url: "/icon-light-32x32.png",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/icon-dark-32x32.png",
				media: "(prefers-color-scheme: dark)",
			},
			{
				url: "/icon.svg",
				type: "image/svg+xml",
			},
		],
		apple: "/apple-icon.png",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: "#58CC02",
};
