import { FC } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const MainCalendar: FC = () => {
  return (
    <div className="full-calender-component flex flex-col bg-white border-solid border-gray-200 border-2 p-4 flex-auto xl:flex-1 h-[calc(100vh-2rem)] xl:h-[unset] rounded-md">
      <FullCalendar
        height={'100%'}
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={false}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={[]}
      />
    </div>
  )
}

export default MainCalendar
