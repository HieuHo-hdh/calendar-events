import { mockEvents } from "@/mocks/Events"
import { FC } from "react"
import EventCard from "./EventCard"

const EventsList: FC = () => {
  
  return (
    <div className="flex-1 flex flex-col gap-4 overflow-auto">
      {mockEvents.map((event) => <EventCard event={event} key={event._id}/>)}
    </div>
  )
}

export default EventsList
