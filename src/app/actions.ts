"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { CreateDeckInput, Deck } from "@/lib/types"

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export async function getDecks(): Promise<Deck[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("decks")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching decks:", error)
    return []
  }

  return data as Deck[]
}

export async function getDeckBySlug(slug: string): Promise<Deck | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("decks")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching deck:", error)
    return null
  }

  return data as Deck
}

export async function createDeck(input: CreateDeckInput): Promise<{ success: boolean; deck?: Deck; error?: string }> {
  const supabase = await createClient()
  
  const baseSlug = generateSlug(input.title)
  let slug = baseSlug
  let counter = 1
  
  // Check for existing slug and generate unique one
  while (true) {
    const { data: existing } = await supabase
      .from("decks")
      .select("id")
      .eq("slug", slug)
      .single()
    
    if (!existing) break
    slug = `${baseSlug}-${counter}`
    counter++
  }

  const { data, error } = await supabase
    .from("decks")
    .insert({
      slug,
      title: input.title,
      description: input.description || null,
      emoji: input.emoji || "📚",
      color: input.color || "#58CC02",
      phrases: input.phrases,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating deck:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/", "max")
  return { success: true, deck: data as Deck }
}

export async function deleteDeck(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("decks")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting deck:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/", "max")
  return { success: true }
}
