<script setup lang="ts">
import { ref } from "vue";
import { Temporal } from "@js-temporal/polyfill";
import MonthMiniView from "@/components/elements/MonthMiniView.vue";
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
  "disableCalendarNavHints",
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
    <OptionsPanel
      @enableCalendarNavHints="emit('enableCalendarNavHints')"
      @disableCalendarNavHints="emit('disableCalendarNavHints')"
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
  @apply relative flex-none flex flex-col gap-4 p-2 w-64;
  @apply overflow-y-scroll;
}
</style>
