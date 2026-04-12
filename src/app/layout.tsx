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
				url: "/favicon/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png",
			},
			{
				url: "/favicon/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png",
			},
			{
				url: "/favicon/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				url: "/favicon/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
		apple: "/favicon/apple-touch-icon.png",
		shortcut: "/favicon/favicon.ico",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: "#58CC02",
};
