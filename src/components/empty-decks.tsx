import { BookOpen } from "lucide-react"

export function EmptyDecks() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <BookOpen className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">No decks yet</h3>
      <p className="text-muted-foreground max-w-xs">
        Create your first deck to start practicing English phrases!
      </p>
    </div>
  )
}
