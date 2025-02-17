import { handleParseDateTime } from "@/utils/dateTime.util"
import { Button, Tooltip } from "antd"
import dayjs from "dayjs"
import { FC } from "react"
import EventsList from "@/components/Calendar/UpcomingEvents/EventsList"

const UpcomingEvents: FC = () => {
  const today = dayjs()
  return (
    <div className="flex-1 flex flex-col bg-white p-4 rounded-md overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="text-blue-dark text-xl font-bold">Upcoming Events</h3>
        <Tooltip title="Coming soon">
          <Button type="primary" className="bg-blue-dark rounded-full text-xs cursor-not-allowed">View All</Button>
        </Tooltip>
      </div>
      <h4 className="text-left text-md font-medium text-gray-500 my-2">Today, {handleParseDateTime(today, {toFormat: "D MMM"})}</h4>
      <EventsList />
    </div>
  )
}

export default UpcomingEvents
