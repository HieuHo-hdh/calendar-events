import { DATE_FORMAT, DATE_TIME_12HOUR_DISPLAY_FORMAT, DATE_TIME_FORMAT, TIME_12HOUR_DISPLAY_FORMAT, TIMEZONE_DISPLAY_FORMAT } from "@/constants/dateTime.constant";
import { Event } from "@/model/event.model";
import dayjs, { Dayjs } from "dayjs";

export const handleParseDateTime = (dateTime: Dayjs | string, option?: { toFormat?: string, fromFormat?: string, dateOnly?: boolean }) => {
  const parsedFromFormat = option?.fromFormat || (option?.dateOnly ? DATE_FORMAT : DATE_TIME_FORMAT);
  const parsedToFormat = option?.toFormat || (option?.dateOnly? DATE_FORMAT : DATE_TIME_FORMAT);
  if (typeof dateTime === "string") {
    return dayjs(dateTime, parsedFromFormat).format(parsedToFormat);
  }
  return dateTime.format(parsedToFormat);
}

export const isSameDay = (day1: string, day2: string) => {
  if (!day1 || !day2) return false;
  return dayjs(day1).isSame(day2, 'day');
}

export const isSameTimezone = (day1: string, day2: string) => {
  if (!day1 || !day2) return false;
  return dayjs(day1).format(TIMEZONE_DISPLAY_FORMAT) === dayjs(day2).format(TIMEZONE_DISPLAY_FORMAT);
}

export const handleDisplayEventDuration = (event: Event): string => {
  const _isSamePeriod = isSameTimezone(event.start, event.end)
  const toFormat = isSameDay(event.start, event.end) ? TIME_12HOUR_DISPLAY_FORMAT : DATE_TIME_12HOUR_DISPLAY_FORMAT
  const displayStart = _isSamePeriod 
    ? handleParseDateTime(event.start, {toFormat}) 
    : `${handleParseDateTime(event.start, {toFormat})} GMT${handleParseDateTime(event.start, {toFormat: TIMEZONE_DISPLAY_FORMAT})}`;
  const displayEnd = `${handleParseDateTime(event.end, {toFormat})} GMT${handleParseDateTime(event.end, {toFormat: TIMEZONE_DISPLAY_FORMAT})}`
  return `${displayStart} - ${displayEnd}`
}