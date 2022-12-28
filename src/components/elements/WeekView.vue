<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import DayColumnHeader from "@/components/elements/DayColumnHeader.vue";

const MAX_DAYS_VISIBLE = 28;

interface Props {
  datetime: Temporal.PlainDateTime;
  firstDay?: "float" | "firstDayOfWeek";
  weekStart?: number;
  days?: number;
}
const props = withDefaults(defineProps<Props>(), {
  firstDay: "firstDayOfWeek",
  weekStart: 1,
  days: 7,
});

interface DayInformation {
  day: Temporal.PlainDate;
}

interface WeekDefinition {
  firstDay: Temporal.PlainDate;
  lastDay: Temporal.PlainDate;
}

function getDays(): Array<DayInformation> {
  if (props.days <= 0 || props.days > MAX_DAYS_VISIBLE) {
    throw new Error(
      `Invalid number of days for weekview: ${props.days}. Choose between 1 and ${MAX_DAYS_VISIBLE}.`
    );
  }

  const days = Array<DayInformation>(props.days);
  const weekDefinition = getWeekDefinition();
  for (let i = 0; i < props.days; i++) {
    days[i] = { day: weekDefinition.firstDay.add({ days: i }) };
  }
  return days;
}

function getWeekDefinition(): WeekDefinition {
  let firstDay = Temporal.PlainDate.from(props.datetime);
  if (props.firstDay === "firstDayOfWeek") {
    while (firstDay.dayOfWeek !== props.weekStart) {
      firstDay = firstDay.subtract({ days: 1 });
    }
  } else if (props.firstDay === "float") {
    if (props.days > 2) {
      firstDay = firstDay.subtract({ days: props.days / 3 });
    }
  } else {
    throw new Error(`unknown firstDay property value: ${props.firstDay}.`);
  }

  return { firstDay, lastDay: firstDay.add({ days: props.days }) };
}
</script>

<template>
  <div class="week-view">
    <div class="week-view__day-header">
      <DayColumnHeader
        v-for="(dayInformation, index) in getDays()"
        :key="index"
        :day="dayInformation.day"
      />
    </div>
    <div class="week-view__matrix"></div>
  </div>
</template>

<style scoped>
.week-view {
  @apply relative flex flex-col select-none w-full;
}

.week-view__day-header {
  @apply flex flex-row;
}

.week-view__matrix {
  @apply bg-amber-200;
}
</style>
