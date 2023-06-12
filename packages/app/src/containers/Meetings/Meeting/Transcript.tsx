import React, { useEffect, useRef, useState } from 'react'

import { Meeting, MeetingAttendee, Message, getTimeDiff } from '@recap/shared'

import { ThumbsDown, ThumbsUp } from '../../../components/buttons'
import UserAvatar from '../../../components/display/UserAvatar'

import check from '../../../assets/img/check.svg'
import listInCircle from '../../../assets/img/listInCircle.svg'
import star4 from '../../../assets/img/star4.svg'

interface Props {
  meeting: Meeting
}

export default function Transcript({ meeting: { start, end, conversation, attendees } }: Props) {
  const [like, setLike] = useState(0)

  function onSetLike(v: 1 | -1 | 0) {
    setLike(v)
  }

  return (
    <div className="sm:mb-[82px] mb-[60px]">
      <div className="flex justify-between sm:mb-[34px] mb-[24px] select-none">
        <div className="flex gap-[12px]">
          <img src={listInCircle} alt="" />
          <div className="font-semibold">Transcript</div>
          <div className="font-semibold text-gray-500">{getTimeDiff(start, end)}</div>
        </div>
        {/** TODO: Display thumbs up/down once we allow feature */}
        {/**  <div className="flex gap-[12px]"> */}
        <div className="hidden">
          <ThumbsDown checked={like === -1} onClick={() => onSetLike(-1)} />
          <ThumbsUp checked={like === 1} onClick={() => onSetLike(1)} />
        </div>
      </div>
      <div className="flex flex-col sm:gap-[40px] gap-[30px] relative">
        {
          <SelectionPopup
            selectionClassName="selection"
            multipleSelection={false}
            offsetToTop={5}
            metaAttrName="data-meta"
            onSelect={console.debug}
          >
            <div className="px-[8px] py-[6px] bg-black text-white text-[15px] rounded-[30px] flex items-center gap-[10px]">
              <button className="flex items-center gap-[6px]">
                <img src={star4} alt="" />
                Highlight
              </button>
              <div className="w-[2px] bg-[#ffffff26] h-[16px]"></div>
              <button className="flex items-center gap-[6px]">
                <img src={check} alt="" />
                Add to Todo
              </button>
            </div>
          </SelectionPopup>
        }
        {(conversation || []).map((msg, key) => (
          <TranscriptItem key={key} msg={msg} attendees={Object.values(attendees)} />
        ))}
      </div>
    </div>
  )
}

const TranscriptItem = ({ msg, attendees }: { msg: Message; attendees: MeetingAttendee[] }) => {
  const getAvatar = (speaker: string): string | undefined => {
    return attendees.find((a) => a.name === speaker)?.avatar
  }

  return (
    <div className="flex sm:gap-[16px] gap-[12px]">
      <UserAvatar
        name={msg.speaker}
        avatar={getAvatar(msg.speaker)}
        className="sm:w-[24px] sm:h-[24px] w-[18px] h-[18px] sm:text-[10px] text-[7px]"
      />
      <div className="flex flex-col sm:gap-[10px] gap-[6px]">
        <div className="font-semibold select-none">{msg.speaker}</div>
        <div className="text-gray-500 selection" data-meta={JSON.stringify(msg)}>
          {msg.text}
        </div>
      </div>
    </div>
  )
}

interface SelectionPopupProps {
  /**
   * This function is called when a user selects texts in html.
   * @param text - The text of the selection
   * @param meta - Additional metadata associated with the selected text (optional)
   */
  onSelect?: (text: string, meta?: string | number | boolean | object) => void
  /**
   * The child elements to be displayed within the popup component.
   */
  children: React.ReactNode
  /**
   * The className to be used to identify selectable element(s).
   */
  selectionClassName: string
  /**
   * Whether multiple elements can be selected at once (default is false).
   */
  multipleSelection?: boolean
  /**
   * The name of the metadata attribute associated with the selected text (optional).
   * The metadata value should be JSON stringfied.
   * @example <div ... className="selection" metaAttrName="data-meta">...</div>
   * ...
   * <SelectionPopup ... data-meta={JSON.stringfy(data)}>...</SelectionPopup>
   */
  metaAttrName?: string
  /**
   * The offset (in pixels) to the left direction of the screen to reposition the popup. The default pivot x is right of the pop.
   */
  offsetToLeft?: number
  /**
   * The offset (in pixels) to the top direction of the screen to reposition the popup. The default pivot y is bottom of the pop.
   */
  offsetToTop?: number
}

type Size = {
  /**
   * The width of the element in pixels.
   */
  width: number
  /**
   * The height of the element in pixels.
   */
  height: number
}

type Position = {
  /**
   * The x-coordinate of the upper-left corner of the element.
   */
  x: number
  /**
   * The y-coordinate of the upper-left corner of the element.
   */
  y: number
}

const SelectionPopup = ({
  onSelect,
  children,
  selectionClassName,
  multipleSelection = true,
  metaAttrName,
  offsetToLeft = 0,
  offsetToTop = 0
}: SelectionPopupProps) => {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })
  const [position, setPosition] = useState<Position | null>(null)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.addEventListener('mouseup', (e: any) => {
      const selection = window.getSelection()
      if (selection !== null) {
        const { anchorNode, focusNode } = selection

        if (anchorNode !== null && focusNode !== null) {
          if (anchorNode.parentElement !== null && anchorNode.parentElement.classList.contains(selectionClassName)) {
            const text = selection.toString()
            const meta = e.target.getAttribute(metaAttrName)

            if (text) {
              if (selection.rangeCount !== 0) {
                if (anchorNode.isEqualNode(focusNode) || multipleSelection) {
                  const range = selection.getRangeAt(0)

                  const { right: x, top: y } = range.getBoundingClientRect()

                  // TODO: position {x, y} should come from the first line of selection

                  setPosition({ x, y })
                  onSelect?.(text, meta)

                  return
                } else {
                  selection.removeAllRanges()
                }
              }
            }
          }
        }

        setPosition(null)
      }
    })

    window.addEventListener('mousedown', (e) => {
      const selection = window.getSelection()

      let node: HTMLElement | null = e.target as HTMLElement

      // Check if the target div is popup which is the exception case
      while (node != null) {
        if (node === ref.current) {
          return
        }

        node = node.parentNode as HTMLElement
      }

      if (selection !== null) {
        selection.removeAllRanges()
      }

      setPosition(null)
    })

    window.addEventListener('scroll', () => {
      setPosition(null)
    })
  }, [onSelect, multipleSelection, selectionClassName, metaAttrName])

  useEffect(() => {
    if (ref.current) {
      const width = ref.current.offsetWidth
      const height = ref.current.offsetHeight

      setSize({ width, height })
    }
  }, [children, position])

  if (position === null) return <></>

  const left = position.x - size.width - offsetToLeft
  const top = position.y - size.height - offsetToTop

  return (
    <div style={{ position: 'fixed', left, top }}>
      <div ref={ref}>{children}</div>
    </div>
  )
}
