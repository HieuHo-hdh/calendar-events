import { RECUR_EVENT_TYPE } from "@/constants/event.constant"
import { Event } from "@/model/event.model"
import dayjs, { ManipulateType } from "dayjs"

export const handleGenerateUnitByFrequency = (frequency: string): string => {
  switch (frequency) {
    case RECUR_EVENT_TYPE.DAILY:
      return "d"
    case RECUR_EVENT_TYPE.WEEKLY:
      return "w"
    case RECUR_EVENT_TYPE.MONTHLY:
      return "M"
    case RECUR_EVENT_TYPE.YEARLY:
      return "y"
    default:
      return "d"
  }
}

export const handleGenerateRecurringEvents = (event: Event) => {
  if (!event?.recurDetail?.isRecur) return []
  const until = event.recurDetail.repeatUntil
  const unit = handleGenerateUnitByFrequency(event.recurDetail.repeatFrequency)
  let currentStart = dayjs(event.start)
  let currentEnd = dayjs(event.end)
  let newEvents: Event[] = []
  while (dayjs(currentStart).isBefore(until)) {
    newEvents = [...newEvents, {...event, _id: Math.random().toString(), start: currentStart.toISOString(), end: currentEnd.toISOString()}]
    currentStart = dayjs(currentStart).add(1, unit as ManipulateType)
    currentEnd = dayjs(currentEnd).add(1, unit as ManipulateType)
  }
  return newEvents
}