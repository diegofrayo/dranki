---
name: generate-deck
description: Creates a new English phrase deck from user-provided words or expressions by generating example phrases, Spanish translations, and usage explanations, then automatically saving the deck files and metadata into the project structure.
disable-model-invocation: true
---

Create a phrase deck using the provided words or expressions.

## User Input

- Ask the user for:
  - The list of words or expressions
  - The deck name

## Requirements

- Generate **5 phrases** for each word or expression provided by the user.
- Save the generated phrases in the following file:

```txt
src/data/decks/<deck-name>.json
```

- `<deck-name>` must be the user-provided deck name converted to **kebab-case**.

## Phrase Structure

Each generated phrase must follow this structure:

```json
{
	"sentence": "<Phrase in English>",
	"translation": "<Phrase translated into Spanish>",
	"explanation": "<A brief explanation about in which cases the main word could be used: Examples: 'Stay: Use it when referring to being in a specific place, a temporary residence, or maintaining a physical/mental state.' | 'Keep: Use it when referring to possessing an object, maintaining a condition/habit, or continuing an action' | 'Big: A general, everyday term for something of great size, volume, or mass. It is largely conversational.'>"
}
```

## Additional Requirement

- Add the deck metadata to:

```txt
src/data/decks.json
```

- Include the new deck in the existing list of decks.
