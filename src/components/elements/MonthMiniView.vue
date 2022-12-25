<script setup lang="ts">
import { onMounted, PropType } from "vue";
import { Temporal } from "@js-temporal/polyfill";
import MonthLabel from "@/components/elements/MonthLabel.vue";
import ShiftButton from "@/components/elements/ShiftButton.vue";

interface Props {
  date: PropType<Temporal.PlainDateTime>;
  startDayOfWeek?: number
}
const props = withDefaults(defineProps<Props>(), {
  startDayOfWeek: 1
});

let today: Temporal.PlainDateTime | null = null;


onMounted(() => {
  today = Temporal.Now.plainDateTimeISO();
});

const emit = defineEmits(["onLeft", "onRight"]);
</script>

<template>
  <div class="month-mini-view">
    <div class="month-mini-view__header">
      <div class="month-mini-view__header__month-label">
        <MonthLabel :date="props.date" />
      </div>
      <div class="month-mini-view__header__button-row">
        <ShiftButton
          class="month-mini-view__header__button"
          direction="left"
          @click="emit('onLeft')"
        />
        <ShiftButton
          class="month-mini-view__header__button"
          direction="right"
          @click="emit('onRight')"
        />
      </div>
    </div>

    <div class="month-mini-view__body">

    </div>
  </div>
</template>

<style scoped>
.month-mini-view {
  @apply relative;
}

.month-mini-view__header {
  @apply flex flex-row text-sm gap-1;
}

.month-mini-view__header__month-label {
  @apply mr-auto;
}

.month-mini-view__header__button {
  @apply w-4 h-4;
  @apply relative my-auto rounded-full fill-fuchsia-700;
  @apply hover:bg-gray-300;
  @apply disabled:fill-gray-500;
}

.month-mini-view__header__button-row {
  @apply flex flex-row;
}

.month-mini-view__body {
  @apply grid grid-flow-col grid-cols-8;
}
</style>
