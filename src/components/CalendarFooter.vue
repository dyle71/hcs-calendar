<script setup lang="ts">
interface Props {
  date: number;
}

const props = withDefaults(defineProps<Props>(), {});
console.log("CalendarFooter: ", props.date);
</script>

<template>
  <div class="calendar-footer">CalendarFooter</div>
</template>

<style scoped>
.calendar-footer {
  @apply flex;
}
</style>
