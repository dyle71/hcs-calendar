<script setup lang="ts">
import MonthLabel from "@/components/elements/MonthLabel.vue";
import ShiftButton from "@/components/elements/ShiftButton.vue";

interface Props {
  date: number;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits([
  "onDoubleLeft",
  "onDoubleRight",
  "onLeft",
  "onRight",
]);
</script>

<template>
  <div class="calendar-header">
    <ShiftButton
      class="calendar-header__shift-button"
      direction="double-left"
      alt="{{ $t('header.shift.double-left') }}"
      @click="emit('onDoubleLeft')"
    />
    <ShiftButton
      class="calendar-header__shift-button"
      direction="left"
      alt="{{ $t('header.shift.left') }}"
      @click="emit('onLeft')"
    />
    <MonthLabel :date="props.date" />
    <ShiftButton
      class="calendar-header__shift-button"
      direction="right"
      alt="{{ $t('header.shift.right') }}"
      @click="emit('onRight')"
    />
    <ShiftButton
      class="calendar-header__shift-button"
      direction="double-right"
      alt="{{ $t('header.shift.double-right') }}"
      @click="emit('onDoubleRight')"
    />
  </div>
</template>

<style scoped>
.calendar-header {
  @apply relative flex;
}

.calendar-header__shift-button {
  @apply relative my-auto mx-0.5 w-6 h-6 rounded-full fill-fuchsia-700;
  @apply hover:bg-gray-300;
  @apply disabled:fill-gray-500;
}
</style>
