<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import MonthLabel from "@/components/elements/MonthLabel.vue";
import ShiftButton from "@/components/elements/ShiftButton.vue";
import ArrowToBottom from "@/components/icons/ArrowToBottom.vue";

interface Props {
  date: Temporal.PlainDate;
  startDayOfWeek?: number;
}
const props = withDefaults(defineProps<Props>(), {
  startDayOfWeek: 1,
});

interface MonthSpecification {
  firstDayOfGrid: Temporal.PlainDate;
  firstDayOfMonth: Temporal.PlainDate;
  lastDayOfMonth: Temporal.PlainDate;
}

interface DayInformation {
  date?: Temporal.PlainDate;
  header?: boolean;
  inMonth?: boolean;
  past?: boolean;
  today?: boolean;
  future?: boolean;
  weekNumber?: boolean;
  text?: string;
}

function getDayInformation(
  date: Temporal.PlainDate,
  monthSpecs: MonthSpecification
): DayInformation {
  const today = Temporal.Now.plainDateISO();
  const compareToToday = Temporal.PlainDate.compare(date, today);
  return {
    date: date,
    inMonth: isInMonth(date, monthSpecs),
    past: compareToToday === -1,
    today: compareToToday === 0,
    future: compareToToday === 1,
  };
}

function getMonthMatrix(): Array<DayInformation | null> {
  const monthSpecs = getMonthSpecs();

  const matrix = Array<DayInformation | null>(8 * 6);
  matrix[0] = null;
  for (let i = 0; i < 7; i++) {
    matrix[1 + i] = {
      header: true,
      text: `weekday.one.${((props.startDayOfWeek - 1 + i) % 7) + 1}`,
    };
  }

  let i = 8;
  let matrixDate = monthSpecs.firstDayOfGrid;
  for (let row = 0; row < (matrix.length - 8) / 8; row++) {
    const element = getDayInformation(matrixDate, monthSpecs);
    element.header = false;
    element.weekNumber = true;
    element.text = matrixDate.weekOfYear.toString();
    matrix[i] = element;
    i++;

    for (let col = 0; col < 7; col++) {
      const element = getDayInformation(matrixDate, monthSpecs);
      element.header = false;
      element.weekNumber = false;
      element.text = matrixDate.day.toString();
      matrix[i] = element;
      i++;
      matrixDate = matrixDate.add({ days: 1 });
    }
  }

  return matrix;
}

function getMonthSpecs(): MonthSpecification {
  if (
    props.startDayOfWeek < 1 ||
    props.startDayOfWeek > props.date.daysInWeek
  ) {
    throw new Error(
      `Invalid startDayOfWeek value: ${props.startDayOfWeek}. Choose a number between 1 and 7.`
    );
  }

  let firstDayOfMonth = Temporal.PlainDate.from({
    day: 1,
    month: props.date.month,
    year: props.date.year,
  });
  // last day of month seems a bit awkward, but we try to cope
  // with various overlaps of months and years.
  let lastDayOfMonth = firstDayOfMonth.add({ days: 31 });
  lastDayOfMonth = Temporal.PlainDate.from({
    day: 1,
    month: lastDayOfMonth.month,
    year: lastDayOfMonth.year,
  }).subtract({ days: 1 });

  let firstDayOfGrid = firstDayOfMonth;
  while (firstDayOfGrid.dayOfWeek != props.startDayOfWeek) {
    firstDayOfGrid = firstDayOfGrid.subtract({ days: 1 });
  }

  return { firstDayOfGrid, firstDayOfMonth, lastDayOfMonth };
}

function isInMonth(
  date: Temporal.PlainDate,
  monthSpecs: MonthSpecification
): boolean {
  const lowerBound = Temporal.PlainDate.compare(
    date,
    monthSpecs.firstDayOfMonth
  );
  const upperBound = Temporal.PlainDate.compare(
    date,
    monthSpecs.lastDayOfMonth
  );

  return lowerBound >= 0 && upperBound <= 0;
}

const emit = defineEmits(["onLeft", "onRight", "onDayClick", "onTodayClick"]);
</script>

<template>
  <div class="month-mini-view">
    <div class="month-mini-view__header">
      <div class="month-mini-view__header__month-label">
        <MonthLabel :date="props.date" />
      </div>
      <div class="month-mini-view__header__button-row">
        <ShiftButton
          class="month-mini-view__header__button"
          direction="left"
          @click="emit('onLeft')"
        />
        <button @click.prevent="emit('onTodayClick')">
          <ArrowToBottom class="month-mini-view__header__button" />
        </button>
        <ShiftButton
          class="month-mini-view__header__button"
          direction="right"
          @click="emit('onRight')"
        />
      </div>
    </div>

    <div class="month-mini-view__body">
      <div
        v-for="(element, index) in getMonthMatrix()"
        :key="index"
        class="month-mini-view__body__grid-element"
      >
        <div
          v-if="element?.header"
          class="month-mini-view__body__column-header"
        >
          {{ $t(element?.text) }}
        </div>
        <div
          v-else-if="element?.weekNumber"
          class="month-mini-view__body__weeknumber"
        >
          {{ element?.text }}
        </div>
        <div v-else-if="element?.text" class="month-mini-view__body__day">
          <button
            class="month-mini-view__body__day__inner"
            @click.prevent="emit('onDayClick', element.date)"
            :class="{
              'in-month': element?.inMonth,
              past: element?.past,
              today: element?.today,
              future: element?.future,
              monday: element?.date.dayOfWeek === 1,
              tuesday: element?.date.dayOfWeek === 2,
              wednesday: element?.date.dayOfWeek === 3,
              thursday: element?.date.dayOfWeek === 4,
              friday: element?.date.dayOfWeek === 5,
              saturday: element?.date.dayOfWeek === 6,
              sunday: element?.date.dayOfWeek === 7,
            }"
          >
            {{ element?.text }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.month-mini-view {
  @apply relative select-none;
}

.month-mini-view__header {
  @apply flex flex-row text-sm gap-1 mb-1;
}

.month-mini-view__header__month-label {
  @apply mr-auto;
}

.month-mini-view__header__button {
  @apply w-4 h-4;
  @apply relative my-auto rounded-full fill-fuchsia-700;
  @apply hover:bg-gray-300;
  @apply disabled:fill-gray-500;
}

.month-mini-view__header__button-row {
  @apply flex flex-row;
}

.month-mini-view__body {
  @apply grid grid-cols-8 text-xs text-gray-500;
}

.month-mini-view__body__grid-element {
  @apply text-center m-0 p-0 w-full h-full;
}

.month-mini-view__body__weeknumber {
  @apply h-full bg-gray-200 pt-1.5;
}

.month-mini-view__body__day__inner {
  font-size: 85%;
  @apply rounded-full m-1 p-0.5 h-5 w-5;
  @apply hover:bg-gray-200 hover:cursor-pointer;
}

.month-mini-view__body .in-month {
  @apply text-black font-medium;
}

.month-mini-view__body .today {
  @apply bg-fuchsia-400;
}

.month-mini-view__body .sunday {
  @apply text-red-500;
}
</style>
