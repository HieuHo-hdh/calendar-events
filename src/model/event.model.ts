import { EVENT_TYPE } from "@/constants/event.constant";
import { Profile } from "@/model/profile.model";

export type Event = {
  _id: string;
  title: string;
  type: EVENT_TYPE;
  backgroundColor?: string;
  textColor?: string;
  start: string;
  end: string;
  timezone: string;
  link?: string;
  profile?: Profile;

  // recurring events
  recurDetail?: RecurDetail;
}

export type RecurDetail = {
  isRecur?: boolean;
  parentEventId: string;
  repeatFrequency: string; // How often an event will run again. For example: daily, weekly, monthly, yearly. Will pass a number as total duration
  repeatUntil: string;
}