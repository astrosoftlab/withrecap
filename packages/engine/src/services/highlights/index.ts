import * as Sentry from '@sentry/node'
import { Timestamp } from 'firebase-admin/firestore'
import { OpenAIApi } from 'openai'
import { v4 as uuid } from 'uuid'

import { Highlights, StoredHighlights } from '@recap/shared'

import { error } from '../../utils/logger'
import { TranscriptService } from '../transcript'

export class MeetingHighlights {
  constructor(private api: OpenAIApi, private transcript: TranscriptService) {}

  public async build(): Promise<StoredHighlights> {
    const transcript = this.transcript.toString()
    const content = `
      Extract around 6 relevant highlights from the following transcript.
      
      Return the answer as a JSON object using this format:

        "highlights": [{
          "email": string,
          "speaker": string,
          "text": string
        }...]

      Format the text property in markdown adding bold emphasis on the most relevant part of the highlight.

      Transcript:

        ${transcript}

      End of transcript`

    const response = await this.api.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content
        }
      ],
      temperature: 0,
      max_tokens: 500, // Limits the highlights to 500 words
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0
    })

    try {
      const content = response.data.choices?.[0].message?.content

      if (!content) {
        return {}
      }

      const { highlights } = JSON.parse(content) as { highlights: Highlights }

      const formatted: StoredHighlights = {}
      for (const highlight of highlights) {
        const id = uuid()
        formatted[id] = {
          email: highlight.email,
          speaker: highlight.speaker,
          text: highlight.text,
          created: Timestamp.fromDate(new Date()) as any,
          updated: Timestamp.fromDate(new Date()) as any
        }
      }

      return formatted
    } catch (err) {
      error('An error occurred while formatting highlights')
      Sentry.captureException(new Error('An error occurred while formatting highlights'))
    }

    return {}
  }
}
