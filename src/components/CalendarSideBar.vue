<script setup lang="ts">
import { ref } from "vue";
import { Temporal } from "@js-temporal/polyfill";
import MonthMiniView from "@/components/elements/MonthMiniView.vue";
import EventForm from "@/components/elements/EventForm.vue";
import OptionsPanel from "@/components/OptionsPanel.vue";

interface Props {
  readonly datetime: Temporal.PlainDateTime;
  readonly navHints?: boolean;
  readonly startDayOfWeek?: number;
  readonly highlightDays?: boolean;
  readonly firstHighlightedDate?: Temporal.PlainDate | null;
  readonly lastHighlightedDate?: Temporal.PlainDate | null;
}

const props = withDefaults(defineProps<Props>(), {
  navHints: false,
  startDayOfWeek: 1,
  highlightDays: true,
});

const currenMonth = ref(Temporal.PlainDate.from(props.datetime));
const nextMonth = ref(currenMonth.value.add({ months: 1 }));

function switchToPreviousMonth(): void {
  currenMonth.value = currenMonth.value.subtract({ months: 1 });
  nextMonth.value = currenMonth.value.add({ months: 1 });
}

function switchToNextMonth(): void {
  currenMonth.value = currenMonth.value.add({ months: 1 });
  nextMonth.value = currenMonth.value.add({ months: 1 });
}

function onCurrentMonthUpperClicked(): void {
  currenMonth.value = Temporal.Now.plainDateISO();
  nextMonth.value = currenMonth.value.add({ months: 1 });
}

function onCurrentMonthLowerClicked(): void {
  nextMonth.value = Temporal.Now.plainDateISO();
  currenMonth.value = nextMonth.value.subtract({ months: 1 });
}

const emit = defineEmits([
  "onDayClick",
  "enableCalendarNavHints",
  "enableMonthViewHighlight",
  "enableWeekViewNowMarker",
  "disableCalendarNavHints",
  "disableMonthViewHighlight",
  "disableWeekViewNowMarker",
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
      @onLeftClick="switchToPreviousMonth()"
      @onRightClick="switchToNextMonth()"
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
      @onLeftClick="switchToPreviousMonth()"
      @onRightClick="switchToNextMonth()"
      @onDayClick="emit('onDayClick', $event)"
      @onTodayClick="onCurrentMonthLowerClicked()"
    />
    <EventForm class="event-form" />
    <OptionsPanel
      class="options-panel"
      @enableCalendarNavHints="emit('enableCalendarNavHints')"
      @enableMonthViewHighlight="emit('enableMonthViewHighlight')"
      @enable-week-view-now-marker="emit('enableWeekViewNowMarker')"
      @disableCalendarNavHints="emit('disableCalendarNavHints')"
      @disableMonthViewHighlight="emit('disableMonthViewHighlight')"
      @disable-week-view-now-marker="emit('disableWeekViewNowMarker')"
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
  @apply block p-2 max-w-full min-w-0 overflow-y-scroll;
}

.calendar-sidebar .month-view {
  @apply mb-2;
}

.calendar-sidebar .event-form {
  @apply mb-2;
}

.calendar-sidebar .options-panel {
  @apply mb-2;
}
</style>
