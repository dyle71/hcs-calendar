<script setup lang="ts">
import { ref } from "vue";
import SwitchBox from "@/components/elements/SwitchBox.vue";

const weekViewDays = ref(7);
const startOfWeekView = ref("firstDayOfWeek");
const firstDayOfWeek = ref(1);

function switchCalendarNavHints(enable: boolean) {
  if (enable) {
    emit("enableCalendarNavHints");
  } else {
    emit("disableCalendarNavHints");
  }
}

const emit = defineEmits([
  "enableCalendarNavHints",
  "disableCalendarNavHints",
  "changeWeekViewDays",
  "changeStartOfWeekView",
  "changeFirstDayOfWeek",
]);
</script>

<template>
  <div class="options-panel">
    <h1>Options:</h1>
    <section>
      <h2>Calendar Navigation:</h2>
      <SwitchBox
        class="option switch-box"
        id="calendar-nav-buttons-hint"
        :initial-state="false"
        label="Hints"
        @onClick="switchCalendarNavHints"
      />
    </section>
    <section>
      <h2>Week View:</h2>
      <label for="week-view-days-amount" class="option">
        Amount of days:
        <input
          type="range"
          class="range-input"
          id="week-view-days-amount"
          v-model="weekViewDays"
          min="1"
          max="28"
          @change="emit('changeWeekViewDays', weekViewDays)"
        />
        <span class="range-value">{{ weekViewDays }}</span>
      </label>
      <label for="week-view-start-of-week" class="option">
        Start of week view:
        <select
          id="week-view-start-of-week"
          v-model="startOfWeekView"
          @blur="emit('changeStartOfWeekView', startOfWeekView)"
        >
          <option value="firstDayOfWeek">First day of week</option>
          <option value="float">Floating</option>
        </select>
      </label>
      <label for="week-view-first-day-of-week" class="option">
        First day of week:
        <select
          id="week-view-first-day-of-week"
          v-model="firstDayOfWeek"
          @blur="emit('changeFirstDayOfWeek', firstDayOfWeek)"
        >
          <option value="1">Monday</option>
          <option value="2">Tuesday</option>
          <option value="3">Wednesday</option>
          <option value="4">Thursday</option>
          <option value="5">Friday</option>
          <option value="6">Saturday</option>
          <option value="7">Sunday</option>
        </select>
      </label>
    </section>
  </div>
</template>

<style scoped>
.options-panel {
  @apply flex-none flex flex-col gap-4;
}

.options-panel section {
  @apply border-t;
}

.options-panel h1 {
  @apply text-xl font-bold;
}

.options-panel section h2 {
  @apply text-lg my-2;
}

.options-panel .option {
  @apply text-sm;
}

.options-panel label {
  @apply flex flex-row align-baseline gap-1 mb-2;
}

.options-panel label .range-input {
  @apply flex-initial grow w-4;
}

.options-panel label .range-value {
  @apply inline-block w-4 text-right;
}
</style>
