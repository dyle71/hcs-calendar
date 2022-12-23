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
      direction="double-down"
      alt="{{ $t('header.shift.double-down') }}"
    />
    <ShiftButton
      direction="double-left"
      alt="{{ $t('header.shift.double-left') }}"
    />
    <ShiftButton
      direction="double-right"
      alt="{{ $t('header.shift.double-right') }}"
    />
    <ShiftButton
      direction="double-up"
      alt="{{ $t('header.shift.double-up') }}"
    />
    <ShiftButton direction="down" alt="{{ $t('header.shift.down') }}" />
    <ShiftButton direction="left" alt="{{ $t('header.shift.left') }}" />
    <ShiftButton direction="right" alt="{{ $t('header.shift.right') }}" />
    <ShiftButton direction="up" alt="{{ $t('header.shift.up') }}" />
    <MonthLabel :date="props.date" />
  </div>
</template>

<style scoped>
.calendar-header {
  @apply relative flex;
}
</style>
