<script setup lang="ts">
import { computed } from "vue";
import { Temporal } from "@js-temporal/polyfill";
import { isDateBetween } from "@/calendar";
import MonthLabel from "@/components/elements/MonthLabel.vue";
import ToolTip from "@/components/elements/ToolTip.vue";

import CalendarNavButtonRow from "@/components/elements/CalendarNavButtonRow.vue";

interface Props {
  date: Temporal.PlainDate;
  navHints?: boolean;
  startDayOfWeek?: number;
  highlightDays?: boolean;
  firstHighlightedDate?: Temporal.PlainDate | null;
  lastHighlightedDate?: Temporal.PlainDate | null;
}
const props = withDefaults(defineProps<Props>(), {
  startDayOfWeek: 1,
  navHints: false,
  highlightDays: true,
  firstHighlightedDate: null,
  lastHighlightedDate: null,
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
  highlighted?: boolean;
  past?: boolean;
  today?: boolean;
  future?: boolean;
  weekNumber?: boolean;
  weekDayClass?: string;
  text?: string;
}

const firstDayOfGrid = computed<Temporal.PlainDate>(() => {
  let firstDayOfGrid = firstDayOfMonth.value;
  while (firstDayOfGrid.dayOfWeek != props.startDayOfWeek) {
    firstDayOfGrid = firstDayOfGrid.subtract({ days: 1 });
  }
  return firstDayOfGrid;
});

const firstDayOfMonth = computed<Temporal.PlainDate>(() => {
  return Temporal.PlainDate.from({
    day: 1,
    month: props.date.month,
    year: props.date.year,
  });
});

const lastDayOfMonth = computed<Temporal.PlainDate>(() => {
  const nextMonth = firstDayOfMonth.value.add({ days: 31 });
  return Temporal.PlainDate.from({
    day: 1,
    month: nextMonth.month,
    year: nextMonth.year,
  }).subtract({ days: 1 });
});

const monthSpecs = computed<MonthSpecification>(() => {
  return {
    firstDayOfGrid: firstDayOfGrid.value,
    firstDayOfMonth: firstDayOfMonth.value,
    lastDayOfMonth: lastDayOfMonth.value,
  };
});

function getDayInformation(
  date: Temporal.PlainDate,
  monthSpecs: MonthSpecification
): DayInformation {
  const today = Temporal.Now.plainDateISO();
  const compareToToday = Temporal.PlainDate.compare(date, today);
  const highlighted =
    props.highlightDays &&
    props.firstHighlightedDate != null &&
    props.lastHighlightedDate != null
      ? isDateBetween(
          date,
          props.firstHighlightedDate,
          props.lastHighlightedDate
        )
      : false;
  return {
    date: date,
    inMonth: isInMonth(date, monthSpecs),
    highlighted,
    past: compareToToday === -1,
    today: compareToToday === 0,
    future: compareToToday === 1,
  };
}

function getWeekDayClass(weekDay: number): string {
  if (!weekDay || weekDay < 0) {
    throw new Error("weekDay in getWeekDayClass must be a positive value.");
  }
  return [
    "?",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ][((weekDay - 1) % 7) + 1];
}

const monthMatrix = computed<Array<DayInformation | null>>(() => {
  const matrix = Array<DayInformation | null>(8 * 7);
  matrix[0] = null;
  for (let i = 0; i < 7; i++) {
    matrix[1 + i] = {
      header: true,
      text: `weekday.one.${((props.startDayOfWeek - 1 + i) % 7) + 1}`,
      weekDayClass: getWeekDayClass(props.startDayOfWeek + i),
    };
  }

  let i = 8;
  let matrixDate = monthSpecs.value.firstDayOfGrid;
  for (let row = 0; row < (matrix.length - 8) / 8; row++) {
    const element = getDayInformation(matrixDate, monthSpecs.value);
    element.header = false;
    element.weekNumber = true;
    element.text = matrixDate.weekOfYear.toString();
    matrix[i] = element;
    i++;

    for (let col = 0; col < 7; col++) {
      const element = getDayInformation(matrixDate, monthSpecs.value);
      element.header = false;
      element.weekNumber = false;
      element.weekDayClass = getWeekDayClass(matrixDate.dayOfWeek);
      element.text = matrixDate.day.toString();
      matrix[i] = element;
      i++;
      matrixDate = matrixDate.add({ days: 1 });
    }
  }

  return matrix;
});

function isInMonth(
  date: Temporal.PlainDate,
  monthSpecs: MonthSpecification
): boolean {
  return date.month === monthSpecs.firstDayOfMonth.month;
}

const emit = defineEmits([
  "onLeftClick",
  "onRightClick",
  "onDayClick",
  "onTodayClick",
]);
</script>

<template>
  <div class="month-mini-view">
    <div class="header">
      <div class="month-label">
        <MonthLabel :date="props.date" />
      </div>

      <CalendarNavButtonRow
        class="nav"
        :hint="props.navHints"
        :hints="{
          left: '-1',
          right: '+1',
        }"
        :tooltips="{
          left: $t('tooltip.monthMap.header.month.previous'),
          right: $t('tooltip.monthMap.header.month.next'),
          today: $t('tooltip.monthMap.header.month.today'),
        }"
        @onLeftClick="emit('onLeftClick')"
        @onTodayClick="emit('onTodayClick')"
        @onRightClick="emit('onRightClick')"
      />
    </div>

    <div class="body">
      <div
        v-for="(element, index) in monthMatrix"
        :key="index"
        class="grid-element"
      >
        <div
          v-if="element?.header"
          class="column-header"
          :class="[element?.weekDayClass]"
        >
          {{ $t(element?.text) }}
        </div>
        <div v-else-if="element?.weekNumber" class="weeknumber">
          {{ element?.text }}
          <ToolTip>
            {{ $t("tooltip.monthMap.weekOfYear") + element?.text }}
          </ToolTip>
        </div>
        <div
          v-else-if="element?.text"
          class="day"
          :class="[
            element?.inMonth ? 'in-month' : '',
            element?.highlighted ? 'highlight' : '',
            element?.past ? 'past' : '',
            element?.today ? 'today' : '',
            element?.future ? 'future' : '',
            element?.weekDayClass,
          ]"
        >
          <button
            class="inner"
            @click.prevent="emit('onDayClick', element.date)"
          >
            {{ element?.text }}
            <ToolTip>
              {{ element.date.toString() }}
            </ToolTip>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.month-mini-view {
  @apply relative select-none min-w-max;
}

