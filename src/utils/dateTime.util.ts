import { DATE_FORMAT, DATE_TIME_12HOUR_DISPLAY_FORMAT, DATE_TIME_FORMAT, TIME_12HOUR_DISPLAY_FORMAT, TIMEZONE_DISPLAY_FORMAT } from "@/constants/dateTime.constant";
import { Event } from "@/model/event.model";
import dayjs, { Dayjs } from "dayjs";
import { getDateTimeByTimezone } from "@/utils/timezone.util";

export const handleParseDateTime = (dateTime: Dayjs | string, option?: { toFormat?: string, fromFormat?: string, dateOnly?: boolean }) => {
  const parsedFromFormat = option?.fromFormat || (option?.dateOnly ? DATE_FORMAT : DATE_TIME_FORMAT);
  const parsedToFormat = option?.toFormat || (option?.dateOnly? DATE_FORMAT : DATE_TIME_FORMAT);
  if (typeof dateTime === "string") {
    return dayjs(dateTime, parsedFromFormat).format(parsedToFormat);
  }
  return dateTime.format(parsedToFormat);
}

export const isSameDay = (day1: string | Dayjs, day2: string | Dayjs) => {
  if (!day1 || !day2) return false;
  return dayjs(day1).isSame(day2, 'day');
}

export const isSameTimezone = (day1: string, day2: string) => {
  if (!day1 || !day2) return false;
  return dayjs(day1).format(TIMEZONE_DISPLAY_FORMAT) === dayjs(day2).format(TIMEZONE_DISPLAY_FORMAT);
}

export const handleDisplayEventDuration = (event: Event): string => {
  const eventStart = getDateTimeByTimezone(event.start, event.timezone)
  const eventEnd = getDateTimeByTimezone(event.end, event.timezone)
  const _isSamePeriod = true // TODO: If implement timezone for start and end time separatedly
  const toFormat = isSameDay(eventStart, eventEnd) ? TIME_12HOUR_DISPLAY_FORMAT : DATE_TIME_12HOUR_DISPLAY_FORMAT
  const displayStart = _isSamePeriod 
    ? handleParseDateTime(eventStart, {toFormat}) 
    : `${handleParseDateTime(eventStart, {toFormat})} GMT${handleParseDateTime(eventStart, {toFormat: TIMEZONE_DISPLAY_FORMAT})}`;
  const displayEnd = `${handleParseDateTime(eventEnd, {toFormat})} GMT${handleParseDateTime(eventEnd, {toFormat: TIMEZONE_DISPLAY_FORMAT})}`
  return `${displayStart} - ${displayEnd}`
}