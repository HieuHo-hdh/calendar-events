import { Event } from "@/model/event.model";

export enum STORE_ACTIONS {
  CREATE_EVENT = 'create',
  CREATE_EVENTS = 'create_events',
  UPDATE_EVENT = 'update',
  DELETE_EVENT = 'delete',
  DELETE_EVENTS = 'delete_events',
}

export const appReducer = (
  state: { events: Event[] },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any,
) => {
  switch (action.type) {
    case STORE_ACTIONS.CREATE_EVENT:
      return { events: [...state.events, action.newEvent ] };
    case STORE_ACTIONS.CREATE_EVENTS:
      return { events: [...state.events, ...action.newEvents ] };
    case STORE_ACTIONS.UPDATE_EVENT: {
      const updatedEvents = state.events.map((event) =>
        event._id === action?.updateEvent?._id? action.updateEvent : event
      );
      return { events: updatedEvents };
    }
    case STORE_ACTIONS.DELETE_EVENT: {
      return { events: state.events.filter((event) => event?._id !== action?.deleteEventId)};
    }
    case STORE_ACTIONS.DELETE_EVENTS: {
      return { events: state.events.filter((event) => {
        return event?.recurDetail?.parentEventId !== action?.deleteRecurredEventId
      })};
    }
    default:
      return state;
  }
};