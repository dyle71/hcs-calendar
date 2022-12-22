<script setup lang="ts">
import MonthLabel from "@/components/elements/MonthLabel.vue";

interface Props {
  date: number;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="calendar-header">
    <MonthLabel :date="props.date" />
  </div>
</template>

<style scoped>
.calendar-header {
  @apply flex;
}
</style>
