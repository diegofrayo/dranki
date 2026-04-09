export interface Phrase {
  english: string
  japanese: string
}

export interface Deck {
  id: string
  slug: string
  title: string
  description: string | null
  emoji: string
  color: string
  phrases: Phrase[]
  created_at: string
  updated_at: string
}

export interface CreateDeckInput {
  title: string
  description?: string
  emoji?: string
  color?: string
  phrases: Phrase[]
}
