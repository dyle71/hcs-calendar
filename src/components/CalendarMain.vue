<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import WeekView from "@/components/elements/WeekView.vue";

interface Props {
  datetime: Temporal.PlainDateTime;
  navHints?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  navHints: false,
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
    :navHints="props.navHints"
    @onWeekLabelDoubleLeft="emit('onWeekLabelDoubleLeft')"
    @onWeekLabelDoubleRight="emit('onWeekLabelDoubleRight')"
    @onWeekLabelLeft="emit('onWeekLabelLeft')"
    @onWeekLabelRight="emit('onWeekLabelRight')"
    @onWeekLabelTodayClick="emit('onWeekLabelTodayClick')"
  />
</template>
