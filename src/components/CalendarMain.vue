<script setup lang="ts">
import { PropType } from "vue";
import { Temporal } from "@js-temporal/polyfill";

interface Props {
  date: PropType<Temporal.PlainDateTime>;
}

const props = withDefaults(defineProps<Props>(), {});
console.log("CalendarMain: ", props.date);
</script>

<template>
  <div class="calendar-main">CalendarMain</div>
</template>

<style scoped>
.calendar-main {
  @apply grow flex min-w-max min-h-max max-h-full;
  @apply mb-auto;
}
</style>
