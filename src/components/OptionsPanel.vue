<script setup lang="ts">
import { ref } from "vue";
import AngleUp from "@/components/icons/AngleUp.vue";
import SwitchBox from "@/components/elements/SwitchBox.vue";

const optionsVisible = ref(false);
const optionsToggleButton = ref<HTMLElement | null>(null);
const weekViewDays = ref("7");
const startOfWeekView = ref("firstDayOfWeek");
const firstDayOfWeek = ref("1");
const dayLightStart = ref("6");
const dayLightEnd = ref("19");

function switchCalendarNavHints(enable: boolean) {
  if (enable) {
    emit("enableCalendarNavHints");
  } else {
    emit("disableCalendarNavHints");
  }
}

function switchMonthViewHighlight(enable: boolean) {
  if (enable) {
    emit("enableMonthViewHighlight");
  } else {
    emit("disableMonthViewHighlight");
  }
}

function switchNowMarker(enable: boolean) {
  if (enable) {
    emit("enableWeekViewNowMarker");
  } else {
    emit("disableWeekViewNowMarker");
  }
}

function emitDayLightEndChange() {
  let time = { hour: parseInt(dayLightEnd.value), minute: 0, second: 0 };
  if (time.hour === 24) {
    time = { hour: 23, minute: 59, second: 59 };
  }
  emit("changeDayLightEnd", time);
}

function emitDayLightStartChange() {
  let time = { hour: parseInt(dayLightStart.value), minute: 0, second: 0 };
  if (time.hour === 24) {
    time = { hour: 23, minute: 59, second: 59 };
  }
  emit("changeDayLightStart", time);
}

function toggleOptionVisibility() {
  optionsVisible.value = !optionsVisible.value;
  const button = optionsToggleButton.value as HTMLButtonElement;
  if (button) {
    if (optionsVisible.value) {
      button.classList.add("rotated");
    } else {
      button.classList.remove("rotated");
    }
  }
}

const emit = defineEmits([
  "enableCalendarNavHints",
  "enableMonthViewHighlight",
  "enableWeekViewNowMarker",
  "disableCalendarNavHints",
  "disableMonthViewHighlight",
  "disableWeekViewNowMarker",
  "changeWeekViewDays",
  "changeStartOfWeekView",
  "changeFirstDayOfWeek",
  "changeDayLightStart",
  "changeDayLightEnd",
]);
</script>

<template>
  <div class="options-panel">
    <div class="options-heading">
      <h1>Options:</h1>
      <button ref="optionsToggleButton" @click.prevent="toggleOptionVisibility">
        <AngleUp />
      </button>
    </div>
    <div v-if="optionsVisible">
      <section>
        <h2>Calendar Navigation:</h2>
        <SwitchBox
          class="option switch-box"
          id="calendar-nav-buttons-hint"
          :initial-state="false"
          label="Hints:"
          @onClick="switchCalendarNavHints"
        />
      </section>
      <section>
        <h2>Month View:</h2>
        <SwitchBox
          class="option switch-box"
          id="highlight-days-in-month-view"
          :initial-state="true"
          label="Highlight days:"
          @onClick="switchMonthViewHighlight"
        />
      </section>
      <section>
        <h2>Week View:</h2>
        <SwitchBox
          class="option switch-box"
          id="show-now-marker"
          :initial-state="true"
          label="Show now marker:"
          @onClick="switchNowMarker"
        />
        <label for="week-view-days-amount" class="option three-cols">
          <span>Amount of days:</span>
          <input
            type="range"
            class="range-input"
            id="week-view-days-amount"
            v-model="weekViewDays"
            min="1"
            max="28"
            @change="emit('changeWeekViewDays', parseInt(weekViewDays))"
          />
          <span class="range-value">{{ weekViewDays }}</span>
        </label>
        <label for="week-view-start-of-week" class="option two-cols">
          <span>Start of week view:</span>
          <select
            id="week-view-start-of-week"
            v-model="startOfWeekView"
            @blur="emit('changeStartOfWeekView', startOfWeekView)"
            @change="emit('changeStartOfWeekView', startOfWeekView)"
          >
            <option value="firstDayOfWeek">First day of week</option>
            <option value="float">Floating</option>
          </select>
        </label>
        <label for="week-view-first-day-of-week" class="option two-cols">
          <span>First day of week:</span>
          <select
            id="week-view-first-day-of-week"
            v-model="firstDayOfWeek"
            @blur="emit('changeFirstDayOfWeek', parseInt(firstDayOfWeek))"
            @change="emit('changeFirstDayOfWeek', parseInt(firstDayOfWeek))"
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
        <label for="daylight-start" class="option three-cols">
          <span>Daylight starts at:</span>
          <input
            type="range"
            class="range-input"
            id="daylight-start"
            v-model="dayLightStart"
            min="0"
            max="24"
            @change="emitDayLightStartChange()"
          />
          <span class="range-value">{{ dayLightStart }}</span>
        </label>
        <label for="daylight-ends" class="option three-cols">
          <span>Daylight ends at:</span>
          <input
            type="range"
            class="range-input"
            id="daylight-ends"
            v-model="dayLightEnd"
            min="0"
            max="24"
            @change="emitDayLightEndChange()"
          />
          <span class="range-value">{{ dayLightEnd }}</span>
        </label>
      </section>
    </div>
  </div>
</template>

<style scoped>
.options-panel {
  @apply flex-none flex flex-col gap-4 max-w-full min-w-0;
}

.options-panel .options-heading {
  @apply flex flex-row justify-between;
}

.options-panel .options-heading h1 {
  @apply ml-0 my-auto;
}

.options-panel .options-heading button {
  @apply w-6 h-6 fill-fuchsia-700 rounded-full;
  @apply hover:bg-gray-100 focus:outline-0;
  @apply transition-all;
}

.options-panel .options-heading button.rotated {
  @apply -rotate-180;
}

.options-panel section {
  @apply flex flex-col gap-2 py-2 border-t w-full;
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
  @apply min-w-full;
}

.options-panel label span {
  @apply my-auto;
}

.options-panel label.two-cols {
  @apply grid gap-2;
  grid-template-columns: 1fr 62%;
}

.options-panel label.three-cols {
  @apply grid gap-2;
  grid-template-columns: 4fr 50% 1fr;
}

.options-panel label select {
  @apply flex-initial grow;
}

.options-panel label .range-input {
  @apply mt-1 mb-auto;
}

.options-panel label .range-value {
  @apply inline-block text-right mt-0.5 mb-auto;
}
</style>
