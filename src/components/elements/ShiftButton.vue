<script setup lang="ts">
import AngleDoubleDown from "@/components/icons/AngleDoubleDown.vue";
import AngleDoubleLeft from "@/components/icons/AngleDoubleLeft.vue";
import AngleDoubleRight from "@/components/icons/AngleDoubleRight.vue";
import AngleDoubleUp from "@/components/icons/AngleDoubleUp.vue";
import AngleDown from "@/components/icons/AngleDown.vue";
import AngleLeft from "@/components/icons/AngleLeft.vue";
import AngleRight from "@/components/icons/AngleRight.vue";
import AngleUp from "@/components/icons/AngleUp.vue";

interface Props {
  direction: string;
  alt: string;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div v-if="props.direction === 'double-down'" class="calendar-shift-button">
    <button class="calendar-shift-button calendar-shift-button__double-down">
      <AngleDoubleDown :alt="props.alt" />
    </button>
  </div>
  <div
    v-else-if="props.direction === 'double-left'"
    class="calendar-shift-button"
  >
    <button class="calendar-shift-button calendar-shift-button__double-left">
      <AngleDoubleLeft :alt="props.alt" />
    </button>
  </div>
  <div
    v-else-if="props.direction === 'double-right'"
    class="calendar-shift-button"
  >
    <button class="calendar-shift-button calendar-shift-button__double-right">
      <AngleDoubleRight :alt="props.alt" />
    </button>
  </div>
  <div
    v-else-if="props.direction === 'double-up'"
    class="calendar-shift-button"
  >
    <button class="calendar-shift-button calendar-shift-button__double-up">
      <AngleDoubleUp :alt="props.alt" />
    </button>
  </div>
  <div v-else-if="props.direction === 'down'" class="calendar-shift-button">
    <button class="calendar-shift-button calendar-shift-button__down">
      <AngleDown :alt="props.alt" />
    </button>
  </div>
  <div v-else-if="props.direction === 'left'" class="calendar-shift-button">
    <button class="calendar-shift-button calendar-shift-button__left">
      <AngleLeft :alt="props.alt" />
    </button>
  </div>
  <div v-else-if="props.direction === 'right'" class="calendar-shift-button">
    <button class="calendar-shift-button calendar-shift-button__right">
      <AngleRight :alt="props.alt" />
    </button>
  </div>
  <div v-else-if="props.direction === 'up'" class="calendar-shift-button">
    <button class="calendar-shift-button calendar-shift-button__up">
      <AngleUp :alt="props.alt" />
    </button>
  </div>
</template>

<style scoped>
.calendar-shift-button {
  @apply w-6 h-6;
}

.calendar-shift-button > svg {
  fill: darkmagenta;
}
</style>
