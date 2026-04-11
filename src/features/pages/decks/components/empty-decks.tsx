import { Icon, IconCatalog } from "~/components/primitive/icon";

export function EmptyDecks() {
	return (
		<div className="flex flex-col items-center justify-center px-4 py-16 text-center">
			<div className="bg-primary/10 mb-4 flex h-20 w-20 items-center justify-center rounded-full">
				<Icon
					name={IconCatalog.BOOK_OPEN}
					className="text-primary size-10"
				/>
			</div>
			<h3 className="text-foreground mb-2 text-xl font-bold">No decks yet</h3>
			<p className="text-muted-foreground max-w-xs">
				Create your first deck to start practicing English phrases!
			</p>
		</div>
	);
}
