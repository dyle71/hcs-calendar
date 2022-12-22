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
  @apply relative;
}

.calendar-container__header {
}

.calendar-container__body {
  @apply flex flex-row;
}

.calendar-container__body__sidebar {
}

.calendar-container__body__main {
}

.calendar-container__footer {
}
</style>
