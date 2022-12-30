<script setup lang="ts">
import SwitchBox from "@/components/elements/SwitchBox.vue";

function switchCalendarNavHints(enable: boolean) {
  if (enable) {
    emit("enableCalendarNavHints");
  } else {
    emit("disableCalendarNavHints");
  }
}

const emit = defineEmits(["enableCalendarNavHints", "disableCalendarNavHints"]);
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
  </div>
</template>

<style scoped>
.options-panel {
  @apply flex-none;
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
</style>
