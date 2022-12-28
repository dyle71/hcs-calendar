<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import WeekView from "@/components/elements/WeekView.vue";

interface Props {
  datetime: Temporal.PlainDateTime;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <WeekView class="calendar-week-view" :datetime="props.datetime" />
</template>

<style scoped>
.calendar-week-view {
  @apply grow mb-auto w-full;
  height: inherit;
}
</style>
