<script setup lang="ts">
import { computed } from "vue";
import { Temporal } from "@js-temporal/polyfill";
import {
  getTenseByDate,
  getTenseByDateTime,
  getWeekDayString,
} from "@/calendar";
import CalendarNavButtonRow from "@/components/elements/CalendarNavButtonRow.vue";
import DayColumnHeader from "@/components/elements/DayColumnHeader.vue";
import WeekLabel from "@/components/elements/WeekLabel.vue";

interface Props {
  datetime: Temporal.PlainDateTime;
  firstDate: Temporal.PlainDate;
  lastDate: Temporal.PlainDate;
  navHints?: boolean;
  dayLightStart?: Temporal.PlainTime;
  dayLightEnd?: Temporal.PlainTime;
}
const props = withDefaults(defineProps<Props>(), {
  navHints: false,
  weekStart: 1,
  days: 7,
  dayLightStart: () => Temporal.PlainTime.from({ hour: 6 }),
  dayLightEnd: () => Temporal.PlainTime.from({ hour: 19 }),
});

interface HourInformation {
  datetime: Temporal.PlainDateTime;
  daylight: boolean;
  dayClass: string;
  weekdayClass: string;
  hourClass: string;
  rowNumber: number;
}

const days = computed(() => {
  const duration = props.firstDate.until(props.lastDate);
  if (duration.days <= 0) {
    throw new Error(
      `Calculated invalid number of days: ${duration.days} for WeekView.`
    );
  }

  const days = Array<Temporal.PlainDate>(duration.days);
  let currentDate = props.firstDate;
  for (let i = 0; i < days.length; i++) {
    days[i] = currentDate;
    currentDate = currentDate.add({ days: 1 });
  }
  return days;
});

const hours = computed(() => {
  const duration = props.firstDate.until(props.lastDate);
  if (duration.days <= 0) {
    throw new Error(
      `Calculated invalid number of days: ${duration.days} for WeekView.`
    );
  }

  const hours = Array<HourInformation>(duration.days * 24);
  for (
    let i = 0, d = 0, currentDay = props.firstDate;
    d < duration.days;
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
        weekdayClass: getWeekDayString(currentDay),
        hourClass: `${time
          .toString({ smallestUnit: "minute" })
          .replace(":", "")}`,
        rowNumber: d,
      };
    }
  }

  return hours;
});

function get24Hours(): Array<Temporal.PlainTime> {
  const hours = Array<Temporal.PlainTime>(24);
  for (let i = 0; i < 24; i++) {
    hours[i] = Temporal.PlainTime.from({ hour: i });
  }
  return hours;
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
  "onDayLeftClick",
  "onDayRightClick",
]);
</script>

<template>
  <div class="week-view">
    <WeekLabel
      class="week-number"
      :datetime="props.datetime"
      :navHints="props.navHints"
      @onDoubleLeftClick="emit('onWeekLabelDoubleLeft')"
      @onDoubleRightClick="emit('onWeekLabelDoubleRight')"
      @onLeftClick="emit('onWeekLabelLeft')"
      @onRightClick="emit('onWeekLabelRight')"
      @onTodayClick="emit('onWeekLabelTodayClick')"
    />
    <div class="content">
      <div class="header">
        <div class="side">
          <CalendarNavButtonRow
            class="nav"
            :today="false"
            :double="false"
            :hint="props.navHints"
            :hints="{
              left: '-1',
              right: '+1',
            }"
            :tooltips="{
              left: $t('tooltip.week-view.days.nav.left'),
              right: $t('tooltip.week-view.days.nav.right'),
            }"
            @onLeftClick="emit('onDayLeftClick')"
            @onRightClick="emit('onDayRightClick')"
          />
        </div>
        <div
          class="days"
          :style="`grid-template-columns: repeat(${days.length}, 1fr);`"
        >
          <DayColumnHeader
            v-for="(day, index) in days"
            :key="index"
            :day="day"
            class="day row cell"
            :class="[
              index === days.length - 1 ? 'lastRow' : '',
              getTenseByDate(day),
            ]"
          />
        </div>
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
        --></div>
      </div>
      <div class="matrix">
        <div class="side">
          <div v-for="(hour, index) in get24Hours()" :key="index" class="hour">
            {{ hour.toString({ smallestUnit: "minute" }) }}
          </div>
        </div>
        <div
          class="days"
          :style="`grid-template-columns: repeat(${days.length}, 1fr);`"
        >
          <div
            v-for="(hourInformation, index) in hours"
            :key="index"
            class="day cell"
            :class="[
              hourInformation.dayClass,
              hourInformation.hourClass,
              hourInformation.weekdayClass,
              hourInformation.daylight ? 'daylight' : 'night',
              hourInformation.rowNumber === props.days - 1 ? 'lastRow' : '',
              getTenseByDateTime(hourInformation.datetime),
            ]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.week-view {
  @apply relative flex flex-col select-none overflow-scroll max-w-full max-h-full;
}

.week-view .content {
  @apply grow min-w-fit;
}

.week-view .content .header {
  @apply flex flex-row;
}

.week-view .content .header .side .nav {
  @apply my-auto min-h-full;
}

.week-view .content .header .days {
  @apply grow grid min-w-max;
}

.week-view .content .header .days .day {
}

.week-view .content .header .days .day.cell.lastRow {
  @apply border-r-0;
}

.week-view .content .header .side {
  @apply flex-none w-16 border-b;
}

.week-view .content .header .fake-scrollbar {
  @apply flex-none overflow-y-scroll opacity-0;
}

.week-view .content .matrix {
  @apply flex flex-row w-full h-full overflow-y-scroll;
}

.week-view .content .matrix .side {
  @apply flex-none w-16 grid grid-flow-col grid-rows-[repeat(24,_3rem)];
}

.week-view .content .matrix .side .hour {
  @apply text-xs text-gray-500 border-b border-r text-right p-0.5;
}

.week-view .content .matrix .days {
  @apply relative grow grid grid-flow-col grid-rows-[repeat(24,_3rem)];
}

.week-view .content .matrix .days .day.cell {
  @apply border-r border-b;
}

.week-view .content .matrix .days .day.cell.night {
  @apply bg-gray-100;
}

.week-view .content .matrix .days .day.cell.lastRow {
  @apply border-r-0;
}
</style>
