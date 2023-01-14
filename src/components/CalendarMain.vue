<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import WeekLabel from "@/components/elements/WeekLabel.vue";
import WeekView from "@/components/elements/WeekView.vue";

interface Props {
  readonly datetime: Temporal.PlainDateTime;
  readonly firstDate: Temporal.PlainDate;
  readonly lastDate: Temporal.PlainDate;
  readonly navHints?: boolean;
  readonly startOfDayOfWeekView?: "float" | "firstDayOfWeek";
  readonly dayLightStart?: Temporal.PlainTime;
  readonly dayLightEnd?: Temporal.PlainTime;
  readonly showNow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  navHints: false,
  startOfDayOfWeekView: "firstDayOfWeek",
  dayLightStart: () => Temporal.PlainTime.from({ hour: 6 }),
  dayLightEnd: () => Temporal.PlainTime.from({ hour: 19 }),
  showNow: true,
});

const emit = defineEmits([
  "onWeekLabelDoubleLeft",
  "onWeekLabelDoubleRight",
  "onWeekLabelLeft",
  "onWeekLabelRight",
  "onWeekLabelTodayClick",
  "onWeekDayLeftClick",
  "onWeekDayRightClick",
]);
</script>

<template>
  <div class="main">
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
    <WeekView
      class="week-view"
      :datetime="props.datetime"
      :firstDate="props.firstDate"
      :lastDate="props.lastDate"
      :navHints="props.navHints"
      :first-day="props.startOfDayOfWeekView"
      :day-light-end="props.dayLightEnd"
      :day-light-start="props.dayLightStart"
      :show-now="props.showNow"
      @onWeekLabelDoubleLeft="emit('onWeekLabelDoubleLeft')"
      @onWeekLabelDoubleRight="emit('onWeekLabelDoubleRight')"
      @onWeekLabelLeft="emit('onWeekLabelLeft')"
      @onWeekLabelRight="emit('onWeekLabelRight')"
      @onWeekLabelTodayClick="emit('onWeekLabelTodayClick')"
      @onDayLeftClick="emit('onWeekDayLeftClick')"
      @onDayRightClick="emit('onWeekDayRightClick')"
    />
  </div>
</template>

<style scoped>
.main {
  @apply grid min-w-0 max-w-full min-h-0 max-h-full gap-2;
  grid-template-rows: auto 1fr;
}
</style>
