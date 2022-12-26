<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import MonthMiniView from "@/components/elements/MonthMiniView.vue";

interface Props {
  datetime: Temporal.PlainDateTime;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="calendar-sidebar">
    <MonthMiniView :date="Temporal.PlainDate.from(props.datetime)" />
  </div>
</template>

<style scoped>
.calendar-sidebar {
  @apply relative flex-none flex p-2;
}
</style>
