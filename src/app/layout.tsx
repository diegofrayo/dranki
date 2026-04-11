import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const nunito = Nunito({
	subsets: ["latin"],
	weight: ["400", "600", "700", "800"],
	variable: "--font-nunito",
});

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${nunito.variable} font-sans antialiased`}>
				{children}
				{process.env.NODE_ENV === "production" && <Analytics />}
			</body>
		</html>
	);
}
