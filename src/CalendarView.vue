<script setup lang="ts">
import { ref } from "vue";
import { Temporal } from "@js-temporal/polyfill";
import CalendarHeader from "@/components/CalendarHeader.vue";
import CalendarMain from "@/components/CalendarMain.vue";
import CalendarFooter from "@/components/CalendarFooter.vue";
import CalendarSideBar from "@/components/CalendarSideBar.vue";

interface Props {
  readonly initialDate?: Temporal.PlainDateTime;
}

const props = withDefaults(defineProps<Props>(), {
  initialDate: () => Temporal.Now.plainDateTimeISO(),
});

const currentDate = ref<Temporal.PlainDateTime>(
  Temporal.PlainDateTime.from(props.initialDate as Temporal.PlainDateTime)
);

const showNavHints = ref(false);
const weekViewDays = ref(7);
const weekStartWeekDay = ref(1);
const startOfWeekView = ref("firstDayOfWeek");
const firstDayInWeekView = ref<Temporal.PlainDate | null>(null);
const lastDayInWeekView = ref<Temporal.PlainDate | null>(null);

const dayLightStart = ref<Temporal.PlainTime>(
  Temporal.PlainTime.from({ hour: 6 })
);

const dayLightEnd = ref<Temporal.PlainTime>(
  Temporal.PlainTime.from({ hour: 19 })
);

const highlightDaysInMonthView = ref(true);
const showNowMarker = ref(true);

function calculateWeekViewInterval(): void {
  let firstDay = currentDate.value;
  if (startOfWeekView.value === "firstDayOfWeek") {
    while (firstDay.dayOfWeek !== weekStartWeekDay.value) {
      firstDay = firstDay.subtract({ days: 1 });
    }
  } else if (startOfWeekView.value === "float") {
    firstDay = firstDay.subtract({ days: Math.floor(weekViewDays.value / 4) });
  }

  firstDayInWeekView.value = Temporal.PlainDate.from(firstDay);
  lastDayInWeekView.value = firstDayInWeekView.value.add({
    days: weekViewDays.value,
  });
}

function changeDayLightEnd(time: Temporal.PlainTime): void {
  dayLightEnd.value = time;
  calculateWeekViewInterval();
}

function changeDayLightStart(time: Temporal.PlainTime): void {
  dayLightStart.value = time;
  calculateWeekViewInterval();
}

function changeFirstDayOfWeek(start: any): void {
  let value = 0;
  if (typeof start === "string") {
    value = parseInt(start);
  } else if (typeof start === "number") {
    value = Math.round(start);
  }
  if (value === 0) {
    console.warn("Invalid value for changeFirstDayOfWeek");
    return;
  }
  weekStartWeekDay.value = ((value - 1) % 7) + 1;
  calculateWeekViewInterval();
}

function changeStartOfWeekView(start: any): void {
  if ("" + start === "firstDayOfWeek") {
    startOfWeekView.value = "firstDayOfWeek";
  } else if ("" + start === "float") {
    startOfWeekView.value = "float";
  } else {
    console.warn(`Unknown value for startOfWeekView: ${start}`);
    return;
  }

  calculateWeekViewInterval();
}

function changeWeekViewDays(days: any): void {
  weekViewDays.value = typeof days === "number" ? days : parseFloat("" + days);
  calculateWeekViewInterval();
}

function headerShiftDoubleLeft(): void {
  currentDate.value = currentDate.value.subtract({ months: 3 });
  calculateWeekViewInterval();
}

function headerShiftDoubleRight(): void {
  currentDate.value = currentDate.value.add({ months: 3 });
  calculateWeekViewInterval();
}

function headerShiftLeft(): void {
  currentDate.value = currentDate.value.subtract({ months: 1 });
  calculateWeekViewInterval();
}

function headerShiftRight(): void {
  currentDate.value = currentDate.value.add({ months: 1 });
  calculateWeekViewInterval();
}

function weekDayLeft(): void {
  if (startOfWeekView.value === "firstDayOfWeek") {
    currentDate.value = currentDate.value.subtract({ weeks: 1 });
  } else if (startOfWeekView.value === "float") {
    currentDate.value = currentDate.value.subtract({ days: 1 });
  } else {
    console.warn(`Unknown startOfWeekView.value: ${startOfWeekView.value}`);
  }
  calculateWeekViewInterval();
}

