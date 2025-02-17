import { FC, useMemo } from "react"
import { Tooltip } from "antd"
import { Event } from "@/model/event.model"
import { handleDisplayEventDuration } from "@/utils/dateTime.util"
import { EVENT_TYPE } from "@/constants/event.constant"

type EventCardProps = {
  event: Event
}

const EventDetailCard: FC<EventCardProps> = ({ event }) => {
  const displayDuration = useMemo(() => handleDisplayEventDuration(event), [event.start, event.end])
  return (
    <div className="rounded-lg p-4" style={{ backgroundColor: event.backgroundColor || "#FFE4C8" }}>
      <div className="flex flex-col items-start text-left gap-2">
        <Tooltip title={event.title}>
          <span className="line-clamp-2 text-blue-dark font-semibold">{event.title}</span>
        </Tooltip>
        <span className="text-sm text-blue-light">
          {displayDuration}
        </span>
      </div>
      {
        event.type === EVENT_TYPE.APPOINTMENT && event?.link && (
          <a href={event.link!} className="text-blue-dark hover:text-blue-light underline cursor-pointer" target="_blank" rel="noopener noreferrer">{event.link!}</a>
        )
      }
      {
        event.type === EVENT_TYPE.APPOINTMENT && (
          <div className="flex flex-row mt-2 gap-2">
            <img src={event?.profile?.avatar} alt="img" className="w-6 rounded-full"/>
            <a href={event?.profile?.profileUrl} className="underline cursor-pointer" target="_blank" rel="noopener noreferrer">{event?.profile?.name}</a>
          </div>
        )
      }
    </div>
  )
}

export default EventDetailCard
