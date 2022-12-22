<script setup lang="ts">
interface Props {
  date: number;
}

const props = withDefaults(defineProps<Props>(), {});
console.log("CalendarSideBar: ", props.date);
</script>

<template>
  <div class="calendar-sidebar">CalendarSideBar</div>
</template>

<style scoped>
.calendar-sidebar {
  @apply flex min-w-max min-h-max;
}
</style>
