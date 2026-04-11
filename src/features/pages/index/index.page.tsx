export default async function HomePage() {
	return (
		<main className="min-h-screen pb-24">
			{/* Header */}
			<header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
				<div className="max-w-md mx-auto px-4 py-4">
					<h1 className="text-2xl font-extrabold text-foreground">dranki</h1>
					<p className="text-sm text-muted-foreground">Practice English phrases</p>
				</div>
			</header>

			{/* Content */}
			<div className="max-w-md mx-auto px-4 py-6"></div>
		</main>
	);
}
