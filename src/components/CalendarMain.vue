<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import WeekView from "@/components/elements/WeekView.vue";

interface Props {
  datetime: Temporal.PlainDateTime;
}
const props = withDefaults(defineProps<Props>(), {});

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
    @onWeekLabelDoubleLeft="emit('onWeekLabelDoubleLeft')"
    @onWeekLabelDoubleRight="emit('onWeekLabelDoubleRight')"
    @onWeekLabelLeft="emit('onWeekLabelLeft')"
    @onWeekLabelRight="emit('onWeekLabelRight')"
    @onWeekLabelTodayClick="emit('onWeekLabelTodayClick')"
  />
</template>
