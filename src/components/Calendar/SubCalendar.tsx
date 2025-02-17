import { FC, useContext } from "react"
import dayjs, { Dayjs } from "dayjs"
import { Button, Calendar, DatePicker } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import UpcomingEvents from "@/components/Calendar/UpcomingEvents"
import { SHORT_MONTH_YEAR_DISPLAY_FORMAT } from "@/constants/dateTime.constant"
import { CalendarContext } from "@/context/calendarContext"

const SubCalendar: FC = () => {
  const context = useContext(CalendarContext);
  if (!context) throw new Error("Context is undefined");
  const { selectedDate, setSelectedDate } = context ?? {};

  const handleHeaderPrev = (day: Dayjs, onChange: (date: Dayjs) => void) => {
    const prevMonth = day.add(-1, 'month');
    onChange(prevMonth);
  }

  const handleHeaderNext = (day: Dayjs, onChange: (date: Dayjs) => void) => {
    const prevMonth = day.add(1, 'month');
    onChange(prevMonth);
  }

  return (
    <div className="flex flex-col gap-4 min-w-[unset] xl:w-[400px] w-full">
      <Calendar
        fullscreen={false}
        className={`border-b-2 border-solid border-gray-200 sub-calendar`} 
        onSelect={(date: Dayjs, { source }:{ source: string }) => {
          if (source === 'date') setSelectedDate(date)
        }}
        headerRender={({ value, onChange }: {value: Dayjs, onChange: (date: Dayjs) => void}) => {
          return <div className="flex items-center justify-between p-4">
            <Button
              size="middle"
              className="text-blue-dark hover:text-blue-light rounded-full"
              icon={<LeftOutlined className="w-full"/>}
              onClick={() => handleHeaderPrev(value, onChange)}
            />
            <DatePicker
              allowClear={false}
              className="text-lg text-blue-dark font-semibold"
              picker="month"
              value={dayjs(value)}
              defaultValue={dayjs(selectedDate)}
              format={SHORT_MONTH_YEAR_DISPLAY_FORMAT} 
              onChange={(newMonth: Dayjs): void => onChange(newMonth)}
            />
            <Button
              size="middle"
              className="text-blue-dark hover:text-blue-light rounded-full"
              icon={<RightOutlined className="w-full"/>}
              onClick={() => handleHeaderNext(value, onChange)}
            />
          </div>
        }}
      />
      <UpcomingEvents />
    </div>
  )
}

export default SubCalendar
