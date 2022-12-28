<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";

interface Props {
  day: Temporal.PlainDate;
  dayLightStart?: Temporal.PlainTime;
  dayLightEnd?: Temporal.PlainTime;
}
const props = withDefaults(defineProps<Props>(), {
  dayLightStart: Temporal.PlainTime.from({ hour: 6 }),
  dayLightEnd: Temporal.PlainTime.from({ hour: 20 }),
});

const today = Temporal.Now.plainDateISO();
</script>

<template>
  <div class="day-column">
    <div class="weekday-header">
      {{ $t("weekday.short." + props.day.dayOfWeek) }}
    </div>
    <div
      class="dayofmonth-header"
      :class="{ today: Temporal.PlainDate.compare(props.day, today) === 0 }"
    >
      {{ props.day.day }}
    </div>
  </div>
</template>

<style scoped>
.day-column {
  @apply m-0 p-2 border-b border-r w-full;
}

.day-column .weekday-header {
  @apply mx-auto w-full text-gray-500 text-xs uppercase text-center select-none py-2;
}

.day-column:last-child {
  @apply border-r-0;
}

.day-column .dayofmonth-header {
  @apply m-auto text-xl p-2 text-center align-middle rounded-full w-12 h-12;
  @apply hover:bg-gray-200;
}

.day-column .dayofmonth-header.today {
  @apply m-auto text-xl p-2 text-center align-middle bg-fuchsia-400 rounded-full w-12 h-12;
}
</style>
