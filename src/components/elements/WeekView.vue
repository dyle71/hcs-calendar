<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import DayColumnHeader from "@/components/elements/DayColumnHeader.vue";
import WeekLabel from "@/components/elements/WeekLabel.vue";

const MAX_DAYS_VISIBLE = 28;

interface Props {
  datetime: Temporal.PlainDateTime;
  firstDay?: "float" | "firstDayOfWeek";
  weekStart?: number;
  days?: number;
  dayLightStart?: Temporal.PlainTime;
  dayLightEnd?: Temporal.PlainTime;
}
const props = withDefaults(defineProps<Props>(), {
  firstDay: "firstDayOfWeek",
  weekStart: 1,
  days: 7,
  dayLightStart: Temporal.PlainTime.from({ hour: 6 }),
  dayLightEnd: Temporal.PlainTime.from({ hour: 19 }),
});

interface DayInformation {
  day: Temporal.PlainDate;
}

interface HourInformation {
  datetime: Temporal.PlainDateTime;
  daylight: boolean;
  dayClass: string;
  weekdayClass: string;
  hourClass: string;
  rowNumber: number;
}

interface WeekDefinition {
  firstDay: Temporal.PlainDate;
  lastDay: Temporal.PlainDate;
}

function get24Hours(): Array<Temporal.PlainTime> {
  const hours = Array<Temporal.PlainTime>(24);
  for (let i = 0; i < 24; i++) {
    hours[i] = Temporal.PlainTime.from({ hour: i });
  }
  return hours;
}

function getDays(): Array<DayInformation> {
  if (!props.days) {
    throw new Error("Property 'days' is undefined.");
  }
  if (props.days <= 0 || props.days > MAX_DAYS_VISIBLE) {
    throw new Error(
      `Invalid number of days for weekview: ${props.days}. Choose between 1 and ${MAX_DAYS_VISIBLE}.`
    );
  }

  const days = Array<DayInformation>(props.days);
  const weekDefinition = getWeekDefinition();
  for (let i = 0; i < days.length; i++) {
    days[i] = { day: weekDefinition.firstDay.add({ days: i }) };
  }
  return days;
}

function getHours(): Array<HourInformation> {
  if (!props.days) {
    throw new Error("Property 'days' is undefined.");
  }
  if (props.days <= 0 || props.days > MAX_DAYS_VISIBLE) {
    throw new Error(
      `Invalid number of days for weekview: ${props.days}. Choose between 1 and ${MAX_DAYS_VISIBLE}.`
    );
  }

  const hours = Array<HourInformation>(props.days * 24);
  const weekDefinition = getWeekDefinition();

  for (
    let i = 0, d = 0, currentDay = weekDefinition.firstDay;
    d < props.days;
    d++, currentDay = currentDay.add({ days: 1 })
  ) {
    for (let h = 0; h < 24; h++, i++) {
      const time = Temporal.PlainTime.from({ hour: h });
      hours[i] = {
        datetime: Temporal.PlainDateTime.from({
          day: currentDay.day,
          month: currentDay.month,
          year: currentDay.year,
          hour: h,
        }),
        daylight: isDayLight(time),
        dayClass: `${currentDay.toString()}`,
        weekdayClass: getWeekDayClass(currentDay),
        hourClass: `${time
          .toString({ smallestUnit: "minute" })
          .replace(":", "")}`,
        rowNumber: d,
      };
    }
  }

  return hours;
}

function getWeekDayClass(day: Temporal.PlainDate) {
  return [
    "?",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ][day.dayOfWeek];
}

function getWeekDefinition(): WeekDefinition {
  let firstDay = Temporal.PlainDate.from(props.datetime);
  if (props.firstDay === "firstDayOfWeek") {
    while (firstDay.dayOfWeek !== props.weekStart) {
      firstDay = firstDay.subtract({ days: 1 });
    }
  } else if (props.firstDay === "float") {
    if (!props.days) {
      throw new Error("Property 'days' is undefined.");
    }
    if (props.days > 2) {
      firstDay = firstDay.subtract({ days: props.days / 3 });
    }
  } else {
    throw new Error(`unknown firstDay property value: ${props.firstDay}.`);
  }

  return { firstDay, lastDay: firstDay.add({ days: props.days }) };
}

