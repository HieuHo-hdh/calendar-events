import { EVENT_TYPE } from "@/constants/event.constant";
import { Event } from "@/model/event.model";
import dayjs from "dayjs";

export const mockProfile = {
  _id: Math.random().toString(),
  name: 'Alex Stan',
  avatar: 'https://cdn-icons-png.freepik.com/512/1010/1010047.png',
  profileUrl: 'https://cdn-icons-png.freepik.com/512/1010/1010047.png',
}

export const mockEvents: Event[] = [
  {
    _id: Math.random().toString(),
    title: 'First Session with Alex Stan [MOCK]',
    type: EVENT_TYPE.APPOINTMENT,
    start: '2025-02-17T09:00:00.00Z',
    end: '2025-02-17T09:30:00.00Z',
    link: 'https://meet.google.com/landing',
    profile: {
      _id: Math.random().toString(),
      name: 'Alex Stan',
      avatar: 'https://cdn-icons-png.freepik.com/512/1010/1010047.png',
      profileUrl: 'https://cdn-icons-png.freepik.com/512/1010/1010047.png',
    },
    backgroundColor: "#E4F6ED",
    textColor: "black",
    timezone: 'Asia/Bangkok',
  },
  {
    _id: "recur-1",
    title: 'Recurring events [MOCK]',
    type: EVENT_TYPE.APPOINTMENT,
    start: '2025-02-17T09:00:00.00Z',
    end: '2025-02-17T09:30:00.00Z',
    link: 'https://meet.google.com/landing',
    profile: {
      _id: Math.random().toString(),
      name: 'Alex Stan',
      avatar: 'https://cdn-icons-png.freepik.com/512/1010/1010047.png',
      profileUrl: 'https://cdn-icons-png.freepik.com/512/1010/1010047.png',
    },
    backgroundColor: "#E4F6ED",
    textColor: "black",
    timezone: 'Asia/Bangkok',
    recurDetail: {
      parentEventId: "recur-1",
      isRecur: true,
      repeatFrequency: 'daily',
      repeatUntil: dayjs().add(3, 'd').toISOString(),
    }
  },
  {
    _id: Math.random().toString(),
    title: 'Webinar: How to cope with trauma in professional life [MOCK]',
    type: EVENT_TYPE.WEBINAR,
    start: '2026-02-17T09:00:00.00Z',
    end: '2026-02-17T10:30:00.00Z',
    link: 'https://www.eventbrite.sg/',
    timezone: 'Asia/Singapore',
    backgroundColor: "#FFE4C8",
    textColor: "black",
  },
  {
    _id: Math.random().toString(),
    title: 'Long Event [MOCK]',
    type: EVENT_TYPE.APPOINTMENT,
    start: '2025-02-18T09:00:00.00Z',
    end: '2025-02-24T09:30:00.00Z',
    link: 'https://meet.google.com/landing',
    profile: {
      _id: Math.random().toString(),
      name: 'Alex Stan',
      avatar: 'https://cdn-icons-png.freepik.com/512/3530/3530911.png',
      profileUrl: 'https://cdn-icons-png.freepik.com/512/3530/3530911.png',
    },
    timezone: 'Asia/Bangkok',
    backgroundColor: "#E4F6ED",
    textColor: "black",
  },
  {
    _id: Math.random().toString(),
    title: 'Next day [MOCK]',
    type: EVENT_TYPE.WEBINAR,
    start: dayjs().add(1, 'day').toISOString(),
    end: dayjs().add(1, 'day').add(4, 'h').toISOString(),
    link: 'https://www.eventbrite.sg/',
    timezone: 'Asia/Singapore',
    backgroundColor: "#FFE4C8",
    textColor: "black",
  },
]