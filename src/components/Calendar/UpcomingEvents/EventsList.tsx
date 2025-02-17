import { FC, useContext } from "react"
import EventCard from "@/components/Calendar/UpcomingEvents/EventCard"
import { AppContext } from "@/context/appContext";

const EventsList: FC = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("Context is undefined");
  const { state: { events } } = appContext ?? {};

  return (
    <div className="flex-1 flex flex-col gap-4 overflow-auto">
      {events.map((event) => <EventCard event={event} key={event._id}/>)}
    </div>
  )
}

export default EventsList
