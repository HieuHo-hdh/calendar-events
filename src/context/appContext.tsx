import { mockEvents } from "@/mocks/Events.mock";
import { Event } from "@/model/event.model";
import { appReducer } from "@/reducer/appReducer";
import { createContext, FC, ReactNode, useReducer } from "react";

type AppContextType = {
  state: {
    events: Event[]
  };
  dispatch: (action: { 
    type: string,
    newEvent: Event,
    updateEvent: Event,
    deleteEventId: string,
  }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppContextProps = {
  children: ReactNode
}

const AppProvider: FC<AppContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, { events: mockEvents });

  return <AppContext.Provider value={{ state, dispatch }}>
    {children}
  </AppContext.Provider>
};

export { AppContext, AppProvider };