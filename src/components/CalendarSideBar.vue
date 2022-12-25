<script setup lang="ts">
import { PropType } from "vue";
import { Temporal } from "@js-temporal/polyfill";
import MonthMiniView from "@/components/elements/MonthMiniView.vue";

interface Props {
  date: PropType<Temporal.PlainDateTime>;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="calendar-sidebar">
    <MonthMiniView :date="props.date" />
  </div>
</template>

<style scoped>
.calendar-sidebar {
  @apply relative flex-none flex p-2;
}
</style>
