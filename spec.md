### **UI Prompt: English Phrase Practice App**

Implement a UI for practicing English phrases from a phrase deck. The phrases should be displayed as swipeable cards, similar to Tinder.

The UI has **three main states**:

---

### **1. Deck Overview State**
When the deck is opened, the user should see:
- Deck information: emoji, name, description, and total number of phrases
- An option to configure whether translations are:
  - visible by default, or
  - hidden until the user presses a button
- A **“Start”** button to begin the practice session

---

### **2. Practice State**
After the user presses the **Start** button:
- Phrases are shown one by one as swipeable cards
- The phrase text should be large and be the main focus of the card

**Card features:**
- A button to play the phrase using system text-to-speech
  *(implementation can be added later — for now, only create the button)*
- When audio is playing:
  - the button icon should change to a **“Stop”** icon
- Translation behavior:
  - If enabled by default → show translation below the phrase
  - If disabled → show a button:
    **“Tap to show translation”**
    - When pressed, reveal the translation with an animation

**Swipe interactions (Tinder-style):**
- Swipe left → mark as **“Recognized”**
- Swipe right → mark as **“Practice more”**

**Alternative controls:**
- Two buttons at the bottom:
  - “Recognized”
  - “Practice more”
  *(These perform the same actions as swiping)*

**Progress tracking:**
- A progress bar at the top that fills as the user progresses
- Next to the bar, show progress text (e.g., `10/20`)
- Inside the progress bar, display the percentage (e.g., `57%`), centered horizontally

---

### **3. Results State**
After all cards are completed, show a results screen with:
- Start date and time
- End date and time
- Total time spent (in minutes)
- Number of phrases marked as:
  - “Recognized”
  - “Practice more”
- A congratulatory message for completing the deck

---

### **Important Requirements**
- Manage UI state using **React Context** to avoid prop drilling
- Instead of `useState`, use a custom hook: `useBrowserStorage` (localStorage-based)
- When the deck is completed:
  - clear all stored state from localStorage
- If the user refreshes the page:
  - restore the session and show the last viewed card
- Phrases must appear in **random order** (not fixed)
- Use animations — the experience should feel fun and engaging (similar to Duolingo)
- Use the existing components from `src/components` and the tailwind classes. If you need new components, try to get them from `@base-ui/react`, otherwise, just let me know if you installed a library
- This UI should be implemented for `src/features/pages/decks/pages/[deck-id]/decks.[deck-id].page.tsx` page