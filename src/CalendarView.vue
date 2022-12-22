<script setup lang="ts">
import CalendarHeader from "@/components/CalendarHeader.vue";
import CalendarMain from "@/components/CalendarMain.vue";
import CalendarFooter from "@/components/CalendarFooter.vue";
import CalendarSideBar from "@/components/CalendarSideBar.vue";

interface Props {
  initialDate?: number;
}

const props = withDefaults(defineProps<Props>(), {
  initialDate: Date.now(),
});

console.log(props.initialDate);
</script>

<template>
  <div class="calendar-container">
    <CalendarHeader
      class="calendar-container__header"
      :date="props.initialDate"
    />
    <div class="calendar-container__body">
      <CalendarSideBar
        class="calendar-container__body__sidebar"
        :date="props.initialDate"
      />
      <CalendarMain
        class="calendar-container__body__main"
        :date="props.initialDate"
      />
    </div>
    <CalendarFooter
      class="calendar-container__footer"
      :date="props.initialDate"
    />
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
