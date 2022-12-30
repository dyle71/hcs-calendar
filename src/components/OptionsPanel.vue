<script setup lang="ts">
import { ref } from "vue";
import SwitchBox from "@/components/elements/SwitchBox.vue";

const weekViewDays = ref(7);

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
    </section>
  </div>
</template>

<style scoped>
.options-panel {
  @apply flex-none flex flex-col gap-2;
}

.options-panel section {
  @apply border-t;
}

.options-panel h1 {
  @apply text-xl font-bold;
}

.options-panel section h2 {
  @apply text-lg;
}

.options-panel .option {
  @apply text-sm;
}

.options-panel label {
  @apply flex flex-row align-baseline gap-1;
}

.options-panel label .range-input {
  @apply flex-initial grow w-4;
}

.options-panel label .range-value {
  @apply inline-block w-4 text-right;
}
</style>
