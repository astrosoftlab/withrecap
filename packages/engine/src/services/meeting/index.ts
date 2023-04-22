import { Meeting, MeetingMetadata } from '@recap/shared'
import { format } from 'date-fns'
import { BASE_URL } from '../../config'

export class MeetingService {
  constructor(private meeting: Meeting) {}

  public metadata(): Omit<MeetingMetadata, 'percentage'> {
    const startTime = format(new Date(this.meeting.start), 'h:mm a')
    const endTime = format(new Date(this.meeting.end), 'h:mm a')

    const metadata: Omit<MeetingMetadata, 'percentage'> = {
      participants: this.meeting.attendees?.length || 1,
      title: this.meeting.title,
      start: startTime,
      end: endTime,
      url: `${BASE_URL}/meetings/${this.meeting.mid}`
    }

    return metadata
  }
}