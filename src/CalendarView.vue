<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Temporal } from "@js-temporal/polyfill";
import CalendarHeader from "@/components/CalendarHeader.vue";
import CalendarMain from "@/components/CalendarMain.vue";
import CalendarFooter from "@/components/CalendarFooter.vue";
import CalendarSideBar from "@/components/CalendarSideBar.vue";

interface Props {
  initialDate?: Temporal.PlainDateTime;
}

const props = withDefaults(defineProps<Props>(), {
  initialDate: () => Temporal.Now.plainDateTimeISO(),
});

const view = ref<HTMLElement | null>(null);
const header = ref<InstanceType<typeof CalendarHeader> | null>(null);
const body = ref<HTMLElement | null>(null);
const footer = ref<InstanceType<typeof CalendarFooter> | null>(null);

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

function fixBodyHeight() {
  // The CSS max-height: 100% does not work. This is sort of a hack
  // to get around CSS limitations.
  if (view.value && header.value && body.value && footer.value) {
    body.value.style.height =
      view.value.offsetHeight -
      (header.value.$el.offsetHeight + footer.value.$el.offsetHeight) +
      "px";
  }
}

onMounted(() => {
  window.addEventListener("resize", fixBodyHeight);
  fixBodyHeight();
});

onUnmounted(() => {
  window.removeEventListener("resize", fixBodyHeight);
});
</script>

<template>
  <div class="calendar-app" ref="view">
    <CalendarHeader
      class="header"
      ref="header"
      :datetime="currentDate"
      :navHints="showNavHints"
      @onDoubleLeftClick="headerShiftDoubleLeft()"
      @onDoubleRightClick="headerShiftDoubleRight()"
      @onLeftClick="headerShiftLeft()"
      @onRightClick="headerShiftRight()"
      @onTodayClick="selectToday()"
    />
    <div class="body" ref="body">
      <CalendarSideBar
        class="side"
        :datetime="currentDate"
        :navHints="showNavHints"
        :start-day-of-week="weekStartWeekDay"
        :highlight-days="highlightDaysInMonthView"
        :first-highlighted-date="firstDayInWeekView"
        :last-highlighted-date="lastDayInWeekView"
        @onDayClick="selectDay($event)"
        @disableCalendarNavHints="showNavHints = false"
        @enableCalendarNavHints="showNavHints = true"
        @disable-month-view-highlight="highlightDaysInMonthView = false"
        @enable-month-view-highlight="highlightDaysInMonthView = true"
        @changeWeekViewDays="changeWeekViewDays($event)"
        @changeStartOfWeekView="changeStartOfWeekView($event)"
        @changeFirstDayOfWeek="changeFirstDayOfWeek($event)"
        @changeDayLightEnd="changeDayLightEnd($event)"
        @changeDayLightStart="changeDayLightStart($event)"
      />
      <CalendarMain
        class="main"
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
    <CalendarFooter class="footer" ref="footer" :datetime="currentDate" />
  </div>
</template>

<style scoped>
.calendar-app {
  @apply h-screen flex flex-col;
}

.calendar-app .header {
  @apply flex-none;
  @apply h-10;
}

.calendar-app .body {
  @apply flex flex-row gap-2;
}

.calendar-app .body .side {
  @apply flex-none overflow-y-scroll;
}

.calendar-app .body .main {
  @apply grow;
}

.calendar-app .footer {
  @apply flex-none;
}
</style>
