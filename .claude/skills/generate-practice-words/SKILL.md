---
name: generate-practice-words
description: Generate the content for the `practice_words` property for a given text.
disable-model-invocation: true
---

Add words to the 'practice_words' property of a text

1. Ask me for the list of words I want to add
2. Ask me for the ID of the text where I want to generate the 'practice_words' content
3. Generate the required structure for the objects inside the 'practice_words' array. Save the generated content in `src/data/texts.json`. Find the text where the `practice_words` property should be added by using the ID provided in step 2.
   ```
   {
     "word": "<WORD>",
     "translation": "<SPANISH TRANSLATION>",
     "example": "<ENGLISH PHRASE THAT USES THE WORD>"
   }
   ```

You can get the example phrase for a word by checking the content of the text in `src/data/texts/<TEXT ID>.md`
