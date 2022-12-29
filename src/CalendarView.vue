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
</script>

<template>
  <div class="calendar-app">
    <CalendarHeader
      class="header"
      :datetime="props.initialDate"
      @onDoubleLeft="headerShiftDoubleLeft()"
      @onDoubleRight="headerShiftDoubleRight()"
      @onLeft="headerShiftLeft()"
      @onRight="headerShiftRight()"
    />
    <div class="height-wrapper">
      <div class="body">
        <CalendarSideBar
          :datetime="props.initialDate"
          @onDayClick="selectDay($event)"
        />
        <CalendarMain :datetime="props.initialDate" />
      </div>
    </div>
    <CalendarFooter class="footer" :datetime="props.initialDate" />
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
