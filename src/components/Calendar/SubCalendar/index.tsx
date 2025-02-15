import { Calendar } from "antd"
import { FC } from "react"
import UpcomingEvents from "../UpcomingEvents"

const SubCalendar: FC = () => {
  return (
    <div className="flex flex-col gap-4 min-w-[unset] xl:w-[400px] w-full">
      <Calendar fullscreen={false} className="border-b-2 border-solid border-gray-200" mode="month" />
      <UpcomingEvents />
    </div>
  )
}

export default SubCalendar
