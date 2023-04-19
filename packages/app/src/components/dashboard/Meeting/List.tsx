import { Meeting, getFormattedDate } from '@recap/shared'
import { format } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'

import exitArrow from '../../../assets/img/exit-arrow-right.svg'
import purpleMessage from '../../../assets/img/purpleMessage.svg'

import { MEETINGS } from '../../../constants/routes'

interface Props {
  meetingsByDate: { [date: string]: Meeting[] }
}

export default function Index({ meetingsByDate }: Props) {
  return (
    <>
      {Object.entries(meetingsByDate).map(([date, meetings], key) => {
        const formattedDate = getFormattedDate(date)

        return (
          <div key={key}>
            <div className="flex gap-[24px] sm:mb-[54px] mb-[40]">
              <div className="flex items-center gap-[8px] font-semibold">
                <div className="text-[15px]">{formattedDate.weekDay}</div>
                <div className="text-[12px] px-[4px] py-[2px] bg-gray-100 text-gray-500 rounded-[6px]">
                  {formattedDate.day}
                </div>
                <div className="text-gray-300">•</div>
                <div className="text-[15px]">{formattedDate.relativeDate}</div>
              </div>
              <div className="flex items-center grow">
                <hr />
              </div>
            </div>
            <div className="flex flex-col sm:gap-[54px] gap-[40px]">
              {meetings.map((meeting, key) => (
                <div className="group flex flex-col gap-[12px]" key={key}>
                  <div className="flex items-center gap-[12px]">
                    <img src={purpleMessage} alt="" />
                    <div className="font-semibold text-purple-500">
                      {meeting.attendees?.length > 2 ? 'Conference' : '1:1'}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Link to={`${MEETINGS}/${meeting.mid}`} className="sm:text-[20px] text-[15px] font-semibold">
                      {meeting.title}
                    </Link>
                    <Link
                      to={`${MEETINGS}/${meeting.mid}`}
                      className="rounded-full w-[40px] h-[40px] flex justify-center items-center bg-gray-100 group-hover:visible invisible"
                    >
                      <img src={exitArrow} alt="" />
                    </Link>
                  </div>
                  <div className="text-[15px] font-semibold flex items-center text-gray-500">
                    <div className="mr-[16px]">
                      {format(new Date(meeting.start), 'h:mm a')} - {format(new Date(meeting.end), 'h:mm a')}
                    </div>
                    <div className="flex mr-[8px]">
                      {/** TODO: Should display a letter if avatar is null */}
                      {meeting.attendees.map((attendee, key) => (
                        <img
                          key={key}
                          src={attendee.avatar}
                          alt=""
                          className="w-[28px] h-[28px] rounded-full border-solid border-[4px] border-white first:ml-0 ml-[-8px]"
                        />
                      ))}
                    </div>
                    <div>{meeting.attendees.map((attendee) => attendee.name).join(', ')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </>
  )
}
