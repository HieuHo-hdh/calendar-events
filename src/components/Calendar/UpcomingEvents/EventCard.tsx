import { FC, useMemo } from "react"
import { Button, Tooltip } from "antd"
import { VideoCameraOutlined } from "@ant-design/icons"
import { Event } from "@/model/event.model"
import { handleDisplayEventDuration } from "@/utils/dateTime.util"
import { EVENT_TYPE } from "@/constants/event.constant"

type EventCardProps = {
  event: Event
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  const displayDuration = useMemo(() => handleDisplayEventDuration(event), [event.start, event.end])
  const handleOpenLink = (link: string): void => {
    window.open(link, '_blank');
  };

  return (
    <div className="rounded-lg p-4" style={{ backgroundColor: event.backgroundColor || "#FFE4C8" }}>
      <div className="flex flex-row justify-between items-start gap-2">
        <div className="flex flex-col items-start text-left gap-1">
          <Tooltip title={event.title}>
            <span className="line-clamp-2 text-blue-dark font-semibold">{event.title}</span>
          </Tooltip>
          <span className="text-sm text-blue-light">
            {displayDuration}
          </span>
        </div>
        {
          event.type === EVENT_TYPE.APPOINTMENT && event?.link && (
            <Button onClick={() => handleOpenLink(event.link!)} type="primary" className="bg-blue-dark hover:bg-blue-light min-w-10 rounded-full" size="large" icon={<VideoCameraOutlined className="w-full"/>}  />
          )
        }
      </div>
      {
        event.type === EVENT_TYPE.APPOINTMENT && (
          <div className="flex flex-row mt-2 gap-2">
            <img src={event?.profile?.avatar} alt="img" className="w-6 rounded-full"/>
            <a href={event?.profile?.profileUrl} className="underline cursor-pointer" target="_blank" rel="noopener noreferrer">View Client Profile</a>
          </div>
        )
      }

    </div>
  )
}

export default EventCard
