import { calendar_v3 } from 'googleapis'

import { Meeting } from '../../firestore/meetings'

const GOOGLE_CALENDAR_BASE_URL = 'https://www.googleapis.com/calendar/v3'

type ResponseData = {
  items: calendar_v3.Schema$Event[]
}

export class GoogleCalendar {
  constructor(private identityToken: string) {}

  public async getMeetingDetails(mid: string): Promise<Meeting | undefined> {
    // TODO: For now we fetch the events of the day
    const beginningOfDay = new Date()
    const endOfDay = new Date()

    beginningOfDay.setHours(0, 0, 0, 0)
    endOfDay.setHours(23, 59, 59, 999)

    const response = await fetch(
      `${GOOGLE_CALENDAR_BASE_URL}/calendars/primary/events?timeMin=${beginningOfDay.toISOString()}&timeMax=${endOfDay.toISOString()}&singleEvents=true`,
      {
        headers: {
          Authorization: `Bearer ${this.identityToken}`
        }
      }
    )

    const data: ResponseData = await response.json()

    const event = data.items.find((calendar) => calendar.hangoutLink?.includes(mid))

    return this.toMeeting(event, mid)
  }

  private toMeeting(event: calendar_v3.Schema$Event | undefined, mid: string): Meeting | undefined {
    if (!event) {
      return undefined
    }

    const attendees =
      event.attendees?.reduce((acc, obj) => {
        const { email, displayName } = obj

        acc[email!] = {
          email: email!,
          name: displayName || ''
        }

        return acc
      }, {} as Meeting['attendees']) || {}

    // adding creator to the list of attendees if not already there
    if (event.creator) {
      attendees[event.creator.email!] = {
        email: event.creator.email!,
        name: event.creator.displayName || ''
      }
    }

    const emails: string[] = []
    for (const email of Object.keys(attendees)) {
      emails.push(email)
    }

    return {
      mid,
      id: event.id!,
      attendees: attendees,
      emails: emails,
      start: event.start!.dateTime!,
      end: event.end!.dateTime!,
      link: event.hangoutLink!,
      title: event.summary || 'Untitled',
      description: event.description || 'This meeting has no description',
      conversation: [],
      processed: false
    }
  }
}
