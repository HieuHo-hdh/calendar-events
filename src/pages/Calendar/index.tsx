import { FC } from "react"
import Events from "@/components/Calendar/SubCalendar"
import MainCalendar from "@/components/Calendar/MainCalendar"

const CalendarPage: FC = () => {
  return (
    <div className="min-w-[280px] flex flex-col-reverse xl:flex-row xl:p-6 p-4 gap-4 xl:h-screen h-full xl:w-screen w-full">
      <Events />
      <MainCalendar />
    </div>
  )
}

export default CalendarPage
