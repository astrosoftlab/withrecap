export enum ExtensionMessages {
  MeetingMessage = 'MEETING_MESSAGE',
  MeetingMetadata = 'MEETING_METADATA'
}

export interface MeetingMessage {
  speaker: string
  language: string
  text: string
  timestamp: number
}

export interface MeetingMetadata {
  title: string
  nbParticipants: number
  startTimestamp: number
  endTimestamp?: number
}

export interface Meeting {
  meetingId: string
  metadata: MeetingMetadata
  transcription: MeetingMessage[]
}