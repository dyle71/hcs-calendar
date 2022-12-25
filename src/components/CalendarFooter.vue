<script setup lang="ts">
import { PropType } from "vue";
import { Temporal } from "@js-temporal/polyfill";

interface Props {
  date: PropType<Temporal.PlainDateTime>;
}

const props = withDefaults(defineProps<Props>(), {});
console.log("CalendarFooter: ", props.date);
</script>

<template>
  <div class="calendar-footer">CalendarFooter</div>
</template>

<style scoped>
.calendar-footer {
  @apply flex;
}
</style>
