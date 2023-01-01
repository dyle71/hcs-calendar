<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import WeekView from "@/components/elements/WeekView.vue";

interface Props {
  datetime: Temporal.PlainDateTime;
  firstDate: Temporal.PlainDate;
  lastDate: Temporal.PlainDate;
  navHints?: boolean;
  startOfDayOfWeekView?: "float" | "firstDayOfWeek";
  dayLightStart?: Temporal.PlainTime;
  dayLightEnd?: Temporal.PlainTime;
}
const props = withDefaults(defineProps<Props>(), {
  navHints: false,
  startOfDayOfWeekView: "firstDayOfWeek",
  dayLightStart: () => Temporal.PlainTime.from({ hour: 6 }),
  dayLightEnd: () => Temporal.PlainTime.from({ hour: 19 }),
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
  <WeekView
    class="week-view"
    :datetime="props.datetime"
    :firstDate="props.firstDate"
    :lastDate="props.lastDate"
    :navHints="props.navHints"
    :first-day="props.startOfDayOfWeekView"
    :day-light-end="props.dayLightEnd"
    :day-light-start="props.dayLightStart"
    @onWeekLabelDoubleLeft="emit('onWeekLabelDoubleLeft')"
    @onWeekLabelDoubleRight="emit('onWeekLabelDoubleRight')"
    @onWeekLabelLeft="emit('onWeekLabelLeft')"
    @onWeekLabelRight="emit('onWeekLabelRight')"
    @onWeekLabelTodayClick="emit('onWeekLabelTodayClick')"
    @onDayLeftClick="emit('onWeekDayLeftClick')"
    @onDayRightClick="emit('onWeekDayRightClick')"
  />
</template>
