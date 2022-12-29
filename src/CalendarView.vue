<script setup lang="ts">
import { ref } from "vue";
import { Temporal } from "@js-temporal/polyfill";
import CalendarHeader from "@/components/CalendarHeader.vue";
import CalendarMain from "@/components/CalendarMain.vue";
import CalendarFooter from "@/components/CalendarFooter.vue";
import CalendarSideBar from "@/components/CalendarSideBar.vue";

interface Props {
  initialDate?: Temporal.PlainDateTime;
}

const props = withDefaults(defineProps<Props>(), {
  initialDate: Temporal.Now.plainDateTimeISO(),
});

const currentDate = ref(Temporal.PlainDateTime.from(props.initialDate));

function headerShiftDoubleLeft() {
  currentDate.value = currentDate.value.subtract({ months: 6 });
}

function headerShiftDoubleRight() {
  currentDate.value = currentDate.value.add({ months: 6 });
}

function headerShiftLeft() {
  currentDate.value = currentDate.value.subtract({ months: 3 });
}

function headerShiftRight() {
  currentDate.value = currentDate.value.add({ months: 3 });
}

function weekShiftDoubleLeft() {
  currentDate.value = currentDate.value.subtract({ weeks: 4 });
}

function weekShiftDoubleRight() {
  currentDate.value = currentDate.value.add({ weeks: 4 });
}

function weekShiftLeft() {
  currentDate.value = currentDate.value.subtract({ weeks: 1 });
}

function weekShiftRight() {
  currentDate.value = currentDate.value.add({ weeks: 1 });
}

function selectDay(day: Temporal.PlainDate) {
  currentDate.value = Temporal.PlainDateTime.from({
    day: day.day,
    month: day.month,
    year: day.year,
  });
}

function selectToday() {
  currentDate.value = Temporal.Now.plainDateTimeISO();
}
</script>

<template>
  <div class="calendar-app">
    <CalendarHeader
      class="header"
      :datetime="currentDate"
      @onDoubleLeft="headerShiftDoubleLeft()"
      @onDoubleRight="headerShiftDoubleRight()"
      @onLeft="headerShiftLeft()"
      @onRight="headerShiftRight()"
      @onTodayClick="selectToday()"
    />
    <div class="height-wrapper">
      <div class="body">
        <CalendarSideBar
          :datetime="currentDate"
          @onDayClick="selectDay($event)"
        />
        <CalendarMain
          :datetime="currentDate"
          @onWeekLabelDoubleLeft="weekShiftDoubleLeft()"
          @onWeekLabelDoubleRight="weekShiftDoubleRight()"
          @onWeekLabelLeft="weekShiftLeft()"
          @onWeekLabelRight="weekShiftRight()"
          @onWeekLabelTodayClick="selectToday()"
        />
      </div>
    </div>
    <CalendarFooter class="footer" :datetime="currentDate" />
  </div>
</template>

<style scoped>
.calendar-app {
  @apply flex flex-col h-screen;
}

.calendar-app .header {
  @apply flex-none;
}

.calendar-app .height-wrapper {
  @apply grow h-0;
}

.calendar-app .height-wrapper .body {
  @apply relative flex-none flex flex-row;
  height: 100%;
}

.calendar-app .footer {
  @apply flex-none;
}
</style>
