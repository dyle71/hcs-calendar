<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, onUpdated } from "vue";
import { Temporal } from "@js-temporal/polyfill";
import {
  getTenseByDate,
  getTenseByDateTime,
  getWeekDayString,
  isDateTimeBetween,
} from "@/calendar";
import CalendarNavButtonRow from "@/components/elements/CalendarNavButtonRow.vue";
import DayColumnHeader from "@/components/elements/DayColumnHeader.vue";
import NowMark from "@/components/icons/NowMark.vue";

interface Props {
  readonly datetime: Temporal.PlainDateTime;
  readonly firstDate: Temporal.PlainDate;
  readonly lastDate: Temporal.PlainDate;
  readonly navHints?: boolean;
  readonly showNow?: boolean;
  readonly dayLightStart?: Temporal.PlainTime;
  readonly dayLightEnd?: Temporal.PlainTime;
}

const props = withDefaults(defineProps<Props>(), {
  navHints: false,
  showNow: true,
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

const refs = {
  content: ref<HTMLElement | null>(null),
  top: ref<HTMLElement | null>(null),
  header: ref<HTMLElement | null>(null),
  headerAllDays: ref<HTMLElement | null>(null),
  headerDays: ref<HTMLElement | null>(null),
  side: ref<HTMLElement | null>(null),
  timeline: ref<HTMLElement | null>(null),
  matrix: ref<HTMLElement | null>(null),
  nowMark: ref<InstanceType<typeof NowMark> | null>(null),
};

const today: Temporal.PlainDate = Temporal.Now.plainDateISO();
let tickTimer: ReturnType<typeof setInterval> | null = null;

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

function applyHeaderSize(): void {
  if (refs.matrix.value && refs.header.value) {
    const dayCell = refs.matrix.value.children.item(0) as HTMLElement | null;
    const cellWidth = dayCell?.getBoundingClientRect().width;
    if (!cellWidth) {
      console.warn(
        "Unable to get the exact width of a day cell in the matrix."
      );
      return;
    }
    if (cellWidth) {
      if (refs.header.value) {
        applyWidthToChildren(refs.header.value.children, cellWidth);
      }
      if (refs.headerAllDays.value) {
        applyWidthToChildren(refs.headerAllDays.value.children, cellWidth);
      }
    }
  }
}

function applyWidthToChildren(collection: HTMLCollection, width: number): void {
  for (let i = 0; i < collection.length; i++) {
    const child = collection.item(i) as HTMLElement | null;
    if (child) {
      child.setAttribute("style", `width: ${width}px;`);
    }
  }
}

function get24Hours(): Array<Temporal.PlainTime> {
  const hours = Array<Temporal.PlainTime>(24);
  for (let i = 0; i < 24; i++) {
    hours[i] = Temporal.PlainTime.from({ hour: i });
  }
  return hours;
}

function isDayLight(time: Temporal.PlainTime): boolean {
  if (!props.dayLightStart || !props.dayLightEnd) {
    throw new Error("Property 'dayLightStart' and/or 'dayLightEnd' invalid.");
  }
  return (
    Temporal.PlainTime.compare(time, props.dayLightStart) >= 0 &&
    Temporal.PlainTime.compare(time, props.dayLightEnd) < 0
  );
}

function onScroll(): void {
  if (refs.matrix.value) {
    if (refs.timeline.value) {
      refs.timeline.value.style.top = -refs.matrix.value.scrollTop + "px";
    }
    if (refs.header.value) {
      refs.header.value.style.left = -refs.matrix.value.scrollLeft + "px";
    }
    if (refs.headerAllDays.value) {
      refs.headerAllDays.value.style.left =
        -refs.matrix.value.scrollLeft + "px";
    }
  }
}

function setNowMark() {
  if (props.showNow && refs.nowMark.value && refs.matrix.value) {
    const now = Temporal.Now.plainDateTimeISO();
    if (
      !isDateTimeBetween(
        now,
        Temporal.PlainDateTime.from(props.firstDate),
        Temporal.PlainDateTime.from(props.lastDate)
      )
    ) {
      refs.nowMark.value.$el.style.display = "none";
      return;
    }
    refs.nowMark.value.$el.style.display = "block";

    const dayClass = `${Temporal.PlainDate.from(now).toString()}`;
    const hourClass = now.hour.toString().padStart(2, "0") + "00";

    const dayCells = refs.matrix.value.getElementsByClassName(
      `${dayClass} ${hourClass}`
    );
    if (dayCells.length === 1) {
      const dayCell = dayCells.item(0) as HTMLElement;
      const cellRect = dayCell.getBoundingClientRect();
      const minutePercentage = now.minute / 60;
      const nowTop = dayCell.offsetTop + cellRect.height * minutePercentage;
      refs.nowMark.value.$el.style.width = `${cellRect.width}px`;
      refs.nowMark.value.$el.style.top = `${nowTop}px`;
      refs.nowMark.value.$el.style.left = `${dayCell.offsetLeft}px`;
    }
  }
}

function tick() {
  setNowMark();
}

onUpdated(() => {
  applyHeaderSize();
  setNowMark();
});

onMounted(() => {
  if (refs.matrix.value) {
    refs.matrix.value.onscroll = onScroll;
  }
  window.addEventListener("resize", applyHeaderSize);
  applyHeaderSize();
  if (props.showNow) {
    tickTimer = setInterval(tick, 1000);
  } else {
    tickTimer = null;
  }
  applyHeaderSize();
  setNowMark();
});

onUnmounted(() => {
  if (refs.content.value) {
    refs.content.value.onscroll = null;
  }
  if (tickTimer) {
    clearInterval(tickTimer);
  }
  window.removeEventListener("resize", applyHeaderSize);
});

const emit = defineEmits(["onDayLeftClick", "onDayRightClick"]);
</script>

<template>
  <div class="week-view">
    <div class="day-nav-cell">
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

    <div class="header-blend">
      <div class="header" :ref="refs.header">
        <DayColumnHeader
          v-for="(day, index) in days"
          :key="index"
          :day="day"
          class="day row cell"
          :class="[getTenseByDate(day)]"
        />
      </div>
    </div>

    <div class="all-days-side"></div>
    <div class="all-days-blend">
      <div class="all-days" :ref="refs.headerAllDays">
        <div
          v-for="(day, index) in days"
          :key="index"
          class="all-day row cell"
          :class="[
            day.toString(),
            getTenseByDate(day),
            Temporal.PlainDate.compare(day, today) === 0 ? 'today' : '',
            getWeekDayString(day),
          ]"
        ></div>
      </div>
    </div>

    <div class="timeline-blend">
      <div class="timeline" :ref="refs.timeline">
        <div v-for="(hour, index) in get24Hours()" :key="index" class="hour">
          {{ hour.toString({ smallestUnit: "minute" }) }}
        </div>
      </div>
    </div>

    <div
      class="matrix"
      :style="`grid-template-columns: repeat(${days.length},_1fr));`"
      :ref="refs.matrix"
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
          hourInformation.rowNumber === days.length - 1 ? 'lastRow' : '',
          getTenseByDateTime(hourInformation.datetime),
        ]"
      ></div>
      <NowMark v-if="showNow" class="now" :ref="refs.nowMark" />
    </div>
  </div>