.month-mini-view .header {
  @apply flex flex-row text-sm mb-1 justify-between;
}

.month-mini-view .header .nav {
  @apply my-auto ml-auto mr-0 h-6 w-[18];
}

.month-mini-view .body .sunday {
  @apply text-red-500;
}

.month-mini-view .header .month-label {
  @apply ml-0 mr-auto;
}

.month-mini-view .body {
  @apply grid grid-cols-8 text-xs text-gray-500;
}

.month-mini-view .body .grid-element {
  @apply text-center m-0 p-0 w-full h-full;
}

.month-mini-view .body .weeknumber {
  @apply h-full bg-gray-200 pt-1.5;
}

.month-mini-view .body .day {
}

.month-mini-view .body .day .inner {
  font-size: 85%;
  @apply rounded-full m-1 p-0.5 h-5 w-5;
  @apply hover:bg-gray-200 hover:cursor-pointer focus:outline-0;
}

.month-mini-view .body .in-month {
  @apply text-black font-medium;
}

.month-mini-view .body .today .inner {
  @apply bg-amber-300;
}

.month-mini-view .body .in-month {
  @apply bg-slate-300;
}

.month-mini-view .body .highlight {
  @apply bg-blue-300;
}

.month-mini-view .body .sunday {
  @apply text-red-500;
}
</style>
