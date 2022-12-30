<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import WeekView from "@/components/elements/WeekView.vue";

interface Props {
  datetime: Temporal.PlainDateTime;
  days?: number;
  navHints?: boolean;
  startOfDayOfWeekView?: "float" | "firstDayOfWeek";
}
const props = withDefaults(defineProps<Props>(), {
  days: 7,
  navHints: false,
  startOfDayOfWeekView: "firstDayOfWeek",
});

const emit = defineEmits([
  "onWeekLabelDoubleLeft",
  "onWeekLabelDoubleRight",
  "onWeekLabelLeft",
  "onWeekLabelRight",
  "onWeekLabelTodayClick",
]);
</script>

<template>
  <WeekView
    :datetime="props.datetime"
    :days="props.days"
    :navHints="props.navHints"
    :first-day="props.startOfDayOfWeekView"
    @onWeekLabelDoubleLeft="emit('onWeekLabelDoubleLeft')"
    @onWeekLabelDoubleRight="emit('onWeekLabelDoubleRight')"
    @onWeekLabelLeft="emit('onWeekLabelLeft')"
    @onWeekLabelRight="emit('onWeekLabelRight')"
    @onWeekLabelTodayClick="emit('onWeekLabelTodayClick')"
  />
</template>
