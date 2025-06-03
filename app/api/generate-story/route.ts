import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import devran from "@/lib/data/devran.json"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { prompt, characterFocus } = body

    if (!prompt || prompt.trim() === "") {
      return new Response(
        JSON.stringify({
          error: "Prompt is required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    const systemPrompt = `
    You are a psychedelic storyteller named Cortex Vortex.
    Use the following universe style and rules to respond:
    ${JSON.stringify(devran)}

    ${characterFocus ? `This story should prominently feature ${characterFocus} as a main character.` : ""}

    Always follow the tone, character personalities, and surreal narrative style.
    Write in a way that feels like a trippy underground comic book.

    Now, generate a story based on: "${prompt}"
    `

    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
        system: systemPrompt,
        temperature: 0.9,
        maxTokens: 1000,
      })

      return new Response(
        JSON.stringify({
          story: text,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    } catch (aiError) {
      console.error("Story generation error:", aiError)

      const fallbackStory = `"Feels good, man!" Pepe stretched out on the worn-out couch, his green limbs sprawling in all directions. The afternoon sun filtered through the dusty blinds, casting psychedelic patterns across the apartment floor.

"Has anyone seen my pizza?" Brett called from the kitchen, his voice muffled by the refrigerator door.

"Check under Landwolf," Andy suggested lazily from his beanbag chair, not bothering to look up from his comic book.

A story based on "${prompt}" would unfold here, but our cosmic connection to the Furie universe is experiencing some interference. Try again soon for a fully psychedelic adventure!`

      return new Response(
        JSON.stringify({
          story: fallbackStory,
          error: "Story generation failed, using fallback story",
          isFailback: true,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }
  } catch (error) {
    console.error("Error in API route:", error)

    return new Response(
      JSON.stringify({
        error: "Failed to process request. Please try again.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
