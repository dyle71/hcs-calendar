<script setup lang="ts">
interface Props {
  date: number;
}

const props = withDefaults(defineProps<Props>(), {});
console.log("CalendarMain: ", props.date);
</script>

<template>
  <div class="calendar-main">CalendarMain</div>
</template>

<style scoped>
.calendar-main {
  @apply flex min-w-max min-h-max max-h-full;
  @apply mb-auto;
}
</style>
