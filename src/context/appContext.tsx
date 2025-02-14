import { createContext, FC, ReactNode, useState } from "react";

type AppContextType = {
  selectedDate: Date | undefined;
  setSelectedDate: (value: Date) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppContextProps = {
  children: ReactNode
}

const AppProvider: FC<AppContextProps> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  return <AppContext.Provider
    value={{ selectedDate, setSelectedDate }}
  >
    {children}
  </AppContext.Provider>
};

export { AppContext, AppProvider };