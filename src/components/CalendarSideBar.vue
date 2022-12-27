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

function onPreviousMonthUpperClicked() {
  console.log("onPreviousMonthUpperClicked");
  switchToPreviousMonth();
}

function onPreviousMonthLowerClicked() {
  console.log("onPreviousMonthLowerClicked");
  switchToPreviousMonth();
}

function onNextMonthUpperClicked() {
  console.log("onNextMonthUpperClicked");
  switchToNextMonth();
}

function onNextMonthLowerClicked() {
  console.log("onNextMonthLowerClicked");
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
    />
    <MonthMiniView
      :date="nextMonth"
      @onLeft="onPreviousMonthLowerClicked()"
      @onRight="onNextMonthLowerClicked()"
      @onDayClick="emit('onDayClick', $event)"
    />
  </div>
</template>

<style scoped>
.calendar-sidebar {
  @apply relative flex flex-col gap-2 p-2;
}
</style>
