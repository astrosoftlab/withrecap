import { differenceInSeconds, isThisWeek, secondsToHours } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'

import { useAuthGuard } from '../auth/AuthGuard'
import { Meeting, MeetingStore } from '../storage/meetings'
import { UserMeetingStore } from '../storage/users/meetings'
import { useErrors } from './error'

type MeetingByDate = { [date: string]: Meeting[] }

export function useMeetings() {
  const { user } = useAuthGuard()
  const { error, setError } = useErrors(null)

  const userMeetingStore = useMemo(() => new UserMeetingStore(user.email), [user.email])

  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [meetingsByDate, setMeetingsByDate] = useState<MeetingByDate>({})
  const [weekSaveHours, setWeekSaveHours] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    userMeetingStore
      .list()
      .then((m) => {
        setMeetings(m)
        setError(null)
      })
      .catch((err: Error) => setError({ message: 'An error occurred while fetching the meetings', err }))
      .finally(() => setLoading(false))
  }, [userMeetingStore, setError])

  useEffect(() => {
    try {
      let saveTime = 0

      const byDate: { [date: string]: Meeting[] } = {}

      for (const meeting of meetings) {
        if (!byDate[meeting.start]) {
          byDate[meeting.start] = []
        }

        if (isThisWeek(new Date(meeting.start))) {
          saveTime += differenceInSeconds(new Date(meeting.end), new Date(meeting.start))
        }

        byDate[meeting.start].push(meeting)
      }

      setMeetingsByDate(byDate)
      setWeekSaveHours(secondsToHours(saveTime))
      setError(null)
    } catch (err) {
      setError({ message: 'An error occurred while processing meeting information', err: err as Error })
    }
  }, [meetings, setError])

  return {
    meetings,
    meetingsByDate,
    weekSaveHours,
    loading,
    error
  }
}

export function useMeeting(mid: string) {
  const meetingStore = useMemo(() => new MeetingStore(), [])
  const { error, setError } = useErrors(null)

  const [data, setData] = useState<Meeting>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    meetingStore
      .get(mid)
      .then((meeting) => {
        setData(meeting)
        setError(null)
      })
      .catch((err: Error) => setError({ message: 'An error occurred while fetching meeting information', err }))
      .finally(() => setLoading(false))
  }, [meetingStore, mid, setError])

  return { meeting: data, loading, error }
}

export function useRecentMeeting() {
  const { user } = useAuthGuard()
  const { error, setError } = useErrors(null)

  const userMeetingStore = useMemo(() => new UserMeetingStore(user.email), [user.email])

  const [recentMeeting, setRecentMeeting] = useState<Meeting | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    userMeetingStore
      .recent()
      .then((m) => {
        setRecentMeeting(m)
        setError(null)
      })
      .catch((err: Error) => setError({ message: 'An error occurred while fetching meeting information', err }))
      .finally(() => setLoading(false))
  }, [userMeetingStore, setError])

  return {
    recentMeeting,
    loading,
    error
  }
}
