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

function getHours(): Array<Temporal.PlainTime> {
  const hours = Array<Temporal.PlainTime>(24);
  hours[0] = Temporal.PlainTime.from({ hour: 0 });
  for (let i = 1, currentHour = hours[0]; i < hours.length; i++) {
    currentHour = currentHour.add({ hours: 1 });
    hours[i] = currentHour;
  }
  return hours;
}

function dayToClass(day: Temporal.PlainDate): string {
  return (
    ("0000" + day.year).slice(-4) +
    ("00" + day.month).slice(-2) +
    ("00" + day.day).slice(-2)
  );
}

function hourToClass(hour: Temporal.PlainTime): string {
  return ("00" + hour.hour).slice(-2) + ("00" + hour.minute).slice(-2);
}

function isDayTime(hour: Temporal.PlainTime): boolean {
  if (!props.dayLightStart || !props.dayLightEnd) {
    return false;
  }
  return (
    Temporal.PlainTime.compare(props.dayLightStart, hour) <= 0 &&
    Temporal.PlainTime.compare(hour, props.dayLightEnd) < 0
  );
}
</script>

<template>
  <div
    v-for="(hour, index) in getHours()"
    :key="index"
    class="day-row hour"
    :class="[
      dayToClass(props.day),
      hourToClass(hour),
      isDayTime(hour) ? 'daytime' : 'night',
    ]"
  ></div>
</template>

<style scoped>
.day-row {
}

.day-row.hour {
  @apply border-t h-12;
}

.day-row.hour.night {
  @apply bg-gray-100;
}

.day-row.hour:first-child {
  @apply border-t-0;
}
</style>
