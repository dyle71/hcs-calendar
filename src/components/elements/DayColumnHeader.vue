<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import { getTenseByDate, getWeekDayString } from "@/calendar";

interface Props {
  day: Temporal.PlainDate;
}
const props = withDefaults(defineProps<Props>(), {});
const today: Temporal.PlainDate = Temporal.Now.plainDateISO();
</script>

<template>
  <div class="day-column-header" :class="[getTenseByDate(props.day)]">
    <div
      class="dayofmonth-header"
      :class="[
        Temporal.PlainDate.compare(props.day, today) === 0 ? 'today' : '',
        getWeekDayString(props.day),
      ]"
    >
      {{ props.day.day }}
    </div>
    <div class="date">
      <div class="weekday" :class="[getWeekDayString(props.day)]">
        {{ $t("weekday.short." + props.day.dayOfWeek) }}
      </div>
      <div class="month" :class="[getWeekDayString(props.day)]">
        {{ $t(`month.long.${props.day.month}`) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.day-column-header {
  @apply flex flex-row p-2 gap-2;
}

.day-column-header .dayofmonth-header {
  @apply text-xl p-2 text-center align-middle rounded-full w-12 h-12 select-none;
  @apply hover:bg-gray-100;
}

.day-column-header .dayofmonth-header.sunday {
  @apply text-red-500;
}

.day-column-header .dayofmonth-header.today {
  @apply bg-amber-300 hover:bg-gray-100;
}

.day-column-header .date {
  @apply grow flex flex-col justify-center;
}

.day-column-header .weekday {
  @apply text-gray-500 text-xs uppercase text-left select-none;
}

.day-column-header .weekday.sunday {
  @apply text-red-500;
}

.day-column-header .month {
  @apply text-gray-500 text-xs text-left select-none;
}

.day-column-header .month.sunday {
  @apply text-red-500;
}
</style>
