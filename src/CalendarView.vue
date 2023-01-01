<script setup lang="ts">
import { ref } from "vue";
import { Temporal } from "@js-temporal/polyfill";
import CalendarHeader from "@/components/CalendarHeader.vue";
import CalendarMain from "@/components/CalendarMain.vue";
import CalendarFooter from "@/components/CalendarFooter.vue";
import CalendarSideBar from "@/components/CalendarSideBar.vue";

interface Props {
  initialDate?: Temporal.PlainDateTime;
}

const props = withDefaults(defineProps<Props>(), {
  initialDate: Temporal.Now.plainDateTimeISO(),
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

function calculateWeekViewInterval() {
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

function changeDayLightEnd(time: Temporal.PlainTime) {
  dayLightEnd.value = time;
  calculateWeekViewInterval();
}

function changeDayLightStart(time: Temporal.PlainTime) {
  dayLightStart.value = time;
  calculateWeekViewInterval();
}

function changeFirstDayOfWeek(start: any) {
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

function changeStartOfWeekView(start: any) {
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

function changeWeekViewDays(days: any) {
  weekViewDays.value = typeof days === "number" ? days : parseFloat("" + days);
  calculateWeekViewInterval();
}

function headerShiftDoubleLeft() {
  currentDate.value = currentDate.value.subtract({ months: 3 });
  calculateWeekViewInterval();
}

function headerShiftDoubleRight() {
  currentDate.value = currentDate.value.add({ months: 3 });
  calculateWeekViewInterval();
}

function headerShiftLeft() {
  currentDate.value = currentDate.value.subtract({ months: 1 });
  calculateWeekViewInterval();
}

function headerShiftRight() {
  currentDate.value = currentDate.value.add({ months: 1 });
  calculateWeekViewInterval();
}

function weekDayLeft() {
  if (startOfWeekView.value === "firstDayOfWeek") {
    currentDate.value = currentDate.value.subtract({ weeks: 1 });
  } else if (startOfWeekView.value === "float") {
    currentDate.value = currentDate.value.subtract({ days: 1 });
  } else {
    console.warn(`Unknown startOfWeekView.value: ${startOfWeekView.value}`);
  }
  calculateWeekViewInterval();
}

function weekDayRight() {
  if (startOfWeekView.value === "firstDayOfWeek") {
    currentDate.value = currentDate.value.add({ weeks: 1 });
  } else if (startOfWeekView.value === "float") {
    currentDate.value = currentDate.value.add({ days: 1 });
  } else {
    console.warn(`Unknown startOfWeekView.value: ${startOfWeekView.value}`);
  }
  calculateWeekViewInterval();
}

function weekShiftDoubleLeft() {
  currentDate.value = currentDate.value.subtract({ weeks: 4 });
  calculateWeekViewInterval();
}

function weekShiftDoubleRight() {
  currentDate.value = currentDate.value.add({ weeks: 4 });
  calculateWeekViewInterval();
}

function weekShiftLeft() {
  currentDate.value = currentDate.value.subtract({ weeks: 1 });
  calculateWeekViewInterval();
}

function weekShiftRight() {
  currentDate.value = currentDate.value.add({ weeks: 1 });
  calculateWeekViewInterval();
}

function selectDay(day: Temporal.PlainDate) {
  currentDate.value = Temporal.PlainDateTime.from({
    day: day.day,
    month: day.month,
    year: day.year,
  });
  calculateWeekViewInterval();
}

function selectToday() {
  currentDate.value = Temporal.Now.plainDateTimeISO();
  calculateWeekViewInterval();
}

calculateWeekViewInterval();
</script>

<template>
  <div class="calendar-app">
    <CalendarHeader
      class="header"
      :datetime="currentDate"
      :navHints="showNavHints"
      @onDoubleLeftClick="headerShiftDoubleLeft()"
      @onDoubleRightClick="headerShiftDoubleRight()"
      @onLeftClick="headerShiftLeft()"
      @onRightClick="headerShiftRight()"
      @onTodayClick="selectToday()"
    />
    <div class="height-wrapper">
      <div class="body">
        <CalendarSideBar
          :datetime="currentDate"
          :navHints="showNavHints"
          @onDayClick="selectDay($event)"
          @disableCalendarNavHints="showNavHints = false"
          @enableCalendarNavHints="showNavHints = true"
          @changeWeekViewDays="changeWeekViewDays($event)"
          @changeStartOfWeekView="changeStartOfWeekView($event)"
          @changeFirstDayOfWeek="changeFirstDayOfWeek($event)"
          @changeDayLightEnd="changeDayLightEnd($event)"
          @changeDayLightStart="changeDayLightStart($event)"
        />
        <div class="width-wrapper">
          <CalendarMain
            :datetime="currentDate"
            :firstDate="firstDayInWeekView"
            :lastDate="lastDayInWeekView"
            :navHints="showNavHints"
            :day-light-start="dayLightStart"
            :day-light-end="dayLightEnd"
            @onWeekLabelDoubleLeft="weekShiftDoubleLeft()"
            @onWeekLabelDoubleRight="weekShiftDoubleRight()"
            @onWeekLabelLeft="weekShiftLeft()"
            @onWeekLabelRight="weekShiftRight()"
            @onWeekLabelTodayClick="selectToday()"
            @onWeekDayLeftClick="weekDayLeft()"
            @onWeekDayRightClick="weekDayRight()"
          />
        </div>
      </div>
    </div>
    <CalendarFooter class="footer" :datetime="currentDate" />
  </div>
</template>

<style scoped>
.calendar-app {
  @apply flex flex-col h-screen;
}

.calendar-app .header {
  @apply flex-none;
}

.calendar-app .height-wrapper {
  @apply grow h-0;
}

.calendar-app .height-wrapper .body {
  @apply flex-none flex flex-row h-full w-full gap-2;
}

.calendar-app .height-wrapper .body .width-wrapper {
  @apply grow max-w-full overflow-x-scroll;
}

.calendar-app .footer {
  @apply flex-none;
}
</style>
