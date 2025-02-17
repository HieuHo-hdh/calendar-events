export enum EVENT_TYPE {
  APPOINTMENT = 'appointment',
  WEBINAR = 'webinar',
}

export const EVENT_TYPES = [
  EVENT_TYPE.APPOINTMENT,
  EVENT_TYPE.WEBINAR
]

export enum RECUR_EVENT_TYPE {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY ='monthly',
  YEARLY = 'yearly',
}

export const RECUR_EVENT_TYPES = [
  RECUR_EVENT_TYPE.DAILY,
  RECUR_EVENT_TYPE.WEEKLY,
  RECUR_EVENT_TYPE.MONTHLY,
  RECUR_EVENT_TYPE.YEARLY,
]