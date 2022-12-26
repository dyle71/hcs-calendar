<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";

interface Props {
  datetime: Temporal.PlainDateTime;
}
const props = withDefaults(defineProps<Props>(), {});

console.log("CalendarFooter: ", props.datetime);
</script>

<template>
  <div class="calendar-footer">CalendarFooter</div>
</template>

<style scoped>
.calendar-footer {
  @apply flex;
}
</style>
