<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, onUpdated } from "vue";
import { Temporal } from "@js-temporal/polyfill";
import {
  getTenseByDate,
  getTenseByDateTime,
  getWeekDayString,
} from "@/calendar";
import CalendarNavButtonRow from "@/components/elements/CalendarNavButtonRow.vue";
import DayColumnHeader from "@/components/elements/DayColumnHeader.vue";

const content = ref<HTMLElement | null>(null);
const top = ref<HTMLElement | null>(null);
const header = ref<HTMLElement | null>(null);
const headerDays = ref<HTMLElement | null>(null);
const side = ref<HTMLElement | null>(null);
const timeline = ref<HTMLElement | null>(null);
const matrix = ref<HTMLElement | null>(null);

interface Props {
  datetime: Temporal.PlainDateTime;
  firstDate: Temporal.PlainDate;
  lastDate: Temporal.PlainDate;
  navHints?: boolean;
  dayLightStart?: Temporal.PlainTime;
  dayLightEnd?: Temporal.PlainTime;
}
const props = withDefaults(defineProps<Props>(), {
  navHints: false,
  weekStart: 1,
  days: 7,
  dayLightStart: () => Temporal.PlainTime.from({ hour: 6 }),
  dayLightEnd: () => Temporal.PlainTime.from({ hour: 19 }),
});

interface HourInformation {
  datetime: Temporal.PlainDateTime;
  daylight: boolean;
  dayClass: string;
  weekdayClass: string;
  hourClass: string;
  rowNumber: number;
}

const days = computed(() => {
  const duration = props.firstDate.until(props.lastDate);
  if (duration.days <= 0) {
    throw new Error(
      `Calculated invalid number of days: ${duration.days} for WeekView.`
    );
  }

  const days = Array<Temporal.PlainDate>(duration.days);
  let currentDate = props.firstDate;
  for (let i = 0; i < days.length; i++) {
    days[i] = currentDate;
    currentDate = currentDate.add({ days: 1 });
  }
  return days;
});

const hours = computed(() => {
  const duration = props.firstDate.until(props.lastDate);
  if (duration.days <= 0) {
    throw new Error(
      `Calculated invalid number of days: ${duration.days} for WeekView.`
    );
  }

  const hours = Array<HourInformation>(duration.days * 24);
  for (
    let i = 0, d = 0, currentDay = props.firstDate;
    d < duration.days;
    d++, currentDay = currentDay.add({ days: 1 })
  ) {
    for (let h = 0; h < 24; h++, i++) {
      const time = Temporal.PlainTime.from({ hour: h });
      hours[i] = {
        datetime: Temporal.PlainDateTime.from({
          day: currentDay.day,
          month: currentDay.month,
          year: currentDay.year,
          hour: h,
        }),
        daylight: isDayLight(time),
        dayClass: `${currentDay.toString()}`,
        weekdayClass: getWeekDayString(currentDay),
        hourClass: `${time
          .toString({ smallestUnit: "minute" })
          .replace(":", "")}`,
        rowNumber: d,
      };
    }
  }

  return hours;
});

function get24Hours(): Array<Temporal.PlainTime> {
  const hours = Array<Temporal.PlainTime>(24);
  for (let i = 0; i < 24; i++) {
    hours[i] = Temporal.PlainTime.from({ hour: i });
  }
  return hours;
}

function isDayLight(time: Temporal.PlainTime) {
  if (!props.dayLightStart || !props.dayLightEnd) {
    throw new Error("Property 'dayLightStart' and/or 'dayLightEnd' invalid.");
  }
  return (
    Temporal.PlainTime.compare(time, props.dayLightStart) >= 0 &&
    Temporal.PlainTime.compare(time, props.dayLightEnd) < 0
  );
}

function onScroll() {
  if (
    content.value &&
    side.value &&
    timeline.value &&
    top.value &&
    header.value
  ) {
    timeline.value.style.top = -content.value.scrollTop + "px";
    header.value.style.left = -content.value.scrollLeft + "px";
  }
}

