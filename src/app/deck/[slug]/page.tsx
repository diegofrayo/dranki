import { notFound } from "next/navigation"
import { getDeckBySlug } from "@/app/actions"
import { PracticeView } from "@/components/practice-view"

interface DeckPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: DeckPageProps) {
  const { slug } = await params
  const deck = await getDeckBySlug(slug)
  
  if (!deck) {
    return { title: "Deck not found - dranki" }
  }

  return {
    title: `${deck.emoji} ${deck.title} - dranki`,
    description: deck.description || `Practice ${deck.phrases.length} English phrases`,
  }
}

export default async function DeckPage({ params }: DeckPageProps) {
  const { slug } = await params
  const deck = await getDeckBySlug(slug)

  if (!deck) {
    notFound()
  }

  if (deck.phrases.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <span className="text-6xl mb-4 block">{deck.emoji}</span>
          <h1 className="text-xl font-bold text-foreground mb-2">{deck.title}</h1>
          <p className="text-muted-foreground">This deck has no phrases yet.</p>
        </div>
      </div>
    )
  }

  return <PracticeView deck={deck} />
}