function isDayLight(time: Temporal.PlainTime) {
  if (!props.dayLightStart || !props.dayLightEnd) {
    throw new Error("Property 'dayLightStart' and/or 'dayLightEnd' invalid.");
  }
  return (
    Temporal.PlainTime.compare(time, props.dayLightStart) >= 0 &&
    Temporal.PlainTime.compare(time, props.dayLightEnd) <= 0
  );
}

const emit = defineEmits([
  "onWeekLabelDoubleLeft",
  "onWeekLabelDoubleRight",
  "onWeekLabelLeft",
  "onWeekLabelRight",
  "onWeekLabelTodayClick",
]);
</script>

<template>
  <div class="week-view">
    <WeekLabel
      class="week-number"
      :datetime="props.datetime"
      @onDoubleLeftClick="emit('onWeekLabelDoubleLeft')"
      @onDoubleRightClick="emit('onWeekLabelDoubleRight')"
      @onLeftClick="emit('onWeekLabelLeft')"
      @onRightClick="emit('onWeekLabelRight')"
      @onTodayClick="emit('onWeekLabelTodayClick')"
    />
    <div class="header">
      <div class="side"></div>
      <DayColumnHeader
        v-for="(dayInformation, index) in getDays()"
        :key="index"
        :day="dayInformation.day"
        class="day row cell"
        :class="[index === props.days - 1 ? 'lastRow' : '']"
      />
      <div class="fake-scrollbar">
        <!--
          This is a hack to align the behavior on WebKit and Mozilla browsers.
          Sadly, there is no common standard how scrollbars are treated.
          WebKit is quite sophisticated but the client area of a component is
          excluded from the total width if a vertical scrollbar appears.
          Mozilla Firefox gives a s..t and renders a scrollbar into the client
          area. As a result, we have different widths if at WebKit or
          at Gecko. %(

          This div here has a width of 0 at Mozilla FF and a width of
          the defined scrollbar at WebKit.

          This is a hack.
        -->
      </div>
    </div>
    <div class="matrix">
      <div class="side">
        <div v-for="(hour, index) in get24Hours()" :key="index" class="hour">
          {{ hour.toString({ smallestUnit: "minute" }) }}
        </div>
      </div>
      <div class="days">
        <div
          v-for="(hourInformation, index) in getHours()"
          :key="index"
          class="day cell"
          :class="[
            hourInformation.dayClass,
            hourInformation.hourClass,
            hourInformation.weekdayClass,
            hourInformation.daylight ? 'daylight' : 'night',
            hourInformation.rowNumber === props.days - 1 ? 'lastRow' : '',
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.week-view {
  @apply relative flex flex-col select-none w-full;
}

.week-view .header {
  @apply flex flex-row min-w-max;
}

.week-view .header .day.cell.lastRow {
  @apply border-r-0;
}

.week-view .header .side {
  @apply flex-none w-16 border-b;
}

.week-view .header .fake-scrollbar {
  @apply flex-none overflow-y-scroll opacity-0;
}

.week-view .matrix {
  @apply flex flex-row w-full h-full overflow-y-scroll;
}

.week-view .matrix .side {
  @apply flex-none w-16 grid grid-flow-col grid-rows-[repeat(24,_3rem)];
}

.week-view .matrix .side .hour {
  @apply text-xs text-gray-500 border-b border-r text-right p-0.5;
}

.week-view .matrix .days {
  @apply relative grow grid grid-flow-col grid-rows-[repeat(24,_3rem)];
}

.week-view .matrix .days .day.cell {
  @apply border-r border-b;
}

.week-view .matrix .days .day.cell.night {
  @apply bg-gray-100;
}

.week-view .matrix .days .day.cell.lastRow {
  @apply border-r-0;
}
</style>