function applyHeaderSize() {
  if (matrix.value && header.value) {
    const dayCell = matrix.value.children.item(0) as HTMLElement | null;
    const cellWidth = dayCell?.getBoundingClientRect().width;
    if (!cellWidth) {
      console.warn(
        "Unable to get the exact width of a day cell in the matrix."
      );
      return;
    }
    if (dayCell && headerDays.value) {
      for (let i = 0; i < headerDays.value.children.length; i++) {
        const child = headerDays.value.children.item(i) as HTMLElement | null;
        if (child) {
          // TypeScript claims that style is a read-only property.
          // However, this is actually only partly true.
          // See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
          // How else to change the width of an element programmatically?
          child.style = `width: ${cellWidth}px;`;
        }
      }
    }
  }
}

onUpdated(() => {
  applyHeaderSize();
});

onMounted(() => {
  if (content.value) {
    content.value.onscroll = onScroll;
  }
  window.addEventListener("resize", applyHeaderSize);
  applyHeaderSize();
});

onUnmounted(() => {
  if (content.value) {
    content.value.onscroll = null;
  }
  window.removeEventListener("resize", applyHeaderSize);
});

const emit = defineEmits(["onDayLeftClick", "onDayRightClick"]);
</script>

<template>
  <div class="week-view">
    <div class="days-header-row-side">
      <div class="day-nav-buttons">
        <CalendarNavButtonRow
          :today="false"
          :double="false"
          :hint="props.navHints"
          :hints="{
            left: '-1',
            right: '+1',
          }"
          :tooltips="{
            left: $t('tooltip.week-view.days.nav.left'),
            right: $t('tooltip.week-view.days.nav.right'),
          }"
          @onLeftClick="emit('onDayLeftClick')"
          @onRightClick="emit('onDayRightClick')"
        />
      </div>
    </div>
    <div class="days-header-row"></div>
    <div class="all-day-row-side"></div>
    <div class="all-day-row"></div>
    <div class="content-side"></div>
    <div class="content" ref="content">
      <div class="side" ref="side">
        <div class="timeline" ref="timeline">
          <div v-for="(hour, index) in get24Hours()" :key="index" class="hour">
            {{ hour.toString({ smallestUnit: "minute" }) }}
          </div>
        </div>
      </div>
      <div class="top" ref="top">
        <div class="header" ref="header">
          <div class="days" ref="headerDays">
            <DayColumnHeader
              v-for="(day, index) in days"
              :key="index"
              :day="day"
              class="day row cell"
              :class="[getTenseByDate(day)]"
            />
          </div>
        </div>
      </div>
      <div class="matrix">
        <div
          class="days"
          :style="`grid-template-columns: repeat(${days.length},_1fr));`"
          ref="matrix"
        >
          <div
            v-for="(hourInformation, index) in hours"
            :key="index"
            class="day cell"
            :class="[
              hourInformation.dayClass,
              hourInformation.hourClass,
              hourInformation.weekdayClass,
              hourInformation.daylight ? 'daylight' : 'night',
              hourInformation.rowNumber === props.days - 1 ? 'lastRow' : '',
              getTenseByDateTime(hourInformation.datetime),
            ]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.week-view {
  @apply relative grid overflow-clip min-h-0 max-h-full;
  grid-template-columns: 4rem auto;
  grid-template-rows: 4rem 0.5rem minmax(auto, 1fr);
}

.week-view .days-header-row-side {
  @apply flex p-1 border-r;
}

.week-view .days-header-row-side .day-nav-buttons {
  @apply my-auto;
}

.week-view .all-day-row-side {
  @apply border-t;
}

.week-view .content-side {
}
.week-view .content {
  @apply overflow-scroll;
}

.week-view .content .top {
  @apply absolute overflow-hidden;
  top: 0;
  left: 4rem;
  height: 8rem;
}

.week-view .content .top .header {
  @apply relative;
}

.week-view .content .top .header .days {
  @apply relative grid grid-flow-col border-b;
}

.week-view .content .side {
  @apply absolute overflow-hidden border-r;
  left: 0;
  top: 4.5rem;
  width: 4rem;
}

.week-view .content .side .timeline {
  @apply relative;
}

.week-view .content .side .timeline .hour {
  @apply text-xs text-right text-gray-400 border-t;
  height: 3rem;
}

.week-view .content .matrix {
}

.week-view .content .matrix .days {
  @apply relative grow grid grid-flow-col grid-rows-[repeat(24,_3rem)];
}

.week-view .content .matrix .days .day.cell {
  @apply border-l border-t;
  min-width: 8rem;
}

.week-view .content .matrix .days .day.cell.night {
  @apply bg-gray-100;
}
</style>
