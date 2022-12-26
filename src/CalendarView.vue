<script setup lang="ts">
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

function headerShiftDoubleLeft() {
  console.log("headerShiftDoubleLeft");
}

function headerShiftDoubleRight() {
  console.log("headerShiftDoubleLeft");
}

function headerShiftLeft() {
  console.log("headerShiftLeft");
}

function headerShiftRight() {
  console.log("headerShiftLeft");
}

function selectDay(day: Temporal.PlainDate) {
  console.log("selectDay", day);
}

function selectNextMonth() {
  console.log("selectNextMonth");
}

function selectPreviousMonth() {
  console.log("selectPreviousMonth");
}
</script>

<template>
  <div class="calendar-container">
    <CalendarHeader
      class="calendar-container__header"
      :datetime="props.initialDate"
      @onDoubleLeft="headerShiftDoubleLeft()"
      @onDoubleRight="headerShiftDoubleRight()"
      @onLeft="headerShiftLeft()"
      @onRight="headerShiftRight()"
    />
    <div class="calendar-container__body">
      <CalendarSideBar
        class="calendar-container__body__sidebar"
        :datetime="props.initialDate"
        @onPreviousMonth="selectPreviousMonth"
        @onNextMonth="selectNextMonth"
        @onDayClick="selectDay($event)"
      />
      <CalendarMain
        class="calendar-container__body__main"
        :datetime="props.initialDate"
      />
    </div>
    <CalendarFooter
      class="calendar-container__footer"
      :datetime="props.initialDate"
    />
  </div>
</template>

<style scoped>
.calendar-container {
  @apply relative flex flex-col max-h-full;
}

.calendar-container__header {
  @apply flex-none;
}

.calendar-container__body {
  @apply flex-auto flex flex-row h-auto;
}

.calendar-container__body__sidebar {
}

.calendar-container__body__main {
}

.calendar-container__footer {
  @apply flex-none;
}
</style>
