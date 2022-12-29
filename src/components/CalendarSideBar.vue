<script setup lang="ts">
import { ref } from "vue";
import { Temporal } from "@js-temporal/polyfill";
import MonthMiniView from "@/components/elements/MonthMiniView.vue";

interface Props {
  datetime: Temporal.PlainDateTime;
}
const props = withDefaults(defineProps<Props>(), {});

const currenMonth = ref(Temporal.PlainDate.from(props.datetime));
const nextMonth = ref(currenMonth.value.add({ months: 1 }));

function switchToPreviousMonth() {
  currenMonth.value = currenMonth.value.subtract({ months: 1 });
  nextMonth.value = currenMonth.value.add({ months: 1 });
}

function switchToNextMonth() {
  currenMonth.value = currenMonth.value.add({ months: 1 });
  nextMonth.value = currenMonth.value.add({ months: 1 });
}

function onCurrentMonthUpperClicked() {
  currenMonth.value = Temporal.Now.plainDateISO();
  nextMonth.value = currenMonth.value.add({ months: 1 });
}

function onCurrentMonthLowerClicked() {
  nextMonth.value = Temporal.Now.plainDateISO();
  currenMonth.value = nextMonth.value.subtract({ months: 1 });
}

function onPreviousMonthUpperClicked() {
  switchToPreviousMonth();
}

function onPreviousMonthLowerClicked() {
  switchToPreviousMonth();
}

function onNextMonthUpperClicked() {
  switchToNextMonth();
}

function onNextMonthLowerClicked() {
  switchToNextMonth();
}

const emit = defineEmits(["onDayClick"]);
</script>

<template>
  <div class="calendar-sidebar">
    <MonthMiniView
      :date="currenMonth"
      @onLeft="onPreviousMonthUpperClicked()"
      @onRight="onNextMonthUpperClicked()"
      @onDayClick="emit('onDayClick', $event)"
      @onTodayClick="onCurrentMonthUpperClicked()"
    />
    <MonthMiniView
      :date="nextMonth"
      @onLeft="onPreviousMonthLowerClicked()"
      @onRight="onNextMonthLowerClicked()"
      @onDayClick="emit('onDayClick', $event)"
      @onTodayClick="onCurrentMonthLowerClicked()"
    />
  </div>
</template>

<style scoped>
.calendar-sidebar {
  @apply relative flex flex-col gap-4 p-2;
}
</style>
