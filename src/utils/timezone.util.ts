import { ALL_TIMEZONES } from "@/constants/timezone.constant";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

export const getDateTimeByTimezone = (dateTime: string | Dayjs, timezone: string) => {
  return dayjs(dateTime).tz(timezone);
}

// America/Toronto -> -05:00
const getTimezoneNumber = (timezone: string) => {
  return dayjs().tz(timezone).format("Z");
}

export const handleParseTimezoneToLabelValueArray = (): Array<{
  label: string;
  value: string;
}> => {
  return ALL_TIMEZONES?.map((_value: string) => {
    return { label: `${_value} (${getTimezoneNumber(_value)})`, value: _value };
  })
}