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
    <div class="header">
      <DayColumnHeader
        v-for="(dayInformation, index) in getDays()"
        :key="index"
        :day="dayInformation.day"
      />
    </div>
    <div class="matrix">
      <div class="side">Side</div>
      <div class="days">Days</div>
    </div>
  </div>
</template>

<style scoped>
.week-view {
  @apply relative flex flex-col select-none w-full;
  height: inherit;
}

.week-view .header {
  @apply flex flex-row;
}

.week-view .matrix {
  @apply flex flex-row w-full h-full overflow-y-scroll;
  height: inherit;
}

.week-view .matrix .side {
  @apply w-12;
}

.week-view .matrix .days {
  @apply w-full;
  @apply bg-amber-400;
  height: 2000px;
}
</style>
