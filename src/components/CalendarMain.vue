<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import WeekView from "@/components/elements/WeekView.vue";

interface Props {
  datetime: Temporal.PlainDateTime;
  firstDate: Temporal.PlainDate;
  lastDate: Temporal.PlainDate;
  navHints?: boolean;
  startOfDayOfWeekView?: "float" | "firstDayOfWeek";
}
const props = withDefaults(defineProps<Props>(), {
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
    class="week-view"
    :datetime="props.datetime"
    :firstDate="props.firstDate"
    :lastDate="props.lastDate"
    :navHints="props.navHints"
    :first-day="props.startOfDayOfWeekView"
    @onWeekLabelDoubleLeft="emit('onWeekLabelDoubleLeft')"
    @onWeekLabelDoubleRight="emit('onWeekLabelDoubleRight')"
    @onWeekLabelLeft="emit('onWeekLabelLeft')"
    @onWeekLabelRight="emit('onWeekLabelRight')"
    @onWeekLabelTodayClick="emit('onWeekLabelTodayClick')"
  />
</template>
