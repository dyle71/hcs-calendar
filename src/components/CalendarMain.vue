<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import WeekView from "@/components/elements/WeekView.vue";

interface Props {
  datetime: Temporal.PlainDateTime;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <WeekView class="calendar-main" :datetime="props.datetime" />
</template>

<style scoped>
.calendar-main {
  @apply grow flex min-w-max min-h-max max-h-full;
  @apply mb-auto;
}
</style>
