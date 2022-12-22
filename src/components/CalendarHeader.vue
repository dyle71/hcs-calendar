<script setup lang="ts">
interface Props {
  date: number;
}

const props = withDefaults(defineProps<Props>(), {});
console.log("CalendarHeader: ", props.date);
</script>

<template>
  <div class="calendar-header">CalendarHeader</div>
</template>

<style scoped>
.calendar-header {
  @apply flex;
}
</style>
