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
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <button
    v-if="props.direction === 'double-down'"
    class="calendar-shift-button calendar-shift-button__double-down"
  >
    <AngleDoubleDown />
  </button>
  <button
    v-else-if="props.direction === 'double-left'"
    class="calendar-shift-button calendar-shift-button__double-left"
  >
    <AngleDoubleLeft />
  </button>
  <button
    v-else-if="props.direction === 'double-right'"
    class="calendar-shift-button calendar-shift-button__double-right"
  >
    <AngleDoubleRight />
  </button>
  <button
    v-else-if="props.direction === 'double-up'"
    class="calendar-shift-button calendar-shift-button__double-up"
  >
    <AngleDoubleUp />
  </button>
  <button
    v-else-if="props.direction === 'down'"
    class="calendar-shift-button calendar-shift-button__down"
  >
    <AngleDown />
  </button>
  <button
    v-else-if="props.direction === 'left'"
    class="calendar-shift-button calendar-shift-button__left"
  >
    <AngleLeft />
  </button>
  <button
    v-else-if="props.direction === 'right'"
    class="calendar-shift-button calendar-shift-button__right"
  >
    <AngleRight />
  </button>
  <button
    v-else-if="props.direction === 'up'"
    class="calendar-shift-button calendar-shift-button__up"
  >
    <AngleUp />
  </button>
</template>
