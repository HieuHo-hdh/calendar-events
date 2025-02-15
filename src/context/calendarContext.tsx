import dayjs, { Dayjs } from "dayjs";
import { createContext, FC, ReactNode, useState } from "react";

type CalendarContextType = {
  selectedDate: Dayjs | undefined;
  setSelectedDate: (value: Dayjs | undefined) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

type CalendarContextProps = {
  children: ReactNode
}

const CalendarContextProvider: FC<CalendarContextProps> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>(dayjs())

  return <CalendarContext.Provider
    value={{ selectedDate, setSelectedDate }}
  >
    {children}
  </CalendarContext.Provider>
};

export { CalendarContext, CalendarContextProvider };