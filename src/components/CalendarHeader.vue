<script setup lang="ts">
import MonthLabel from "@/components/elements/MonthLabel.vue";
import ShiftButton from "@/components/elements/ShiftButton.vue";

interface Props {
  date: number;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="calendar-header">
    <ShiftButton
      class="calendar-header__shift-button"
      direction="double-left"
      alt="{{ $t('header.shift.double-left') }}"
    />
    <ShiftButton
      class="calendar-header__shift-button"
      direction="left"
      alt="{{ $t('header.shift.left') }}"
    />
    <MonthLabel :date="props.date" />
    <ShiftButton
      class="calendar-header__shift-button"
      direction="right"
      alt="{{ $t('header.shift.right') }}"
    />
    <ShiftButton
      class="calendar-header__shift-button"
      direction="double-right"
      alt="{{ $t('header.shift.double-right') }}"
    />
  </div>
</template>

<style scoped>
.calendar-header {
  @apply relative flex;
}

.calendar-header__shift-button {
  @apply my-auto mx-0.5 w-6 h-6 rounded-full overflow-clip;
  fill: darkmagenta;
  @apply hover:bg-gray-300;
}
</style>
