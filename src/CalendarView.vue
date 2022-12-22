<script setup lang="ts">
import CalendarHeader from "@/components/CalendarHeader.vue";
import CalendarMain from "@/components/CalendarMain.vue";
import CalendarFooter from "@/components/CalendarFooter.vue";
import CalendarSideBar from "@/components/CalendarSideBar.vue";
</script>

<template>
  <div class="calendar-container">
    <CalendarHeader class="calendar-container__header" />
    <div class="calendar-container__body">
      <CalendarSideBar class="calendar-container__body__sidebar" />
      <CalendarMain class="calendar-container__body__main" />
    </div>
    <CalendarFooter class="calendar-container__footer" />
  </div>
</template>

<style scoped>
.calendar-container {
  @apply relative flex flex-col max-h-full;
}

.calendar-container__header {
  @apply flex-none;
}

.calendar-container__body {
  @apply flex-auto flex flex-row h-auto;
}

.calendar-container__body__sidebar {
}

.calendar-container__body__main {
}

.calendar-container__footer {
  @apply flex-none;
}
</style>
