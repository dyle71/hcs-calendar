import { Temporal } from "@js-temporal/polyfill";

enum WeekDay {
  unknown,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
}

export function getTenseByDate(date: Temporal.PlainDate): string {
  const comparison = Temporal.PlainDate.compare(
    date,
    Temporal.Now.plainDateISO()
  );
  return ["past", "present", "future"][comparison + 1];
}

export function getTenseByDateTime(date: Temporal.PlainDateTime): string {
  const comparison = Temporal.PlainDate.compare(
    date,
    Temporal.Now.plainDateTimeISO()
  );
  return ["past", "present", "future"][comparison + 1];
}

export function getWeekDayString(date: Temporal.PlainDate): string {
  return WeekDay[date.dayOfWeek];
}
