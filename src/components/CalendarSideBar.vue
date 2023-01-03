<script setup lang="ts">
import { ref } from "vue";
import { Temporal } from "@js-temporal/polyfill";
import MonthMiniView from "@/components/elements/MonthMiniView.vue";
import EventForm from "@/components/elements/EventForm.vue";
import OptionsPanel from "@/components/OptionsPanel.vue";

interface Props {
  datetime: Temporal.PlainDateTime;
  navHints?: boolean;
  startDayOfWeek?: number;
  highlightDays?: boolean;
  firstHighlightedDate?: Temporal.PlainDate | null;
  lastHighlightedDate?: Temporal.PlainDate | null;
}
const props = withDefaults(defineProps<Props>(), {
  navHints: false,
  startDayOfWeek: 1,
  highlightDays: true,
});

const currenMonth = ref(Temporal.PlainDate.from(props.datetime));
const nextMonth = ref(currenMonth.value.add({ months: 1 }));

function switchToPreviousMonth() {
  currenMonth.value = currenMonth.value.subtract({ months: 1 });
  nextMonth.value = currenMonth.value.add({ months: 1 });
}

function switchToNextMonth() {
  currenMonth.value = currenMonth.value.add({ months: 1 });
  nextMonth.value = currenMonth.value.add({ months: 1 });
}

function onCurrentMonthUpperClicked() {
  currenMonth.value = Temporal.Now.plainDateISO();
  nextMonth.value = currenMonth.value.add({ months: 1 });
}

function onCurrentMonthLowerClicked() {
  nextMonth.value = Temporal.Now.plainDateISO();
  currenMonth.value = nextMonth.value.subtract({ months: 1 });
}

function onPreviousMonthUpperClicked() {
  switchToPreviousMonth();
}

function onPreviousMonthLowerClicked() {
  switchToPreviousMonth();
}

function onNextMonthUpperClicked() {
  switchToNextMonth();
}

function onNextMonthLowerClicked() {
  switchToNextMonth();
}

const emit = defineEmits([
  "onDayClick",
  "enableCalendarNavHints",
  "enableMonthViewHighlight",
  "disableCalendarNavHints",
  "disableMonthViewHighlight",
  "changeWeekViewDays",
  "changeStartOfWeekView",
  "changeFirstDayOfWeek",
  "changeDayLightStart",
  "changeDayLightEnd",
]);
</script>

<template>
  <div class="calendar-sidebar">
    <MonthMiniView
      class="month-view"
      :date="currenMonth"
      :nav-hints="props.navHints"
      :start-day-of-week="props.startDayOfWeek"
      :highlight-days="props.highlightDays"
      :first-highlighted-date="props.firstHighlightedDate"
      :last-highlighted-date="props.lastHighlightedDate"
      @onLeftClick="onPreviousMonthUpperClicked()"
      @onRightClick="onNextMonthUpperClicked()"
      @onDayClick="emit('onDayClick', $event)"
      @onTodayClick="onCurrentMonthUpperClicked()"
    />
    <MonthMiniView
      class="month-view"
      :date="nextMonth"
      :nav-hints="props.navHints"
      :start-day-of-week="props.startDayOfWeek"
      :highlight-days="props.highlightDays"
      :first-highlighted-date="props.firstHighlightedDate"
      :last-highlighted-date="props.lastHighlightedDate"
      @onLeftClick="onPreviousMonthLowerClicked()"
      @onRightClick="onNextMonthLowerClicked()"
      @onDayClick="emit('onDayClick', $event)"
      @onTodayClick="onCurrentMonthLowerClicked()"
    />
    <EventForm />
    <OptionsPanel
      @enableCalendarNavHints="emit('enableCalendarNavHints')"
      @enableMonthViewHighlight="emit('enableMonthViewHighlight')"
      @disableCalendarNavHints="emit('disableCalendarNavHints')"
      @disableMonthViewHighlight="emit('disableMonthViewHighlight')"
      @changeWeekViewDays="emit('changeWeekViewDays', $event)"
      @changeStartOfWeekView="emit('changeStartOfWeekView', $event)"
      @changeFirstDayOfWeek="emit('changeFirstDayOfWeek', $event)"
      @changeDayLightEnd="emit('changeDayLightEnd', $event)"
      @changeDayLightStart="emit('changeDayLightStart', $event)"
    />
  </div>
</template>

<style scoped>
.calendar-sidebar {
  @apply flex flex-col gap-2 p-2 w-64;
}

.calendar-sidebar .month-view {
  @apply mb-1;
}
</style>
