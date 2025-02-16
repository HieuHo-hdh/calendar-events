import dayjs, { Dayjs } from "dayjs"
import { FC, useContext, useMemo, useRef, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { Button, Select, Tooltip } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { CalendarContext } from "@/context/calendarContext"
import { MONTH_YEAR_DISPLAY_FORMAT } from "@/constants/dateTime.constant"
import { handleParseArrayToLabelValueArray } from "@/utils/array.util"
import { CALENDAR_VIEW, CALENDAR_VIEW_OPTIONS } from "@/constants/calendar.constant"
import CreateEventModal from "@/components/Calendar/Modals/CreateEventModal"
import { mockEvents } from "@/mocks/Events"
import '@/styles/FullCalendar.style.css'
import { EventClickArg } from "@fullcalendar/core/index.js"

const MainCalendar: FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [showCreateEventModal, setShowCreateEventModal] = useState<boolean>(false);
  const [clickedDay, setClickedDay] = useState<Dayjs>(dayjs());

  const context = useContext(CalendarContext);
  if (!context) throw new Error("Context is undefined");
  const { selectedDate, setSelectedDate } = context ?? {};
  
  const currentDate = useMemo(() => {
    return dayjs(selectedDate).format(MONTH_YEAR_DISPLAY_FORMAT);
  }, [selectedDate])

  const handleToday = (): void => {
    if (calendarRef.current) {
      calendarRef.current.getApi().today()
      setSelectedDate(dayjs())
    }
  }

  const handlePrevMonth = (): void => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev()
      const prevMonth = dayjs(selectedDate).add(-1, 'month');
      setSelectedDate(prevMonth)
    }
  }

  const handleNextMonth = (): void => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next()
      const nextMonth = dayjs(selectedDate).add(1, 'month');
      setSelectedDate(nextMonth);
    }
  }

  const handleDateClick = (event: DateClickArg): void => {
    setShowCreateEventModal(true)
    setClickedDay(dayjs(event.date))
  }

  const handleEventClick = (event: EventClickArg): void => {
    const eventInfo = event.event.toJSON()
    console.log('Event detail', eventInfo)
    // TODO: Show event detail and edit
  }

  const handleShowCreateEventModel = (isVisible: boolean) => {
    setShowCreateEventModal(isVisible)
  }

  return (
    <div className="full-calender-component flex flex-col bg-white border-solid border-gray-200 border-2 p-4 flex-auto xl:flex-1 h-[calc(100vh-2rem)] xl:h-[unset] rounded-md">
      <div className="flex sm:flex-row flex-col gap-2 sm:gap-0 mb-4 items-center justify-between">
        <div className="flex flex-row gap-2 md:gap-4">
          <Button type="default" className="border-blue-dark text-blue-dark hover:text-blue-light hover:border-blue-light" onClick={handleToday}>Today</Button>
          <div>
            <Button
              type="link"
              className="text-blue-dark hover:text-blue-light rounded-full"
              size="middle"
              icon={<LeftOutlined className="w-full"/>}
              onClick={handlePrevMonth}
            />
            <Button
              type="link"
              className="text-blue-dark hover:text-blue-light rounded-full"
              size="middle"
              icon={<RightOutlined className="w-full" />}
              onClick={handleNextMonth}
            />
          </div>
          <span className="text-blue-dark font-semibold self-center text-lg">{currentDate}</span>
        </div>
        <div className="flex flex-row gap-1">
          <Tooltip title="Coming soon" placement="bottom">
            <Select title="" variant="outlined" popupClassName="capitalize" className="capitalize border-blue-dark text-blue-dark hover:text-blue-light hover:border-blue-light" value={CALENDAR_VIEW.MONTH} options={handleParseArrayToLabelValueArray(CALENDAR_VIEW_OPTIONS)} />
          </Tooltip>
        </div>
      </div>
      <FullCalendar
        ref={calendarRef}
        height={'100%'}
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={false}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        eventDisplay="list-item"
        dayMaxEvents={true}
        events={mockEvents}
        eventTimeFormat={{
          hour: 'numeric',
          minute: 'numeric',
          meridiem: true,
        }}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      <CreateEventModal open={showCreateEventModal} onCancel={() => handleShowCreateEventModel(false)} clickedDay={clickedDay} />
    </div>
  )
}

export default MainCalendar
