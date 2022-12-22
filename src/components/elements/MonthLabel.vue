<script setup lang="ts">
interface Props {
  date: number;
}

const props = withDefaults(defineProps<Props>(), {});
console.log("CalendarHeader: ", props.date);
</script>

<template>
  <div class="calendar-month-label">MonthLabel</div>
</template>

<style scoped>
.calendar-month-label {
  @apply text-xl;
}
</style>
