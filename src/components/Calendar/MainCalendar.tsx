import dayjs from "dayjs"
import { FC, useContext, useMemo, useRef } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { Button, Select, Tooltip } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { CalendarContext } from "@/context/calendarContext"
import { MONTH_YEAR_DISPLAY_FORMAT } from "@/constants/dateTime.constant"
import { handleParseArrayToLabelValueArray } from "@/utils/array.util"
import { CALENDAR_VIEW, CALENDAR_VIEW_OPTIONS } from "@/constants/calendar.constant"

const MainCalendar: FC = () => {
  const calendarRef = useRef<FullCalendar>(null);

  const context = useContext(CalendarContext);
  if (!context) throw new Error("Context is undefined");
  const { selectedDate, setSelectedDate } = context ?? {};
  
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

  const currentDate = useMemo(() => {
    return dayjs(selectedDate).format(MONTH_YEAR_DISPLAY_FORMAT);
  }, [selectedDate])

  const handleDateClick = (event: DateClickArg): void => {
    // TODO: Show modal here
    console.log('Clicked on: ', event.date)
  }

  return (
    <div className="full-calender-component flex flex-col bg-white border-solid border-gray-200 border-2 p-4 flex-auto xl:flex-1 h-[calc(100vh-2rem)] xl:h-[unset] rounded-md">
      <div className="flex flex-row mb-4 items-center justify-between">
        <div className="flex flex-row gap-4">
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
        <span className="text-blue-dark font-semibold text-lg">{currentDate}</span>
        </div>
        <Tooltip title="This feature is coming soon" placement="leftBottom">
          <Select variant="outlined" popupClassName="capitalize" className="capitalize border-blue-dark text-blue-dark hover:text-blue-light hover:border-blue-light" value={CALENDAR_VIEW.MONTH} options={handleParseArrayToLabelValueArray(CALENDAR_VIEW_OPTIONS)} />
        </Tooltip>
      </div>
      <FullCalendar
        ref={calendarRef}
        height={'100%'}
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={false}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={[]}
        dateClick={handleDateClick}
      />
    </div>
  )
}

export default MainCalendar
