import { EVENT_TYPE } from "@/constants/event.constant";
import { Profile } from "@/model/profile.model";

export type Event = {
  _id: string;
  title: string;
  type: EVENT_TYPE;
  backgroundColor?: string;
  subBackgroundColor?: string;

  // date: string;
  start: string;
  end: string;

  link?: string;
  profile?: Profile;

  // recurring events
  recurringEvent?: EventRecurring;
}

export type EventRecurring = {
  isRecurring?: boolean;
  repeatFrequency?: string; // How often an event will run again. For example: daily, weekly, monthly, yearly. Will pass a number as total duration
  repeatPeriod?: number;
  // repeatDuration?: number; // How long an event will run again. For example: daily, weekly, monthly, yearly.
  // endDate?: string; // When the recurring event will stop. If it's not provided, the recurring event will run indefinitely.
}