</template>

<style scoped>
.week-view {
  /* Variables which define the dimensions of some elements of the week view. */
  --left-side-bar-width: 4rem;
  --header-row-height: 4rem;
  --all-day-row-height: 4rem;
  --hour-cell-height: 3rem;
  --hour-cell-min-width: 8rem;

  @apply relative grid overflow-clip min-h-0 max-h-full;
  grid-template-columns: var(--left-side-bar-width, 4rem) auto;
  grid-template-rows:
    var(--header-row-height)
    var(--all-day-row-height)
    minmax(auto, 1fr);
}

.week-view .day-nav-cell {
  @apply flex border-b border-r;
}

.week-view .day-nav-cell .day-nav-buttons {
  @apply my-auto;
}

.week-view .header-blend {
  @apply border-b overflow-hidden;
}

.week-view .header {
  @apply relative flex flex-row;
}

.week-view .header .cell {
  @apply border-r;
  min-width: var(--hour-cell-min-width);
}

.week-view .all-days-side {
  @apply border-b border-r;
}

.week-view .all-days-blend {
  @apply border-b overflow-hidden;
}

.week-view .all-days {
  @apply relative flex flex-row;
}

.week-view .all-days .cell {
  @apply border-r;
  min-width: var(--hour-cell-min-width);
  min-height: var(--all-day-row-height);
}

.week-view .timeline-blend {
  @apply overflow-hidden;
}

.week-view .timeline {
  @apply relative flex flex-col overflow-hidden;
}

.week-view .timeline .hour {
  @apply flex-none text-xs text-right text-gray-400 border-b border-r;
  height: var(--hour-cell-height);
}

.week-view .matrix {
  @apply relative grow grid grid-flow-col grid-rows-[repeat(24,_var(--hour-cell-height))] overflow-scroll;
}

.week-view .matrix .cell {
  @apply border-b border-r;
  min-width: var(--hour-cell-min-width);
}

.week-view .matrix .cell.night {
  @apply bg-gray-100;
}

.week-view .matrix .now {
  @apply absolute;
}
</style>
