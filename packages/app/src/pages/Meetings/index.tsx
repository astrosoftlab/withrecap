import React from 'react'

import { getUserFirstName } from '@recap/shared'
import { useAuth } from '../../auth/AuthProvider'
import Meetings from '../../components/dashboard/Meeting/List'
import MeetingTimeSaved from '../../components/dashboard/Meeting/MeetingTimeSaved'
import Layout from '../../components/layouts'
import { useMeetings } from '../../hooks/meetings'

export default function Index() {
  const { user } = useAuth()
  const { meetingsByDate, loading } = useMeetings()

  return (
    <Layout isLoading={loading}>
      {Object.keys(meetingsByDate).length && (
        <div className="container-sm sm:mb-[160px] mb-[120px] sm:py-[82px] py-[60px]">
          <div className="flex gap-[20px] sm:mb-[80px] mb-[60px]">
            <img src={`${user.photoURL}`} alt="" className="w-[64px] h-[64px] rounded-full" />
            <div className="">
              <div className="sm:text-[24px] text-[18px] font-semibold mb-[8px]">
                Afternoon, {getUserFirstName(user)}!
              </div>
              <MeetingTimeSaved />
            </div>
          </div>
          <div className="flex flex-col sm:gap-[52px] gap-[40px]">
            <Meetings meetingsByDate={meetingsByDate} />
          </div>
        </div>
      )}
    </Layout>
  )
}
