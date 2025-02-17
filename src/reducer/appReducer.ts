import { Event } from "@/model/event.model";

export enum STORE_ACTIONS {
  CREATE_EVENT = 'create',
  UPDATE_EVENT = 'update',
  DELETE_EVENT = 'delete',
}

export const appReducer = (
  state: { events: Event[] }, 
  action: { 
    type: string,
    newEvent: Event,
    updateEvent: Event,
    deleteEventId: string,
  }
) => {
  switch (action.type) {
    case STORE_ACTIONS.CREATE_EVENT:
      return { events: [...state.events, action.newEvent ] };
    case STORE_ACTIONS.UPDATE_EVENT: {
      const updatedEvents = state.events.map((event) =>
        event._id === action.updateEvent._id? action.updateEvent : event
      );
      return { events: updatedEvents };
    }
    case STORE_ACTIONS.DELETE_EVENT:
      return { events: state.events.filter((event) => event._id === action.deleteEventId)};
    default:
      return state;
  }
};