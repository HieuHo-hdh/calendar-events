import { EVENT_TYPE } from "@/constants/event.constant";
import { Event } from "@/model/event.model";
import dayjs from "dayjs";

export const mockEvents: Event[] = [
  {
    _id: Math.random().toString(),
    title: 'First Session with Alex Stan',
    type: EVENT_TYPE.APPOINTMENT,
    start: dayjs().toISOString(),
    end: dayjs().add(0.5, 'hour').toISOString(),
    // date: dayjs().format(DATE_FORMAT),
    link: 'https://meet.google.com/landing',
    profile: {
      _id: Math.random().toString(),
      name: 'Alex Stan',
      avatar: 'https://cdn-icons-png.freepik.com/512/1010/1010047.png',
      profileUrl: 'https://cdn-icons-png.freepik.com/512/1010/1010047.png',
    },
    // recurringEvent: {
    //   isRecurring: true,
    //   repeatDuration: 10,
    //   until: dayjs().add(1, 'week').toISOString()
    // },
  },
  {
    _id: Math.random().toString(),
    title: 'First Session with Alex Stan',
    type: EVENT_TYPE.WEBINAR,
    start: dayjs().toISOString(),
    end: dayjs().add(0.5, 'hour').toISOString(),
    link: 'https://www.eventbrite.sg/',
  },
  {
    _id: Math.random().toString(),
    title: 'Second Session with Alex Stan',
    type: EVENT_TYPE.APPOINTMENT,
    start: dayjs().toISOString(),
    end: dayjs().add(0.5, 'hour').toISOString(),
    link: 'https://meet.google.com/landing',
    profile: {
      _id: Math.random().toString(),
      name: 'Alex Stan',
      avatar: 'https://cdn-icons-png.freepik.com/512/3530/3530911.png',
      profileUrl: 'https://cdn-icons-png.freepik.com/512/3530/3530911.png',
    }
  },
  {
    _id: Math.random().toString(),
    title: 'Third Session with Alex Stan very long description Third Session with Alex Stan very long descriptionThird Session with Alex Stan very long description Third Session with Alex Stan very long description',
    type: EVENT_TYPE.APPOINTMENT,
    start: dayjs().toISOString(),
    end: dayjs().add(0.5, 'hour').toISOString(),
    link: 'https://meet.google.com/landing',
    profile: {
      _id: Math.random().toString(),
      name: 'Alex Stan',
      avatar: 'https://cdn-icons-png.freepik.com/512/3530/3530911.png',
      profileUrl: 'https://cdn-icons-png.freepik.com/512/3530/3530911.png',
    }
  },
  {
    _id: Math.random().toString(),
    title: 'Third Session with Alex Stan',
    type: EVENT_TYPE.APPOINTMENT,
    start: dayjs().toISOString(),
    end: dayjs().add(0.5, 'hour').toISOString(),
    link: 'https://meet.google.com/landing',
    profile: {
      _id: Math.random().toString(),
      name: 'Alex Stan',
      avatar: 'https://cdn-icons-png.freepik.com/512/3530/3530911.png',
      profileUrl: 'https://cdn-icons-png.freepik.com/512/3530/3530911.png',
    }
  }
]