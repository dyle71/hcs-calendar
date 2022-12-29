<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";

interface Props {
  day: Temporal.PlainDate;
}
const props = withDefaults(defineProps<Props>(), {});

const today = Temporal.Now.plainDateISO();

function getWeekDayClass(day: Temporal.PlainDate) {
  return [
    "?",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ][day.dayOfWeek];
}
</script>

<template>
  <div class="day-column-header">
    <div class="weekday-header" :class="[getWeekDayClass(props.day)]">
      {{ $t("weekday.short." + props.day.dayOfWeek) }}
    </div>
    <div
      class="dayofmonth-header"
      :class="[
        Temporal.PlainDate.compare(props.day, today) === 0 ? 'today' : '',
        getWeekDayClass(props.day),
      ]"
    >
      {{ props.day.day }}
    </div>
  </div>
</template>

<style scoped>
.day-column-header {
  @apply p-2 border-b border-r w-full;
}

.day-column-header .weekday-header {
  @apply text-gray-500 text-xs uppercase text-center select-none py-2;
}

.day-column-header .weekday-header.sunday {
  @apply text-red-500;
}

.day-column-header:last-child {
  @apply border-r-0;
}

.day-column-header .dayofmonth-header {
  @apply m-auto text-xl p-2 text-center align-middle rounded-full w-12 h-12;
  @apply hover:bg-gray-200;
}

.day-column-header .dayofmonth-header.sunday {
  @apply text-red-500;
}

.day-column-header .dayofmonth-header.today {
  @apply bg-fuchsia-400 hover:bg-fuchsia-500;
}
</style>
