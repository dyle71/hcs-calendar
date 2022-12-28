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
    <div class="body">
      <CalendarSideBar
        :datetime="props.initialDate"
        @onDayClick="selectDay($event)"
      />
      <CalendarMain :datetime="props.initialDate" />
    </div>
    <CalendarFooter class="footer" :datetime="props.initialDate" />
  </div>
</template>

<style scoped>
.calendar-app {
  @apply relative flex flex-col;
}

.calendar-app .header {
  @apply flex-none;
}

.calendar-app .body {
  @apply flex-auto flex flex-row;
  height: 700px;
}

.calendar-app .footer {
  @apply flex-none;
}
</style>