function weekDayRight(): void {
  if (startOfWeekView.value === "firstDayOfWeek") {
    currentDate.value = currentDate.value.add({ weeks: 1 });
  } else if (startOfWeekView.value === "float") {
    currentDate.value = currentDate.value.add({ days: 1 });
  } else {
    console.warn(`Unknown startOfWeekView.value: ${startOfWeekView.value}`);
  }
  calculateWeekViewInterval();
}

function weekShiftDoubleLeft(): void {
  currentDate.value = currentDate.value.subtract({ weeks: 4 });
  calculateWeekViewInterval();
}

function weekShiftDoubleRight(): void {
  currentDate.value = currentDate.value.add({ weeks: 4 });
  calculateWeekViewInterval();
}

function weekShiftLeft(): void {
  currentDate.value = currentDate.value.subtract({ weeks: 1 });
  calculateWeekViewInterval();
}

function weekShiftRight(): void {
  currentDate.value = currentDate.value.add({ weeks: 1 });
  calculateWeekViewInterval();
}

function selectDay(day: Temporal.PlainDate): void {
  currentDate.value = Temporal.PlainDateTime.from({
    day: day.day,
    month: day.month,
    year: day.year,
  });
  calculateWeekViewInterval();
}

function selectToday(): void {
  currentDate.value = Temporal.Now.plainDateTimeISO();
  calculateWeekViewInterval();
}

calculateWeekViewInterval();
</script>

<template>
  <div class="calendar-app">
    <CalendarHeader
      :datetime="currentDate"
      :navHints="showNavHints"
      @onDoubleLeftClick="headerShiftDoubleLeft()"
      @onDoubleRightClick="headerShiftDoubleRight()"
      @onLeftClick="headerShiftLeft()"
      @onRightClick="headerShiftRight()"
      @onTodayClick="selectToday()"
    />
    <div class="body">
      <CalendarSideBar
        :datetime="currentDate"
        :navHints="showNavHints"
        :start-day-of-week="weekStartWeekDay"
        :highlight-days="highlightDaysInMonthView"
        :first-highlighted-date="firstDayInWeekView"
        :last-highlighted-date="lastDayInWeekView"
        @onDayClick="selectDay($event)"
        @disableCalendarNavHints="showNavHints = false"
        @enableCalendarNavHints="showNavHints = true"
        @enable-month-view-highlight="highlightDaysInMonthView = true"
        @enable-week-view-now-marker="showNowMarker = true"
        @disable-month-view-highlight="highlightDaysInMonthView = false"
        @disable-week-view-now-marker="showNowMarker = false"
        @changeWeekViewDays="changeWeekViewDays($event)"
        @changeStartOfWeekView="changeStartOfWeekView($event)"
        @changeFirstDayOfWeek="changeFirstDayOfWeek($event)"
        @changeDayLightEnd="changeDayLightEnd($event)"
        @changeDayLightStart="changeDayLightStart($event)"
      />
      <CalendarMain
        :datetime="currentDate"
        :firstDate="firstDayInWeekView"
        :lastDate="lastDayInWeekView"
        :navHints="showNavHints"
        :day-light-start="dayLightStart"
        :day-light-end="dayLightEnd"
        :show-now="showNowMarker"
        @onWeekLabelDoubleLeft="weekShiftDoubleLeft()"
        @onWeekLabelDoubleRight="weekShiftDoubleRight()"
        @onWeekLabelLeft="weekShiftLeft()"
        @onWeekLabelRight="weekShiftRight()"
        @onWeekLabelTodayClick="selectToday()"
        @onWeekDayLeftClick="weekDayLeft()"
        @onWeekDayRightClick="weekDayRight()"
      />
    </div>
    <CalendarFooter class="footer" :datetime="currentDate" />
  </div>
</template>

<style scoped>
.calendar-app {
  @apply h-screen grid;
  grid-template-rows: auto 1fr auto;
}

.calendar-app .body {
  @apply grid max-h-full min-h-0 gap-2;
  grid-template-columns: 16rem 1fr;
}
</style>
